import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { camelToSnakeRecord, snakeToCamelRecord } from "../../helper"
import Bluebird from "bluebird"
import { DealerTable, tDealerTable } from "../dealers"

export interface tProductOfferTable {
  id: number
  importId: number
  productId: number
  dealerId: number
  itemPrice: number
  shippingPrice: number
}

export interface ILatestProductOffer {
  dealer: tDealerTable
  itemPrice: number
  shippingPrice: number
}

const TABLE_NAME = 'product_offers'

export class ProductOfferTable extends GenericClass<tProductOfferTable> {
  private dealerTable = new DealerTable()

  constructor() {
    super( TABLE_NAME )
  }

  async getLatestByProductId( id: number ): Promise<ILatestProductOffer[]> {
    const items = await pg( TABLE_NAME )
      .select( 'dealer_id', 'item_price', 'shipping_price', pg.raw( 'item_price + shipping_price as total_price' ) )
      .where( 'product_id', id )
      .whereRaw( 'import_id in (select max(import_id) from product_offers where product_id = 1 group by dealer_id)' )
      .orderBy( 'total_price' )

    return Bluebird.mapSeries( items, async offer => {
      return snakeToCamelRecord( {
        ...offer,
        dealer: await this.dealerTable.getById( offer.dealer_id )
      } ) as ILatestProductOffer
    } )
  }

  async addOffer( offer: Omit<tProductOfferTable, 'id'> ): Promise<tProductOfferTable> {
    const query = {
      productId: offer.productId,
      dealerId: offer.dealerId
    }

    const existingOffers = await pg( TABLE_NAME ).where( camelToSnakeRecord( query ) ) as unknown as tProductOfferTable[]

    if ( existingOffers.length === 0 ) {
      return this.add( offer )
    }

    return this.update( {
      ...existingOffers,
      ...offer,
    } )
  }
}
