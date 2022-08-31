import { Instance, types } from "mobx-state-tree";
import { FieldTypeStore } from "./FieldTypeStore";
import FormStore from "./FormStore";

export const FormTonicStrore = types.model('FormTonicStore').props({
  formStore: FormStore,
  fieldTypeStore: FieldTypeStore
});

export interface FormTonicStoreType extends Instance<typeof FormTonicStrore> {};