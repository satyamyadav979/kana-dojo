'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { RotateCcw, Menu, ChevronRight } from 'lucide-react';

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

  const barData = [
    { name: 'correct', value: correct },
    { name: 'wrong', value: wrong },
    { name: 'streak', value: bestStreak },
    { name: 'stars', value: stars },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg border border-(--border-color) bg-(--background-color) px-4 py-2 font-bold text-(--main-color) shadow-lg'>
          <p className='lowercase'>{`${label}  :  ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full flex-col items-center overflow-x-hidden overflow-y-auto bg-(--background-color) font-sans selection:bg-(--main-color) selection:text-(--background-color)'>
      <div className='flex min-h-screen w-full max-w-[1240px] flex-col justify-center px-8 py-12 text-(--main-color) sm:px-12 lg:px-24'>
        {/* Top Header */}
        <div className='mb-12 flex items-center gap-3 select-none sm:mb-20'>
          <ChevronRight
            size={24}
            className='text-(--secondary-color) opacity-60'
            strokeWidth={3}
          />
          <h1 className='text-2xl font-black tracking-tight text-(--secondary-color) lowercase opacity-80 sm:text-3xl'>
            {title}
          </h1>
          <span className='ml-4 hidden text-lg text-(--secondary-color) lowercase opacity-40 sm:inline-block'>
            {subtitle}
          </span>
        </div>

        {/* Primary Stats Row */}
        <div className='mb-20 flex flex-wrap items-baseline gap-x-16 gap-y-12 lg:gap-x-28'>
          <div className='group flex flex-col'>
            <span className='mb-1 text-xl font-medium text-(--secondary-color) lowercase opacity-60 transition-opacity duration-300 select-none group-hover:opacity-100 sm:text-2xl'>
              acc
            </span>
            <span className='text-[6rem] leading-none font-black tracking-tighter sm:text-[9rem] xl:text-[11rem]'>
              {accuracy}%
            </span>
          </div>

          <div className='group flex flex-col'>
            <span className='mb-1 text-xl font-medium text-(--secondary-color) lowercase opacity-60 transition-opacity duration-300 select-none group-hover:opacity-100 sm:text-2xl'>
              correct
            </span>
            <div className='flex items-baseline text-6xl leading-none font-black tracking-tighter sm:text-[7rem] xl:text-[9rem]'>
              {correct}
              <span className='ml-3 text-3xl tracking-tight text-(--secondary-color) opacity-40 sm:text-5xl lg:ml-5'>
                /{total}
              </span>
            </div>
          </div>

          <div className='group flex flex-col'>
            <span className='mb-1 text-xl font-medium text-(--secondary-color) lowercase opacity-60 transition-opacity duration-300 select-none group-hover:opacity-100 sm:text-2xl'>
              wrong
            </span>
            <span className='text-6xl leading-none font-black tracking-tighter text-(--secondary-color) opacity-90 sm:text-[7rem] xl:text-[9rem]'>
              {wrong}
            </span>
          </div>
        </div>

        {/* Extended Stats & Charts */}
        <div className='mb-24 grid w-full grid-cols-1 gap-16 lg:grid-cols-4 lg:gap-24'>
          {/* Secondary Stats Column */}
          <div className='flex flex-row flex-wrap justify-center gap-8 lg:mt-8 lg:flex-col lg:justify-start lg:gap-12'>
            <div className='flex flex-col'>
              <span className='mb-1 text-base font-medium text-(--secondary-color) lowercase opacity-60 select-none sm:text-lg'>
                best streak
              </span>
              <span className='text-4xl leading-none font-black tracking-tighter text-(--main-color) sm:text-5xl'>
                {bestStreak}
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='mb-1 text-base font-medium text-(--secondary-color) lowercase opacity-60 select-none sm:text-lg'>
                stars earned
              </span>
              <span className='text-4xl leading-none font-black tracking-tighter text-(--main-color) sm:text-5xl'>
                {stars}
              </span>
            </div>

            <div className='flex flex-col'>
              <span className='mb-1 text-base font-medium text-(--secondary-color) lowercase opacity-60 select-none sm:text-lg'>
                total attempts
              </span>
              <span className='text-4xl leading-none font-black tracking-tighter text-(--main-color) sm:text-5xl'>
                {total}
              </span>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className='group relative h-[280px] w-full select-none sm:h-[360px] lg:col-span-3'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey='name'
                  axisLine={{
                    stroke: 'var(--secondary-color)',
                    strokeWidth: 2,
                    opacity: 0.1,
                  }}
                  tickLine={false}
                  tick={{
                    fill: 'var(--secondary-color)',
                    fontSize: 16,
                    fontWeight: 600,
                    opacity: 0.8,
                  }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: 'var(--secondary-color)',
                    fontSize: 14,
                    fontWeight: 500,
                    opacity: 0.5,
                  }}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: 'var(--secondary-color)', opacity: 0.05 }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey='value'
                  radius={[6, 6, 0, 0]}
                  isAnimationActive={false}
                  maxBarSize={120}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === 'wrong'
                          ? 'var(--secondary-color)'
                          : 'var(--main-color)'
                      }
                      fillOpacity={entry.name === 'wrong' ? 0.7 : 0.9}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-auto flex flex-wrap items-center gap-8 pt-8 select-none'>
          <button
            onClick={onNewSession}
            className='flex items-center justify-center gap-4 rounded-md bg-transparent px-8 py-3 text-xl font-bold text-(--main-color) lowercase outline-hidden transition-all duration-200 hover:bg-(--main-color) hover:text-(--background-color) focus-visible:bg-(--main-color) focus-visible:text-(--background-color) sm:text-2xl'
          >
            <RotateCcw size={22} strokeWidth={3} />
            next test
          </button>
          <button
            onClick={onBackToSelection}
            className='flex items-center justify-center gap-4 rounded-md bg-transparent px-8 py-3 text-xl font-bold text-(--secondary-color) lowercase outline-hidden transition-all duration-200 hover:text-(--main-color) focus-visible:text-(--main-color) sm:text-2xl'
          >
            <Menu size={22} strokeWidth={3} />
            menu
          </button>
        </div>
      </div>
    </div>
  );
}
