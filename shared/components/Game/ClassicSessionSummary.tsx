'use client';

import React, { useMemo } from 'react';
import {
  Menu,
  RotateCcw,
  Timer,
  Zap,
  Target,
  Star,
  Trophy,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ClassicSessionSummaryProps {
  title?: string;
  subtitle?: string;
  correct: number;
  wrong: number;
  bestStreak: number;
  stars: number;
  totalTimeMs?: number;
  correctAnswerTimes?: number[];
  onBackToSelection: () => void;
  onNewSession: () => void;
}

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function ClassicSessionSummary({
  title = 'session summary',
  subtitle = 'your progress is saved.',
  correct,
  wrong,
  bestStreak,
  stars,
  totalTimeMs = 0,
  correctAnswerTimes = [],
  onBackToSelection,
  onNewSession,
}: ClassicSessionSummaryProps) {
  const total = correct + wrong;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timeFormatted = formatTime(totalTimeMs);

  const avgResponseTime = useMemo(() => {
    if (correctAnswerTimes.length === 0) return 0;
    const sum = correctAnswerTimes.reduce((a, b) => a + b, 0);
    return sum / correctAnswerTimes.length;
  }, [correctAnswerTimes]);

  const fastestResponse = useMemo(() => {
    if (correctAnswerTimes.length === 0) return 0;
    return Math.min(...correctAnswerTimes);
  }, [correctAnswerTimes]);

  const apm = useMemo(() => {
    if (totalTimeMs === 0) return 0;
    return Math.round((total / (totalTimeMs / 60000)) * 10) / 10;
  }, [total, totalTimeMs]);

  // SVG Gauge calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full flex-col overflow-x-hidden overflow-y-auto bg-(--background-color) select-none'>
      {/* BACKGROUND DECORATIVE WATERMARK */}
      <div className='pointer-events-none absolute top-20 -right-20 opacity-[0.03] lg:top-0 lg:-right-40'>
        <span className='text-[20rem] leading-none font-black tracking-tighter text-(--main-color) lg:text-[40rem]'>
          {accuracy}
        </span>
      </div>

      <div className='relative mx-auto flex min-h-full w-full max-w-[1400px] flex-col justify-between px-6 py-12 sm:px-12 sm:py-20 lg:flex-row lg:items-center lg:gap-24'>
        {/* LEFT COMPOSITION: IDENTITY & PERSISTENCE */}
        <div className='flex flex-col lg:w-1/3 lg:flex-shrink-0'>
          <div className='mb-16 flex flex-col gap-4 lg:mb-32'>
            <div className='h-[2px] w-16 bg-(--main-color) opacity-50' />
            <h1 className='text-5xl font-black tracking-tighter text-(--main-color) lowercase sm:text-7xl lg:text-8xl'>
              {title}
            </h1>
            <p className='max-w-[280px] text-lg font-medium tracking-tight text-(--secondary-color) lowercase opacity-40 sm:text-xl'>
              {subtitle}
            </p>
          </div>

          <div className='hidden flex-col gap-10 lg:flex'>
            <button
              onClick={onNewSession}
              className='group flex items-center gap-8 text-3xl font-black tracking-tighter text-(--main-color) transition-transform active:scale-95'
            >
              <span className='lowercase'>start new session</span>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-(--main-color) text-(--background-color)'>
                <RotateCcw className='h-8 w-8' strokeWidth={3} />
              </div>
            </button>
            <button
              onClick={onBackToSelection}
              className='group flex items-center gap-8 text-3xl font-black tracking-tighter text-(--secondary-color) opacity-40 transition-transform active:scale-95'
            >
              <span className='lowercase'>back to selection</span>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-(--secondary-color) text-(--background-color)'>
                <Menu className='h-8 w-8' strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COMPOSITION: DATA MONOLITH */}
        <div className='flex flex-1 flex-col justify-center gap-16 lg:gap-24'>
          {/* PRIMARY PERFORMANCE UNIT */}
          <div className='flex flex-col items-center gap-10 sm:flex-row sm:gap-20 lg:gap-24'>
            {/* MINIMALIST SVG CIRCLE ARC */}
            <div className='relative flex h-56 w-56 flex-shrink-0 items-center justify-center sm:h-72 sm:w-72 lg:h-96 lg:w-96'>
              <svg className='h-full w-full rotate-[-90deg] transform'>
                <circle
                  cx='50%'
                  cy='50%'
                  r={radius}
                  className='fill-none stroke-(--secondary-color) opacity-[0.05]'
                  strokeWidth='2'
                />
                <circle
                  cx='50%'
                  cy='50%'
                  r={radius}
                  className='fill-none stroke-(--main-color) transition-all duration-1000 ease-out'
                  strokeWidth='2'
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap='square'
                />
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center'>
                <span className='text-7xl font-black tracking-tighter text-(--main-color) sm:text-8xl lg:text-[9rem]'>
                  {accuracy}
                  <span className='text-3xl opacity-30 lg:text-5xl'>%</span>
                </span>
                <span className='mt-[-0.5rem] text-[0.65rem] font-bold tracking-[0.4em] text-(--secondary-color) uppercase opacity-30 sm:text-xs'>
                  precision score
                </span>
              </div>
            </div>

            <div className='flex flex-col items-center text-center sm:items-start sm:text-left'>
              <span className='mb-4 text-xs font-bold tracking-[0.5em] text-(--secondary-color) uppercase opacity-30'>
                raw output
              </span>
              <div className='flex items-baseline gap-4'>
                <span className='text-7xl font-black tracking-tighter text-(--main-color) sm:text-9xl'>
                  {correct}
                </span>
                <span className='text-3xl font-bold tracking-tighter text-(--secondary-color) opacity-20 sm:text-5xl'>
                  / {total}
                </span>
              </div>
              <p className='mt-8 max-w-[320px] text-base leading-relaxed text-(--secondary-color) lowercase opacity-50'>
                {accuracy === 100
                  ? 'absolute precision. your session reflects total mastery of the selected characters.'
                  : `your performance was stable at ${accuracy}%. minor inconsistencies were detected but overall progress is maintained.`}
              </p>
            </div>
          </div>

          {/* SECONDARY SYSTEM STRIP */}
          <div className='grid grid-cols-2 gap-x-8 gap-y-12 border-t-[1px] border-(--secondary-color)/10 pt-12 sm:grid-cols-3 lg:grid-cols-5 lg:pt-16'>
            <div className='flex flex-col gap-2'>
              <span className='text-[0.6rem] font-bold tracking-[0.3em] text-(--secondary-color) uppercase opacity-20 lg:text-[0.65rem]'>
                time
              </span>
              <span className='text-3xl font-black tracking-tighter text-(--main-color) lg:text-4xl'>
                {timeFormatted}
              </span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-[0.6rem] font-bold tracking-[0.3em] text-(--secondary-color) uppercase opacity-20 lg:text-[0.65rem]'>
                peak streak
              </span>
              <span className='text-3xl font-black tracking-tighter text-(--main-color) lg:text-4xl'>
                {bestStreak}
              </span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-[0.6rem] font-bold tracking-[0.3em] text-(--secondary-color) uppercase opacity-20 lg:text-[0.65rem]'>
                avg cadence
              </span>
              <span className='text-3xl font-black tracking-tighter text-(--main-color) lg:text-4xl'>
                {avgResponseTime.toFixed(1)}
                <span className='ml-1 text-sm opacity-30'>sec</span>
              </span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-[0.6rem] font-bold tracking-[0.3em] text-(--secondary-color) uppercase opacity-20 lg:text-[0.65rem]'>
                velocity
              </span>
              <span className='text-3xl font-black tracking-tighter text-(--main-color) lg:text-4xl'>
                {apm}
                <span className='ml-1 text-sm opacity-30'>apm</span>
              </span>
            </div>

            <div className='flex flex-col gap-2'>
              <span className='text-[0.6rem] font-bold tracking-[0.3em] text-(--secondary-color) uppercase opacity-20 lg:text-[0.65rem]'>
                stars
              </span>
              <div className='flex items-center gap-2'>
                <span className='text-3xl font-black tracking-tighter text-(--main-color) lg:text-4xl'>
                  +{stars}
                </span>
                <Star className='h-5 w-5 fill-(--main-color) text-(--main-color)' />
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ACTION FIXED TO BOTTOM */}
        <div className='mt-20 flex w-full flex-col gap-4 lg:hidden'>
          <button
            onClick={onNewSession}
            className='flex h-16 items-center justify-center gap-6 rounded-full bg-(--main-color) text-2xl font-black tracking-tighter text-(--background-color) lowercase active:scale-[0.98]'
          >
            <RotateCcw className='h-6 w-6' strokeWidth={3} />
            new session
          </button>
          <button
            onClick={onBackToSelection}
            className='flex h-16 items-center justify-center gap-6 rounded-full border-2 border-(--secondary-color)/20 text-2xl font-black tracking-tighter text-(--secondary-color) lowercase opacity-50 active:scale-[0.98]'
          >
            <Menu className='h-6 w-6' strokeWidth={3} />
            selection
          </button>
        </div>
      </div>
    </div>
  );
}
