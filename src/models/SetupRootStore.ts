import { castToReferenceSnapshot } from "mobx-state-tree";
import { RootStore, RootStoreType } from "./RootStore";
// import makeInspectable from 'mobx-devtools-mst';
import UserStore from "./UserStore";


/**
 * Setup the root state.
 *
 * Need to use "castToReferenceSnapshot" when the store uses a reference
 * https://gitanswer.com/typescript-error-with-reference-types-795499008 
 * 
 */
export async function setupRootStore() {
  let store: RootStoreType;

  store = RootStore.create({
    userStore: UserStore.create({ user: { first_name: 'Adrian', last_name: 'Keogan', email: 'dev@saltandtonic.co.nz' } })
  });

  // makeInspectable(store);

  return store;
}
