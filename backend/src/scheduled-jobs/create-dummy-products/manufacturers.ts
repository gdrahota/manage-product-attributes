import Bluebird from 'bluebird'
import { ManufacturerTable } from '../../db/tables/manufacturers'

export const createManufacturers = async () => {
  const names = [ 'LONGI', 'Siemens', 'AEG', 'Heckert' ]
  const manufacturerTable = new ManufacturerTable()

  return Bluebird.each( names, name => {
    return manufacturerTable.add( { name } )
  } )
}
