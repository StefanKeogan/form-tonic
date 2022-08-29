import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const FieldType = types.model('FieldType', {
  name: types.string,
});

export interface FieldTypeType extends Instance<typeof FieldType> {}
type FieldTypeSnapshotType = SnapshotOut<typeof FieldType>
export interface FieldTypeSnapshot extends FieldTypeSnapshotType {}