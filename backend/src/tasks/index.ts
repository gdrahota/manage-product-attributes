import { createDealerOffers } from "./create-dealer-offers-mock"

export const createTasks = async () => {
  // await createDummyProducts()
  await createDealerOffers()
}