import { createFileRoute } from '@tanstack/react-router';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

export const Route = createFileRoute('/dashboard/timer')({
  component: TimerPage
});

function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setIsActive(false); setTimeLeft(25 * 60); };

  const format = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cronômetro de Estudos</h1>
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 gap-8">
          <div className="text-6xl font-mono font-bold">{format(timeLeft)}</div>
          <div className="flex gap-4">
            <Button onClick={toggle} className="w-24">
              {isActive ? <Pause /> : <Play />}
            </Button>
            <Button variant="outline" onClick={reset} className="w-24">
              <RotateCcw />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
