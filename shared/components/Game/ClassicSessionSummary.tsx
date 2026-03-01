'use client';

import React from 'react';
import clsx from 'clsx';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flame,
  Star,
  Target,
} from 'lucide-react';
import { ActionButton } from '@/shared/components/ui/ActionButton';

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
  title = 'Session Summary',
  subtitle = 'Your session was saved.',
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
          { name: 'Correct', value: correct },
          { name: 'Wrong', value: wrong },
        ]
      : [{ name: 'Empty', value: 1 }];

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full overflow-x-hidden overflow-y-auto bg-(--background-color)'>
      {/* Ambient background glows for a premium aesthetic */}
      <div className='pointer-events-none fixed top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-(--main-color) opacity-[0.07] mix-blend-screen blur-[120px]' />
      <div className='pointer-events-none fixed right-[-10%] bottom-[-10%] h-[50vw] w-[50vw] rounded-full bg-(--secondary-color) opacity-[0.07] mix-blend-screen blur-[120px]' />

      <div className='relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-12 md:px-12 md:py-20'>
        {/* Header Section */}
        <div className='mb-12 flex flex-col items-center space-y-4 text-center md:mb-20'>
          <h1 className='bg-gradient-to-br from-(--main-color) to-(--secondary-color) bg-clip-text pb-1 text-4xl font-black tracking-tight text-transparent md:text-6xl'>
            {title}
          </h1>
          <p className='text-lg font-medium text-(--secondary-color) opacity-80 md:text-2xl'>
            {subtitle}
          </p>
        </div>

        {/* Main Content: Chart + Stats Display */}
        <div className='mb-16 flex flex-1 flex-col items-center justify-center gap-16 lg:flex-row lg:gap-32'>
          {/* Chart Section */}
          <div className='relative aspect-square w-full max-w-[280px] flex-shrink-0 sm:max-w-[360px] md:max-w-[420px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius='75%'
                  outerRadius='100%'
                  paddingAngle={total > 0 && correct > 0 && wrong > 0 ? 4 : 0}
                  dataKey='value'
                  stroke='none'
                  startAngle={90}
                  endAngle={-270}
                  cornerRadius={12}
                  isAnimationActive={false}
                >
                  {total > 0 ? (
                    <>
                      <Cell fill='var(--main-color)' />
                      <Cell fill='var(--secondary-color)' opacity={0.3} />
                    </>
                  ) : (
                    <Cell fill='var(--border-color)' opacity={0.2} />
                  )}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-7xl leading-none font-black tracking-tighter text-(--main-color) md:text-[6rem]'>
                {accuracy}%
              </span>
              <span className='mt-3 text-sm font-bold tracking-[0.25em] text-(--secondary-color) uppercase opacity-80 md:text-base'>
                Accuracy
              </span>
            </div>
          </div>

          {/* Stats List (replacing bounded cards) */}
          <div className='flex w-full max-w-lg flex-col self-center'>
            <StatRow
              icon={<CheckCircle2 size={24} strokeWidth={2.5} />}
              label='Correct Answers'
              value={correct}
            />
            <StatRow
              icon={<XCircle size={24} strokeWidth={2.5} />}
              label='Wrong Answers'
              value={wrong}
            />
            <StatRow
              icon={<Flame size={24} strokeWidth={2.5} />}
              label='Best Streak'
              value={bestStreak}
            />
            <StatRow
              icon={<Star size={24} strokeWidth={2.5} />}
              label='Stars Earned'
              value={stars}
            />
            <StatRow
              icon={<Target size={24} strokeWidth={2.5} />}
              label='Total Attempts'
              value={total}
              border={false}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-auto flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row sm:gap-6'>
          <ActionButton
            onClick={onBackToSelection}
            colorScheme='secondary'
            borderColorScheme='secondary'
            borderBottomThickness={10}
            borderRadius='3xl'
            className='w-full min-w-[240px] px-8 py-5 text-lg font-bold sm:w-auto'
          >
            <ArrowLeft size={22} className='mr-3 opacity-80' />
            Back to Selection
          </ActionButton>
          <ActionButton
            onClick={onNewSession}
            borderBottomThickness={10}
            borderRadius='3xl'
            className='w-full min-w-[240px] px-8 py-5 text-lg font-bold sm:w-auto'
          >
            <RotateCcw size={22} className='mr-3 opacity-80' />
            New Session
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

function StatRow({
  icon,
  label,
  value,
  border = true,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  border?: boolean;
}) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between py-5 md:py-6',
        border && 'border-b border-(--border-color)/30',
      )}
    >
      <div className='flex items-center gap-5'>
        <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-(--main-color)/10 text-(--main-color) backdrop-blur-sm'>
          {icon}
        </div>
        <span className='text-lg font-medium text-(--secondary-color) md:text-xl'>
          {label}
        </span>
      </div>
      <span className='text-3xl font-black text-(--main-color) md:text-4xl'>
        {value}
      </span>
    </div>
  );
}
