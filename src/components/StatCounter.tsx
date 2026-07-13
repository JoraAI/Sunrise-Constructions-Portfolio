'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import type { Stat } from '@/types/content';
import { Icon } from './Icon';

interface StatCounterProps {
  stat: Stat;
  className?: string;
}

export function StatCounter({ stat, className }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, stat.value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        setDisplayValue(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center lg:items-start lg:text-left"
    >
      <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
        <Icon name={stat.icon} className="h-6 w-6" />
      </span>
      <p className="font-heading text-3xl font-extrabold text-white lg:text-4xl">
        {stat.prefix}
        {displayValue.toLocaleString('en-IN')}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm font-medium text-white/60">{stat.label}</p>
    </div>
  );
}