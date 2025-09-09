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

export function DescriptionProduct({ description }: { description: string }) {
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
        <Popover>
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
