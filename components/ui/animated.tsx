"use client";

import autoAnimate, { AutoAnimateOptions } from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

export interface AnimatedProps extends Partial<AutoAnimateOptions> {
  children: React.ReactNode;
  className?: string;
}

export default function Animated({
  className,
  children,
  ...props
}: AnimatedProps) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current && autoAnimate(ref.current);
  }, [ref]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
