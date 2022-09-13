import { createDealerOffers } from "./create-dealer-offers-mock"
import createDummyProducts from "./create-dummy-products"
import { createDealers } from "./create-dealers"

export const createTasks = async () => {
  await createDummyProducts()
  await createDealers()
  await createDealerOffers()
}
