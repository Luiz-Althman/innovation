'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from 'use-debounce'

interface SearchInputsProps {
  onSearchChange: (filters: { nome?: string; codigo?: string }) => void
}

export function SearchInputs({ onSearchChange }: SearchInputsProps) {
  const handleNomeChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange({ nome: event.target.value })
    },
    500,
  )

  const handleCodigoChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange({ codigo: event.target.value })
    },
    500,
  )

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar por nome..."
          className="w-full pl-8"
          onChange={handleNomeChange}
        />
      </div>

      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar por código..."
          className="w-full pl-8"
          onChange={handleCodigoChange}
        />
      </div>
    </div>
  )
}
