"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useHydrated from "@/hooks/useHydrated";

interface RollingNumberProps {
  value: number;
  className?: string;
}

export default function RollingNumber({ value, className }: RollingNumberProps) {
  const hydrated = useHydrated();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  if (!hydrated) {
    return (
      <div className={cn("flex items-center", className)}>
        <span>0</span>
      </div>
    );
  }

  const formatted = displayValue.toLocaleString();
  const characters = formatted.split("");

  return (
    <div className={cn("flex items-center", className)}>
      {characters.map((char, i) => {
        const isNumber = !isNaN(parseInt(char));
        if (!isNumber) {
          return (
            <span key={`char-${i}`} className="inline-block">
              {char}
            </span>
          );
        }
        return (
          <Digit
            key={`digit-${characters.length - i}-${char}`}
            digit={parseInt(char)}
            delay={(characters.length - i) * 80}
          />
        );
      })}
    </div>
  );
}

function Digit({ digit, delay }: { digit: number; delay: number }) {
  // 무작위 값은 렌더마다 바뀌면 안 되므로 state 초기값으로 한 번만 정한다.
  const [position, setPosition] = useState(() => Math.floor(Math.random() * 10));
  const [duration] = useState(() => 2000 + Math.random() * 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition(digit + 20);
    }, delay);
    return () => clearTimeout(timer);
  }, [digit, delay]);

  return (
    <div className="relative inline-block h-[1em] w-[0.6em] sm:w-[0.6em] overflow-hidden leading-none tabular-nums">
      <div
        className="transition-transform flex flex-col items-center"
        style={{
          transform: `translateY(-${(position / 30) * 100}%)`,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="flex items-center justify-center h-[1em]">
            {i % 10}
          </span>
        ))}
      </div>
    </div>
  );
}
