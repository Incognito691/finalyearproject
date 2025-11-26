import { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export default function GlassCard({
  children,
  className,
  padding = true,
}: GlassCardProps) {
  return (
    <div className={clsx("glass", padding && "p-5", className)}>{children}</div>
  );
}
