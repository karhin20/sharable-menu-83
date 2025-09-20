import React from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  as?: React.ElementType;
}

export const AnimateOnScroll = ({
  children,
  className,
  delay = 0,
  triggerOnce = false, // Set to false for persistent animations on scroll
  threshold = 0.1,
  as: Tag = 'div',
}: AnimateOnScrollProps) => {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  return (
    <Tag
      ref={ref}
      className={cn('transition-all duration-700 ease-out', className, inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};