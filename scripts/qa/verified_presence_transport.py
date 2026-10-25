"""Test-only WebSocket transport using Python's verified TLS trust store.

Opt in where headless Chromium lacks the cloud proxy CA. Frames still reach the
real Supabase service. No certificate verification is disabled and no credentials
are saved. Playwright owns the browser side; context closure closes the upstream.
"""
import asyncio
import ssl
import websockets

async def install_verified_presence_transport(context):
    tasks = set()
    upstreams = set()
    async def drop_connections(_source):
        await asyncio.gather(*(ws.close(code=1001, reason='QA reconnect check') for ws in list(upstreams)))
    await context.expose_binding('__qaDropPresenceTransport', drop_connections)
    async def bridge(route):
        queue = asyncio.Queue()
        closed = asyncio.Event()
        context.on('close', lambda *_: closed.set())
        route.on_message(lambda message: queue.put_nowait(message))
        tls = ssl.create_default_context()
        assert tls.check_hostname and tls.verify_mode == ssl.CERT_REQUIRED
        try:
            async with websockets.connect(route.url, ssl=tls, open_timeout=20) as upstream:
                upstreams.add(upstream)
                async def writer():
                    while True:
                        await upstream.send(await queue.get())
                async def reader():
                    async for message in upstream:
                        if closed.is_set():
                            return
                        route.send(message)
                running = [asyncio.create_task(writer()), asyncio.create_task(reader()), asyncio.create_task(closed.wait())]
                try:
                    await asyncio.wait(running, return_when=asyncio.FIRST_COMPLETED)
                finally:
                    for task in running:
                        task.cancel()
                    await asyncio.gather(*running, return_exceptions=True)
                    upstreams.discard(upstream)
        finally:
            if not closed.is_set():
                await route.close(code=1000, reason='QA transport complete')
    def handler(route):
        task = asyncio.create_task(bridge(route))
        tasks.add(task)
        task.add_done_callback(tasks.discard)
    await context.route_web_socket('**/realtime/v1/**', handler)
