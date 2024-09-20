export const generateNextCode = (lastCode: string) => {
  const match = lastCode?.match(/ShiftCod(\d+)/)
  if (match) {
    const nextNumber = String(parseInt(match[1], 10) + 1).padStart(3, '0')
    return `ShiftCod${nextNumber}`
  }

  return 'ShiftCod001'
}
