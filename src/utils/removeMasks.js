export async function removeNumberMask(numberText) {
  let numberArray = await numberText.split('')
  let finalnumber = numberArray
    .filter((char) => !isNaN(char))
    .join('')
    .replace(' ', '')
  return finalnumber
}

export async function removeMoneyMask(numberText) {
  let numberArray = await numberText.split('')
  let finalnumber = numberArray
    .filter((char) => !isNaN(char) || char == ',' || char == '.')
    .join('')
    .replace(' ', '')
  return finalnumber
}
