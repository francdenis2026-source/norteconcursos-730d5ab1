import type { ScheduleDay } from './studySchedule';

type Completion = { plan_id: string | null; week_start: string; block_key: string };

/** Only count scheduled blocks of the selected plan and current week, once per key. */
export function coachWeekSummary(schedule: ScheduleDay[], checks: Completion[], planId: string, weekStart: string, todayDay: number) {
  const blocks = schedule.flatMap(day => day.blocks);
  const completedKeys = new Set(checks.filter(check => check.plan_id === planId && check.week_start === weekStart).map(check => check.block_key));
  const completed = blocks.filter(block => completedKeys.has(block.key)).length;
  const todayBlocks = schedule.find(day => day.day === todayDay)?.blocks ?? [];
  return {
    total: blocks.length,
    completed,
    percentage: blocks.length ? Math.round(completed / blocks.length * 100) : 0,
    todayCount: todayBlocks.length,
    nextBlock: todayBlocks.find(block => !completedKeys.has(block.key)),
  };
}
