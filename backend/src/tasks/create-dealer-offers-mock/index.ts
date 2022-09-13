import { DealerTable } from "../../db/tables/dealers"
import { ProductTable } from "../../db/tables/products"
import { EnumDealerStatus } from "../../seeder/table-defs/dealers/def"
import Bluebird from "bluebird"
import { ProductOfferHistoryTable, tProductOfferTable } from "../../db/tables/product-offers-history"
import { DealerPriceImportRunTable } from "../../db/tables/dealer-price-import-runs"
import { ProductOfferCurrentTable } from "../../db/tables/product-offers-current"

export const createDealerOffers = async () => {
  const dealerTable = new DealerTable()
  const productTable = new ProductTable()
  const productOfferHistoryTable = new ProductOfferHistoryTable()
  const productOfferCurrentTable = new ProductOfferCurrentTable()
  const dealerPriceImportRunTable = new DealerPriceImportRunTable()

  const dealers = await dealerTable.getByStatus( EnumDealerStatus.VALID )
  const products = await productTable.getAll()

  await Bluebird.each( dealers, async ( dealer ) => {
    const importRun = await dealerPriceImportRunTable.add( { dealerId: dealer.id } )

    await Bluebird.each( products, async product => {
      if ( Math.random() < 0.3 ) {
        return
      }

      const itemPrice = Math.round( (Math.random() * 8000 + 15000) ) / 100
      const shippingPrice = dealer.id + 0.79

      const offer: Omit<tProductOfferTable, 'id'> = {
        importId: importRun.id,
        dealerId: dealer.id,
        productId: product.id,
        itemPrice,
        shippingPrice,
        totalPrice: itemPrice + shippingPrice
      }

      await productOfferHistoryTable.add( offer )
      await productOfferCurrentTable.addOrUpdateOffer( offer )

      if ( product.bestPrice === null || product.bestPrice > offer.itemPrice ) {
        await productTable.patch( product.id, {
          bestPrice: offer.itemPrice,
          bestPriceDealerId: offer.dealerId,
          show: true
        } )
      }
    } )
  } )

  console.log( '==> demo data created' )
}
