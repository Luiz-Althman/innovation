'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationProps = {
  links: {
    label: string
    active: boolean
  }[]
  lastPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  links,
  lastPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handleClickPage = (page: number) => {
    if (page < 1) page = 1
    if (page > lastPage) page = lastPage
    onPageChange(page)
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          onClick={() => handleClickPage(currentPage - 1)}
          className={`${
            currentPage > 1
              ? 'cursor-pointer'
              : 'cursor-not-allowed text-slate-300 hover:text-slate-300'
          }`}
        >
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link, i) =>
          link.label === '...' ? (
            <PaginationItem key={i} className="hidden md:inline-flex">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={i} className="cursor-pointer">
              <PaginationLink
                onClick={() => handleClickPage(Number(link.label))}
                isActive={link.active}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </PaginationItem>
          ),
        )}

        <PaginationItem
          onClick={() => handleClickPage(currentPage + 1)}
          className={`${
            currentPage < lastPage
              ? 'cursor-pointer'
              : 'cursor-not-allowed text-slate-300 hover:text-slate-300'
          }`}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
}
