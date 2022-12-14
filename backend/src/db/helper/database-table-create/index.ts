import { DataType } from '../../enums/data-type'
import { IField, ITableDef } from '../../../seeder/table-defs/type'
import { pg } from '../../connect'
import { camelToSnakeCase } from '../index'
import { tTableDef } from '../../../seeder'

export const createTableFromModel = async ( model: ITableDef, schemaName: string = 'public' ): Promise<void> => {
  const { name, fields, indexes } = model as tTableDef

  await pg.schema
    .withSchema( schemaName )
    .createTable( name, ( tbl: any ) => {
      tbl.increments( 'id' ).primary()

      fields.forEach( ( field: IField ) => {
        let tblCol
        const columnName = camelToSnakeCase( field.name )

        switch ( field.type ) {
          case DataType.SERIAL: {
            tblCol = tbl.integer( columnName ).increments()
            break
          }
          case DataType.INTEGER: {
            tblCol = tbl.integer( columnName )
            break
          }
          case DataType.DECIMAL: {
            tblCol = tbl.decimal( columnName, 16, 6 )
            break
          }
          case DataType.FLOAT: {
            tblCol = tbl.float( columnName )
            break
          }
          case DataType.BOOLEAN: {
            tblCol = tbl.boolean( columnName )
            break
          }
          case DataType.DATETIME:
          case DataType.TIMESTAMP:
            tblCol = tbl.datetime( columnName )
            break
          case DataType.DATE: {
            tblCol = tbl.date( columnName )
            break
          }
          case DataType.STRING: {
            tblCol = tbl.string( columnName, 255 )
            break
          }
          case DataType.TEXT: {
            tblCol = tbl.text( columnName )
            break
          }
          default:
            return
        }

        if ( field.default !== undefined ) {
          tblCol.default( field.default )
        }

        if ( field.nullable ) {
          tblCol.nullable()
        } else {
          tblCol.notNullable()
        }

        if ( field.primary ) {
          tblCol.primary()
        }
      } )

      indexes?.forEach( index => {
        if ( index.unique ) {
          tbl.unique( index.fieldNames )
        } else {
          tbl.index( index.fieldNames )
        }
      } )
    } )
}

export const ensureTableExists = async ( tableDef: ITableDef, silent = false ): Promise<void> => {
  // load tableDef first from DB
  return await pg.schema
    .withSchema( 'public' )
    .hasTable( tableDef.name )
    .then( async ( exists: boolean ) => {
      if ( ! exists ) {
        await createTableFromModel( tableDef )

        if ( ! silent ) {
          console.info( ` - table '${ tableDef.name }' created` )
        }
      } else if ( ! silent ) {
        console.info( ` - table '${ tableDef.name }' already exists` )
      }
    } )
}
