import React from 'react';
import { toast } from 'sonner';
import { Trophy, Star, Award, Zap } from 'lucide-react';
import { Achievement } from '@/types';

export function showAchievementNotification(achievement: Achievement) {
  const getIcon = (code: string) => {
    if (code.includes('FIRST')) return <Award className="h-6 w-6 text-emerald-500" />;
    if (code.includes('PERFECT')) return <Star className="h-6 w-6 text-gold" />;
    if (code.includes('STREAK')) return <Zap className="h-6 w-6 text-orange-500" />;
    return <Trophy className="h-6 w-6 text-primary" />;
  };

  toast.custom((t) => {
    // Sonner passes the toast id/metadata as 't'
    // Depending on version it might be a string (id) or object
    const isVisible = true; // Sonner handles visibility class externally if needed, but we can animate locally
    const id = typeof t === 'string' || typeof t === 'number' ? t : (t as any).id;

    return (
      <div className="max-w-md w-full bg-card border-2 border-emerald-500/50 shadow-2xl rounded-xl pointer-events-auto p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
        <div className="bg-emerald-500/10 p-3 rounded-full animate-bounce">
          {getIcon(achievement.code)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Nova Medalha Ganha!</p>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h3 className="font-black text-lg text-foreground leading-tight">{achievement.name}</h3>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
        </div>
        <button 
          onClick={() => toast.dismiss(id)}
          className="text-muted-foreground hover:text-foreground p-1"
        >
          <Trophy className="h-4 w-4" />
        </button>
      </div>
    );
  }, {
    duration: 6000,
    position: 'top-center',
  });
}
