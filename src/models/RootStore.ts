import { Instance, types } from "mobx-state-tree"
import UserStore from "./UserStore";

/**
 * A RootStore model.
 */
export const RootStore = types.model("RootStore").props({
  userStore: UserStore
}).actions(self => ({
  // logout: flow(function* () {
  //  self.groupStore = GroupStore.create();
  // })
}));

/**
 * The RootStore instance.
 */
export interface RootStoreType extends Instance<typeof RootStore> { };