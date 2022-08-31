import { IAnyModelType, Instance, SnapshotOut, types } from "mobx-state-tree";
import { FieldType } from "./FieldType";

export const Field = types.model('Field', {
  id: types.identifier,
  name: types.string,
  type: types.reference(types.late((): IAnyModelType => FieldType)),
});

export interface FieldType extends Instance<typeof Field> {}
type FieldSnapshotType = SnapshotOut<typeof Field>
export interface FieldSnapshot extends FieldSnapshotType {}