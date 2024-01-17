/* eslint-disable no-restricted-globals */
export async function removeNumberMask(numberText) {
  const numberArray = await numberText.split('');
  const finalnumber = numberArray

    .filter((char) => !isNaN(char))
    .join('')
    .replace(' ', '');
  return finalnumber;
}

export async function removeMoneyMask(numberText) {
  const numberArray = await numberText.split('');
  const finalnumber = numberArray
    .filter((char) => !isNaN(char) || char === ',' || char === '.')
    .join('')
    .replace(' ', '');
  return finalnumber;
}
