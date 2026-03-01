'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { RotateCcw } from 'lucide-react';

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
    <div className='fixed inset-0 z-50 flex h-full w-full flex-col overflow-y-auto bg-(--background-color)'>
      <div className='mx-auto flex min-h-screen w-full max-w-[1400px] flex-1 flex-col justify-center px-6 py-12 sm:px-12 sm:py-24 lg:p-24'>
        {/* Header */}
        <div className='relative mt-10 mb-16 flex flex-col gap-2 select-none lg:mt-0 lg:mb-24'>
          <h1 className='text-4xl font-black tracking-tighter text-(--main-color) lowercase sm:text-5xl lg:text-7xl'>
            {title}
          </h1>
          <p className='text-xl tracking-tight text-(--secondary-color) lowercase opacity-80 sm:text-2xl'>
            {subtitle}
          </p>
        </div>

        {/* Main Content: Stats + Chart */}
        <div className='mb-16 flex flex-1 flex-col items-center justify-between gap-16 lg:flex-row lg:items-start lg:gap-24'>
          {/* Stats Grid */}
          <div className='grid w-full flex-1 grid-cols-2 gap-x-8 gap-y-16 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-24'>
            <div className='col-span-2 flex flex-wrap gap-12 select-text sm:gap-24 lg:col-span-3 lg:gap-32'>
              <div className='flex flex-col'>
                <span className='mb-2 text-xl text-(--secondary-color) lowercase opacity-80 select-none sm:text-2xl'>
                  accuracy
                </span>
                <span className='text-[5rem] leading-none font-black tracking-tighter text-(--main-color) sm:text-9xl xl:text-[11rem]'>
                  {accuracy}%
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='mb-2 text-xl text-(--secondary-color) lowercase opacity-80 select-none sm:text-2xl'>
                  correct
                </span>
                <div className='flex items-baseline text-[5rem] leading-none font-black tracking-tighter text-(--main-color) sm:text-9xl xl:text-[11rem]'>
                  {correct}
                  <span className='ml-2 text-4xl tracking-tight text-(--secondary-color) opacity-40 sm:text-6xl lg:ml-4 xl:text-8xl'>
                    /{total}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              <span className='mb-2 text-lg text-(--secondary-color) lowercase opacity-80 select-none sm:text-xl'>
                wrong
              </span>
              <span className='text-5xl leading-none font-black tracking-tighter text-(--secondary-color) sm:text-6xl xl:text-[5.5rem]'>
                {wrong}
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='mb-2 text-lg text-(--secondary-color) lowercase opacity-80 select-none sm:text-xl'>
                best streak
              </span>
              <span className='text-5xl leading-none font-black tracking-tighter text-(--main-color) sm:text-6xl xl:text-[5.5rem]'>
                {bestStreak}
              </span>
            </div>

            <div className='col-span-2 flex flex-col lg:col-span-1'>
              <span className='mb-2 text-lg text-(--secondary-color) lowercase opacity-80 select-none sm:text-xl'>
                stars
              </span>
              <span className='text-5xl leading-none font-black tracking-tighter text-(--main-color) sm:text-6xl xl:text-[5.5rem]'>
                {stars}
              </span>
            </div>
          </div>

          {/* Chart Section */}
          <div className='relative flex aspect-square w-full max-w-[280px] flex-col items-center justify-center select-none sm:max-w-[360px] xl:max-w-[480px]'>
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
              <span className='mb-1 text-6xl leading-none font-black tracking-tighter text-(--main-color) sm:text-7xl xl:text-[6rem]'>
                {accuracy}%
              </span>
              <span className='sm:text-md text-sm tracking-[0.3em] text-(--secondary-color) uppercase opacity-80'>
                accuracy
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-auto flex flex-wrap items-center gap-6 pt-12 select-none'>
          <button
            onClick={onNewSession}
            className='flex items-center justify-center gap-3 rounded bg-(--main-color) px-10 py-5 text-xl font-bold text-(--background-color) lowercase outline-hidden sm:text-2xl'
          >
            <RotateCcw size={28} strokeWidth={2.5} />
            next session
          </button>
          <button
            onClick={onBackToSelection}
            className='flex items-center justify-center gap-3 rounded border-[3px] border-(--secondary-color) bg-transparent px-10 py-5 text-xl font-bold text-(--secondary-color) lowercase opacity-80 outline-hidden sm:text-2xl'
          >
            menu
          </button>
        </div>
      </div>
    </div>
  );
}
