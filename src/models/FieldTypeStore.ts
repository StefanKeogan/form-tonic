import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { FieldType } from "./FieldType";

export const FieldTypeStore = types.model('FieldTypeStore', {
  fieldTypes: types.array(FieldType),
});

export interface FieldTypeStoreType extends Instance<typeof FieldTypeStore> {}
type FieldTypeStoreSnapshotType = SnapshotOut<typeof FieldTypeStore>
export interface FieldTypeStoreSnapshot extends FieldTypeStoreSnapshotType {}