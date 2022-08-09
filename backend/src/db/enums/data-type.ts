export enum DataType {
  FLOAT = 'float',
  INTEGER = 'integer',
  DECIMAL = 'decimal',
  STRING = 'string',
  BOOLEAN = 'boolean',
  SERIAL = 'serial',
  TEXT = 'text',
  DATE = 'date',
  DATETIME = 'datetime',
  TIMESTAMP = 'timestamp',
}

export const string2DataType = ( type: string ): DataType => {
  switch ( type.toString().toLowerCase() ) {
    case 'serial':
      return DataType.SERIAL
    case 'integer':
      return DataType.INTEGER
    case 'float':
      return DataType.FLOAT
    case 'decimal':
      return DataType.DECIMAL
    case 'string':
      return DataType.STRING
    case 'text':
      return DataType.TEXT
    case 'boolean':
      return DataType.BOOLEAN
    case'date':
      return DataType.DATE
    case'datetime':
      return DataType.DATETIME
    case'timestamp':
      return DataType.TIMESTAMP
    default:
      break
  }
  throw new Error( `Error mapping invalid DataType string: ${ type }` )
}
