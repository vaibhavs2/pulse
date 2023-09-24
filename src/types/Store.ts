export type StoreInfo = {
  address: string;
  area: string;
  name: string;
  route: string;
  id: string;
};

export type userStoreId = {storeId: string; docKey: string};
export type UserStoreList = {
  storeIds: Array<userStoreId>;
  haveMore: boolean;
  nextCursor: string;
};
