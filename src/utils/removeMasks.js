export async function removeNumberMask(numberText) {
  const numberArray = await numberText.split('');
  const finalnumber = numberArray
    .filter((char) => !Number.isNaN(char))
    .join('')
    .replace(' ', '');
  return finalnumber;
}

export async function removeMoneyMask(numberText) {
  const numberArray = await numberText.split('');
  const finalnumber = numberArray
    .filter((char) => !Number.isNaN(char) || char === ',' || char === '.')
    .join('')
    .replace(' ', '');
  return finalnumber;
}
