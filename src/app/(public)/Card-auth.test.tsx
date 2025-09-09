import { render, screen } from '@testing-library/react'
import { CardAuth } from './card-auth'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}))

describe('CardAuth', () => {
  it('renders inputs and button', () => {
    render(<CardAuth />)

    expect(screen.getByPlaceholderText(/Usuário/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument()
  })
})
