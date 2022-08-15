export enum EnumProductValueType {
  DECIMAL = 'decimal',
  BOOLEAN = 'boolean',
  TEXT = 'text'
}

export const getEnumProductValueType = ( val: string ): EnumProductValueType => {
  switch ( val.toLowerCase() ) {
    case 'decimal':
      return EnumProductValueType.DECIMAL

    case 'boolean':
      return EnumProductValueType.BOOLEAN

    case 'text':
    default:
      return EnumProductValueType.TEXT
  }
}
