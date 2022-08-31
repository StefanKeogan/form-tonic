import { RootStore, RootStoreType } from "./RootStore";
import makeInspectable from 'mobx-devtools-mst';
import UserStore from "./UserStore";
import { setupFormTonicStore } from './SetupFormTonicStore';
import { FormTonicStoreType } from "./FormTonicStore";


/**
 * Setup the root state.
 *
 * Need to use "castToReferenceSnapshot" when the store uses a reference
 * https://gitanswer.com/typescript-error-with-reference-types-795499008 
 * 
 */
export async function setupRootStore() {
  let store: RootStoreType;

  const formTonicStore = await setupFormTonicStore();

  store = RootStore.create({
    userStore: UserStore.create({ 
      user: { first_name: 'Adrian', last_name: 'Keogan', email: 'dev@saltandtonic.co.nz' } 
    }),
    
    formTonicStore
  });

  makeInspectable(store);

  return store;
}
