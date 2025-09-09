'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

export function DescriptionProduct({ description }: { description: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative hidden w-full max-w-[200px] md:block">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="block cursor-pointer truncate text-center text-lg">
                {description}
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="center"
              sideOffset={4}
              className="max-w-sm break-words"
            >
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative block w-full max-w-[200px] md:hidden">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <span className="block cursor-pointer truncate text-center text-lg">
              {description}
            </span>
          </PopoverTrigger>
          <PopoverContent side="bottom" className="max-w-sm break-words">
            <p>{description}</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
