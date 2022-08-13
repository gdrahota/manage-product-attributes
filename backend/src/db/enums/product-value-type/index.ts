export enum EnumProductValueType {
  DECIMAL = 'decimalValue',
  BOOLEAN = 'booleanValue',
  TEXT = 'textValue'
}

export const getEnumProductValueType = ( val: string ): EnumProductValueType => {
  switch ( val.toLowerCase() ) {
    case 'decimalvalue':
      return EnumProductValueType.DECIMAL

    case 'booleanvalue':
      return EnumProductValueType.BOOLEAN

    case 'textvalue':
    default:
      return EnumProductValueType.TEXT
  }
}
