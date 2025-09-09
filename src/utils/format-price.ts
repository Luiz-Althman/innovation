export function formatPrice(value: string | number) {
  const number = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(number)) return 'R$ 0,00'

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
