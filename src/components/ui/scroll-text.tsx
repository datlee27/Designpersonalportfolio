import React, { useRef, ElementType } from 'react';
import { motion, useInView, Variants } from 'motion/react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface TextAnimationProps {
  text: string;
  as?: ElementType;
  classname?: string;
  className?: string;
  letterAnime?: boolean;
  lineAnime?: boolean;
  direction?: Direction;
  variants?: Variants;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

function getDefaultVariants(direction: Direction): Variants {
  const directionMap: Record<Direction, { x?: number; y?: number }> = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: -30 },
    right: { x: 30 },
  };

  const offset = directionMap[direction];

  return {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
}

const GPU_STYLE = { willChange: 'transform, opacity' } as const;

export default function TextAnimation({
  text,
  as: Tag = 'h2',
  classname,
  className,
  letterAnime = false,
  lineAnime = false,
  direction = 'up',
  variants,
  staggerDelay = 0.06,
  once = false,
  threshold = 0.3,
}: TextAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const resolvedVariants = variants || getDefaultVariants(direction);
  const appliedClass = classname || className || '';

  // Line-by-line animation
  if (lineAnime) {
    const wordGroups: string[] = [];
    if (text.includes('\n')) {
      wordGroups.push(...text.split('\n'));
    } else {
      const words = text.split(' ');
      const chunkSize = Math.ceil(words.length / 3);
      for (let i = 0; i < words.length; i += chunkSize) {
        wordGroups.push(words.slice(i, i + chunkSize).join(' '));
      }
    }

    return (
      <Tag ref={ref} className={appliedClass}>
        {wordGroups.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              style={GPU_STYLE}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={resolvedVariants}
              transition={{
                ...((resolvedVariants.visible as any)?.transition || {}),
                delay: isInView ? i * (staggerDelay * 3) : 0,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  // Letter-by-letter animation
  if (letterAnime) {
    const letters = text.split('');
    return (
      <Tag ref={ref} className={appliedClass}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{
              ...GPU_STYLE,
              whiteSpace: letter === ' ' ? 'pre' : undefined,
            }}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={resolvedVariants}
            transition={{
              ...((resolvedVariants.visible as any)?.transition || {}),
              delay: isInView ? i * staggerDelay : 0,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </Tag>
    );
  }

  // Word-by-word animation (default)
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={appliedClass}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            style={GPU_STYLE}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={resolvedVariants}
            transition={{
              ...((resolvedVariants.visible as any)?.transition || {}),
              delay: isInView ? i * staggerDelay : 0,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
