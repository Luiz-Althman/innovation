import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './pagination'

describe('Pagination', () => {
  it('does not go below 1 or above totalPages', () => {
    const onPageChange = jest.fn()
    render(
      <Pagination totalPages={5} currentPage={5} onPageChange={onPageChange} />,
    )

    const nextButton = screen.getByLabelText('Go to next page')
    fireEvent.click(nextButton)

    expect(onPageChange).not.toHaveBeenCalled()

    const prevButton = screen.getByLabelText('Go to previous page')
    fireEvent.click(prevButton)

    expect(onPageChange).toHaveBeenCalledWith(4)
  })
})
