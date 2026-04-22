import React from 'react'
import { cn } from '@/lib'

export const Textarea = React.forwardRef(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex w-full resize-none border-0 bg-transparent px-0 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-0',
        className,
      )}
      {...props}
    />
  )
})
