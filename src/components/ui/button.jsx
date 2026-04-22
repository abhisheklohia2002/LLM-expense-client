import React from 'react'
import { cn } from '@/lib'

export function Button({ className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white text-zinc-950 px-4 py-2 text-sm font-medium transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
