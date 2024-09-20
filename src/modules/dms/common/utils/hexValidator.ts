export const isValidHex = (hex: string) => {
  const regex = /^#([A-Fa-f0-9]{3}){1,2}$/
  return regex.test(hex)
}
