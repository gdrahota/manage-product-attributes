import Bluebird from "bluebird"
import { DealerTable, tDealerTable } from "../../db/tables/dealers"
import { EnumDealerStatus } from "../../seeder/table-defs/dealers/def"

export const createDealers = async () => {
  const dealers: Omit<tDealerTable, 'id'>[] = [
    { name: 'Best Local Dealer Ever Ldt.', status: EnumDealerStatus.VALID },
    { name: 'Second Best Local Dealer Ever Ldt.', status: EnumDealerStatus.VALID },
    { name: 'Third Local Dealer Ever Ldt.', status: EnumDealerStatus.VALID },
    { name: 'Best Global Dealer Ever Ldt.', status: EnumDealerStatus.VALID },
  ]

  const dealerTable = new DealerTable()

  return Bluebird.each( dealers, dealer => {
    return dealerTable.add( dealer )
  } )
}
