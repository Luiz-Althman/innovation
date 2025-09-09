'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface SearchInputProps {
  onSearch: (value: string) => void
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)
      const searchString = event.target.value

      if (searchString) {
        params.set('search', searchString)
      } else {
        params.delete('search')
      }

      replace(`${pathname}?${params.toString()}`)
      onSearch(searchString)
    },
    500,
  )

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
      <Input
        type="search"
        placeholder="Busque por nome ou código..."
        className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
        onChange={handleChange}
      />
    </div>
  )
}
