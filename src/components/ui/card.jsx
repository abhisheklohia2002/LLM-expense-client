import React from 'react'
import { cn } from '@/lib'

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-zinc-900/70 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}
