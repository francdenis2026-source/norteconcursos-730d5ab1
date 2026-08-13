import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/history"!</div>
}
