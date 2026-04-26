import { Gem } from 'lucide-react'
import React from 'react'
import ChatOptions from '../user/User'

export default function HeaderChat() {
  const handleMenuItems = (key)=>{
    console.log(key)
  }
  return (
     <header className="border-b border-white/8 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-400 shadow-lg shadow-violet-950/30">
              <Gem className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs text-zinc-500">
                {/* abhisheklohia46458@gmail.com */}
              </p>
              <div className="mt-1">
                <h1 className="text-base font-semibold tracking-tight text-zinc-100 sm:text-lg">
                  BudgetBrain AI
                </h1>
                <p className="text-sm text-zinc-500">Powered by advanced AI</p>
              </div>
            </div>
          </div>

          <div >
          <ChatOptions handleMenuItems={handleMenuItems} />
          </div>
        </div>
      </header>
  )
}
