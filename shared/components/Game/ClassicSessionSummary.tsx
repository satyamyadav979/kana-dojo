'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Menu, RotateCcw } from 'lucide-react';

interface ClassicSessionSummaryProps {
  title?: string;
  subtitle?: string;
  correct: number;
  wrong: number;
  bestStreak: number;
  stars: number;
  onBackToSelection: () => void;
  onNewSession: () => void;
}

export default function ClassicSessionSummary({
  title = 'session summary',
  subtitle = 'your session was saved.',
  correct,
  wrong,
  bestStreak,
  stars,
  onBackToSelection,
  onNewSession,
}: ClassicSessionSummaryProps) {
  const total = correct + wrong;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const pieData =
    total > 0
      ? [
          { name: 'correct', value: correct },
          { name: 'wrong', value: wrong },
        ]
      : [{ name: 'empty', value: 1 }];

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full flex-col overflow-x-hidden overflow-y-auto bg-(--background-color)'>
      <div className='mx-auto flex min-h-full w-full max-w-[1200px] flex-1 flex-col justify-start px-4 py-4 sm:min-h-[100dvh] sm:justify-center sm:px-8 sm:py-16 lg:px-16 lg:py-12 lg:pb-32'>
        {/* Header */}
        <div className='relative mt-1 mb-3 flex flex-col gap-0.5 select-none sm:mt-4 sm:mb-10 sm:gap-1 lg:mt-0 lg:mb-12'>
          <h1 className='text-2xl font-black tracking-tighter text-(--main-color) lowercase sm:text-4xl lg:text-5xl'>
            {title}
          </h1>
          <p className='text-base tracking-tight text-(--secondary-color) lowercase opacity-80 sm:text-xl'>
            {subtitle}
          </p>
        </div>

        {/* Main Content: Stats + Chart */}
        <div className='mb-3 flex flex-1 flex-col items-center justify-between gap-3 sm:mb-8 sm:gap-8 lg:flex-row lg:items-center lg:gap-16'>
          {/* Stats Grid */}
          <div className='grid w-full flex-1 grid-cols-2 gap-x-3 gap-y-1.5 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-12'>
            {/* Primary Massive Stats */}
            <div className='col-span-2 flex flex-wrap items-end gap-2 select-text sm:gap-16 lg:col-span-3 lg:gap-24'>
              <div className='flex flex-col leading-none'>
                <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-lg'>
                  accuracy
                </span>
                <span className='text-3xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-7xl xl:text-[6rem]'>
                  {accuracy}%
                </span>
              </div>
              <div className='flex flex-col leading-none'>
                <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-lg'>
                  score
                </span>
                <div className='flex items-baseline text-3xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-7xl xl:text-[6rem]'>
                  {correct}
                  <span className='ml-1 text-xl leading-[0.9] tracking-tight text-(--main-color) opacity-100 sm:ml-2 sm:text-5xl xl:text-6xl'>
                    /{total}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className='flex flex-col leading-none'>
              <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-base'>
                correct
              </span>
              <span className='text-2xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-5xl xl:text-[4rem]'>
                {correct}
              </span>
            </div>

            <div className='flex flex-col leading-none'>
              <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-base'>
                wrong
              </span>
              <span className='text-2xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-5xl xl:text-[4rem]'>
                {wrong}
              </span>
            </div>

            <div className='flex flex-col leading-none'>
              <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-base'>
                total attempts
              </span>
              <span className='text-2xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-5xl xl:text-[4rem]'>
                {total}
              </span>
            </div>

            <div className='flex flex-col leading-none'>
              <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-base'>
                best streak
              </span>
              <span className='text-2xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-5xl xl:text-[4rem]'>
                {bestStreak}
              </span>
            </div>

            <div className='flex flex-col leading-none'>
              <span className='mb-0 text-xs text-(--secondary-color) lowercase opacity-80 select-none sm:mb-1 sm:text-base'>
                stars earned
              </span>
              <span className='text-2xl leading-[0.9] font-black tracking-tighter text-(--main-color) sm:text-5xl xl:text-[4rem]'>
                {stars}
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className='relative flex aspect-square w-full max-w-[140px] flex-col items-center justify-center select-none sm:max-w-[260px] xl:max-w-[320px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius='88%'
                  outerRadius='100%'
                  paddingAngle={total > 0 && correct > 0 && wrong > 0 ? 3 : 0}
                  dataKey='value'
                  stroke='none'
                  startAngle={90}
                  endAngle={-270}
                  isAnimationActive={false}
                >
                  {total > 0 ? (
                    <>
                      <Cell fill='var(--main-color)' />
                      <Cell fill='var(--secondary-color)' opacity={0.6} />
                    </>
                  ) : (
                    <Cell fill='var(--border-color)' opacity={0.2} />
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
              <span className='mb-0.5 text-3xl leading-none font-black tracking-tighter text-(--main-color) sm:mb-1 sm:text-5xl xl:text-[4rem]'>
                {accuracy}%
              </span>
              <span className='text-[0.65rem] tracking-[0.2em] text-(--secondary-color) uppercase sm:text-sm sm:tracking-[0.3em]'>
                accuracy
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-auto flex w-full items-center gap-2 pt-2 select-none sm:w-auto sm:gap-4 sm:pt-4'>
          <button
            onClick={onBackToSelection}
            className='flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-3xl bg-(--secondary-color) px-4 py-4 text-base font-bold text-(--background-color) lowercase outline-hidden transition-all duration-150 hover:opacity-90 active:scale-95 active:brightness-95 sm:h-14 sm:flex-none sm:px-8 sm:text-lg xl:text-xl'
          >
            <Menu className='h-5 w-5 sm:h-6 sm:w-6' strokeWidth={2.5} />
            menu
          </button>
          <button
            onClick={onNewSession}
            className='flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-3xl bg-(--main-color) px-4 py-4 text-base font-bold text-(--background-color) lowercase outline-hidden transition-all duration-150 hover:opacity-90 active:scale-95 active:brightness-95 sm:h-14 sm:flex-none sm:px-8 sm:text-lg xl:text-xl'
          >
            <RotateCcw className='h-5 w-5 sm:h-6 sm:w-6' strokeWidth={2.5} />
            <span className='sm:hidden'>new</span>
            <span className='hidden sm:inline'>new session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
