'use client';

import clsx from 'clsx';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  XCircle,
  Flame,
  Star,
  Target,
} from 'lucide-react';
import { ActionButton } from '@/shared/components/ui/ActionButton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

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

  const chartData = [
    { name: 'Correct', value: correct, color: 'var(--main-color)' },
    { name: 'Wrong', value: wrong, color: 'var(--secondary-color)' },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-(--background-color)/90 p-4 backdrop-blur-md'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='relative w-full max-w-4xl space-y-8 overflow-hidden rounded-[2rem] border border-(--border-color) bg-(--card-color) p-8 shadow-2xl'
      >
        {/* Decorative background gradients */}
        <div className='pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-(--main-color) opacity-20 blur-[100px]' />
        <div className='pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-(--secondary-color) opacity-20 blur-[100px]' />

        <div className='relative z-10 text-center'>
          <h2 className='mb-2 text-4xl font-black tracking-tight text-(--main-color)'>
            {title}
          </h2>
          <p className='text-base font-medium text-(--secondary-color)'>
            {subtitle}
          </p>
        </div>

        <div className='relative z-10 flex flex-col items-center gap-10 md:flex-row'>
          {/* Left side: Chart */}
          <div className='relative flex aspect-square w-full max-w-[280px] items-center justify-center md:w-1/2'>
            {total > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx='50%'
                    cy='50%'
                    innerRadius='70%'
                    outerRadius='90%'
                    paddingAngle={5}
                    dataKey='value'
                    stroke='none'
                    cornerRadius={10}
                    animationDuration={1500}
                    animationEasing='ease-out'
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '1rem',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--card-color)',
                    }}
                    itemStyle={{ fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex h-full w-full items-center justify-center rounded-full border-8 border-(--border-color) opacity-50' />
            )}

            <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className='text-5xl font-black text-(--main-color)'
              >
                {accuracy}%
              </motion.span>
              <span className='mt-1 text-xs font-bold tracking-[0.2em] text-(--secondary-color) uppercase'>
                Accuracy
              </span>
            </div>
          </div>

          {/* Right side: Stats Grid */}
          <div className='grid w-full grid-cols-2 gap-4 md:w-1/2'>
            <StatCard
              icon={<CheckCircle size={20} />}
              label='Correct'
              value={correct}
              className='text-(--main-color)'
              delay={0.1}
            />
            <StatCard
              icon={<XCircle size={20} />}
              label='Wrong'
              value={wrong}
              className='text-(--secondary-color)'
              delay={0.2}
            />
            <StatCard
              icon={<Flame size={20} />}
              label='Best Streak'
              value={bestStreak}
              className='text-(--main-color)'
              delay={0.3}
            />
            <StatCard
              icon={<Star size={20} />}
              label='Stars'
              value={stars}
              className='text-(--secondary-color)'
              delay={0.4}
            />
            <StatCard
              icon={<Target size={20} />}
              label='Attempts'
              value={total}
              className='col-span-2 text-(--main-color)'
              delay={0.5}
            />
          </div>
        </div>

        <div className='relative z-10 flex gap-4 pt-4'>
          <ActionButton
            onClick={onBackToSelection}
            colorScheme='secondary'
            borderColorScheme='secondary'
            borderBottomThickness={10}
            borderRadius='3xl'
            className='flex-1 py-4 text-base font-bold'
          >
            <ArrowLeft size={20} className='mr-2' />
            Back to Selection
          </ActionButton>
          <ActionButton
            onClick={onNewSession}
            borderBottomThickness={10}
            borderRadius='3xl'
            className='flex-1 py-4 text-base font-bold'
          >
            <RotateCcw size={20} className='mr-2' />
            New Session
          </ActionButton>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  className,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      className='flex flex-col items-center justify-center rounded-2xl border border-(--border-color) bg-(--background-color) p-4 text-center transition-shadow hover:shadow-lg'
    >
      <div className={clsx('mb-2 opacity-80', className)}>{icon}</div>
      <p className={clsx('text-3xl font-black drop-shadow-sm', className)}>
        {value}
      </p>
      <p className='mt-1 text-xs font-bold tracking-wider text-(--secondary-color) uppercase'>
        {label}
      </p>
    </motion.div>
  );
}
