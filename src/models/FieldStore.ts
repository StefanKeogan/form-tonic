import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Field } from "./Field";

export const FieldStore = types.model('FieldStore', {
  fields: types.optional(types.array(Field), [])
});

export interface FieldStoreType extends Instance<typeof FieldStore> {}
type FieldStoreSnapshotType = SnapshotOut<typeof FieldStore>
export interface FieldStoreSnapshot extends FieldStoreSnapshotType {}