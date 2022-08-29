import { GenericClass } from "../_base_class"
import { pg } from "../../connect"
import { camelToSnakeRecord, snakeToCamelRecord } from "../../helper"
import { DealerTable } from "../dealers"
import { IProductOffer } from "../product-offers-history"
import ProductOfferCurrentTableDef from '../../../seeder/table-defs/product-offers-current/def'
import DealerTableDef from '../../../seeder/table-defs/dealers/def'

export interface tProductOfferTable {
  id: number
  importId: number
  productId: number
  dealerId: number
  itemPrice: number
  shippingPrice: number
  totalPrice: number
}

const TABLE_NAME = 'product_offers_current'

export class ProductOfferCurrentTable extends GenericClass<tProductOfferTable> {
  private dealerTable = new DealerTable()

  constructor() {
    super( TABLE_NAME )
  }

  async getByProductId( productId: number ): Promise<IProductOffer[]> {
    const fields = [
      'offer.id as offer_id',
      ...ProductOfferCurrentTableDef.fields.map( ( { name } ) => `offer.${ name } as offer_${ name }` ),
      'dealer.id as dealer_id',
      ...DealerTableDef.fields.map( ( { name } ) => `dealer.${ name } as dealer_${ name }` ),
    ]

    const items = await pg.from( `${ TABLE_NAME } as offer` )
      .select( fields )
      .where( 'product_id', productId )
      .innerJoin( 'dealers as dealer', 'dealer.id', `offer.dealer_id` )
      .orderBy( 'offer.total_price' )

    return items.map( record => {
      const offer: any = {
        dealer: {}
      }

      Object.keys( record ).forEach( key => {
        if ( key.substring( 0, 5 ) === 'offer' ) {
          offer[key.substring( 6 )] = record[key]
        } else {
          offer.dealer[key.substring( 7 )] = record[key]
        }
      } )

      return snakeToCamelRecord( offer ) as IProductOffer
    } )
  }

  async addOrUpdateOffer( offer: Omit<tProductOfferTable, 'id'> ): Promise<tProductOfferTable> {
    const query = {
      dealerId: offer.dealerId,
      productId: offer.productId,
    }

    const existingOffers = await pg( TABLE_NAME ).where( camelToSnakeRecord( query ) ) as unknown as tProductOfferTable[]

    if ( existingOffers.length === 0 ) {
      return this.add( offer )
    }


    return this.update( {
      ...existingOffers[0],
      ...offer,
    } )
  }
}
