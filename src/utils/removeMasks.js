export async function removeNumberMask(numberText) {
  let numberArray = await numberText.split('')
  let finalnumber = numberArray
    .filter((char) => !isNaN(char))
    .join('')
    .replace(' ', '')
  return finalnumber
}
