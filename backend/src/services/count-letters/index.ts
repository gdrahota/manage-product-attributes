export const countLetters = ( textValue: string ): number => {
  if ( typeof textValue !== 'string' ) {
    throw new Error( 'PROVIDED VALUE IS NOT A STRING' )
  }

  return textValue.replace( / /g, '' ).length
}
