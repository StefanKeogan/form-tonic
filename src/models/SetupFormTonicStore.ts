import { castToReferenceSnapshot } from "mobx-state-tree";
import { FieldTypeSnapshot } from "./FieldType";
import { FieldTypeStore } from "./FieldTypeStore";
import { FormStore } from "./FormStore";
import { FormTonicStore } from "./FormTonicStore";

interface IConfig {
  customFieldTypes?: FieldTypeSnapshot[]
}

export async function setupFormTonicStore(config?: IConfig) {

  let fieldTypes: FieldTypeSnapshot[] = [
    { id: '1', name: 'text' },
    { id: '2', name: 'select' },
  ];

  if (config?.customFieldTypes) {
    fieldTypes = [
      ...fieldTypes,
      ...config.customFieldTypes
    ];
  }

  const formTonicStore = FormTonicStore.create({
    formStore: castToReferenceSnapshot(FormStore.create()),
    fieldTypeStore: FieldTypeStore.create({fieldTypes})
  });

  return formTonicStore;
}