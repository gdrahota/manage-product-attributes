import { GenericClass } from "../_base_class"
import { tDealerTable } from "../dealers"

export interface tProductOfferTable {
  id: number
  importId: number
  productId: number
  dealerId: number
  itemPrice: number
  shippingPrice: number
  totalPrice: number
}

export interface IProductOffer {
  dealer: tDealerTable
  itemPrice: number
  shippingPrice: number
}

const TABLE_NAME = 'product_offers_history'

export class ProductOfferHistoryTable extends GenericClass<tProductOfferTable> {
  constructor() {
    super( TABLE_NAME )
  }
}
