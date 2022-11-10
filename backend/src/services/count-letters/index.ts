export const countLetters = ( textValue: string ): number  => {
  if(typeof textValue !== 'string'){
    throw new Error('Cannot perform count on a non-string value')
  }

  return textValue
    .replace(/ /g, '')
    .replace(/_/g, '')
    .length
}
