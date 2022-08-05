export const camelToSnakeCase = ( str: string ) => str.replace( /[A-Z]/g, letter => `_${ letter.toLowerCase() }` )

export const snakeToCamel =
  ( str: string ) =>
    str.replace(
      /([-_][a-z])/g,
      group => group.toUpperCase()
        .replace( '-', '' )
        .replace( '_', '' )
    )

export const camelToSnakeRecord = ( data: Record<string, any> ): Record<string, any> => {
  const ret: Record<string, any> = {}
  Object.keys( data ).forEach( k => ret[camelToSnakeCase( k )] = data[k] )
  return ret
}
export const snakeToCamelRecord = ( data: Record<string, any> ): Record<string, any> => {
  const ret: Record<string, any> = {}
  Object.keys( data ).forEach( k => ret[snakeToCamel( k )] = data[k] )
  return ret
}

export const capitalize = ( [ first, ...rest ]: string, locales?: string | string[] ): string => {
  return first.toLocaleUpperCase( locales ) + rest.join( '' )
}
