export const generateNextCode = (lastCode: string) => {
  const match = lastCode?.match(/VehiCod(\d+)/)
  if (match) {
    const nextNumber = String(parseInt(match[1], 10) + 1).padStart(3, '0')
    return `VehiCod${nextNumber}`
  }

  return 'VehiCod001'
}
