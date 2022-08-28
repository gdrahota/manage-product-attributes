import { DealerTable } from "../../db/tables/dealers"
import { ProductTable } from "../../db/tables/products"
import { EnumDealerStatus } from "../../seeder/table-defs/dealers/def"
import Bluebird from "bluebird"
import { ProductOfferTable, tProductOfferTable } from "../../db/tables/product-offers"
import { DealerPriceImportRunTable } from "../../db/tables/dealer-price-import-runs"

export const createDealerOffers = async () => {
  const dealerTable = new DealerTable()
  const productTable = new ProductTable()
  const productOfferTable = new ProductOfferTable()
  const dealerPriceImportRunTable = new DealerPriceImportRunTable()

  const dealers = await dealerTable.getByStatus( EnumDealerStatus.VALID )
  const products = await productTable.getAllValid()

  await Bluebird.each( dealers, async ( dealer ) => {
    const importRun = await dealerPriceImportRunTable.add( { dealerId: dealer.id } )

    await Bluebird.each( products, async product => {
      if ( Math.random() < 0.3 ) {
        return
      }

      const offer: Omit<tProductOfferTable, 'id'> = {
        importId: importRun.id,
        dealerId: dealer.id,
        productId: product.id,
        itemPrice: Math.round( (Math.random() * 8000 + 15000) ) / 100,
        shippingPrice: dealer.id + 0.79
      }

      await productOfferTable.add( offer )

      if ( product.bestPrice === null || product.bestPrice > offer.itemPrice ) {
        await productTable.patch( product.id, {
          bestPrice: offer.itemPrice,
          bestPriceDealerId: offer.dealerId,
        } )
      }
    } )
  } )
}
