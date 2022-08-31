import { castToReferenceSnapshot } from "mobx-state-tree";
import { FieldTypeStore } from "./FieldTypeStore";
import { FormStore } from "./FormStore";
import { FormTonicStore } from "./FormTonicStore";

interface IConfig {
  customFieldTypes?: Array<{name: string}>
}

export async function setupFormTonicStore(config?: IConfig) {

  let fieldTypes = [
    { name: 'text' },
    { name: 'select' },
  ];

  if (config?.customFieldTypes) {
    fieldTypes = [
      ...fieldTypes,
      ...config.customFieldTypes
    ];
  }

  const formTonicStore = FormTonicStore.create({
    formStore: castToReferenceSnapshot(FormStore.create()),
    fieldTypeStore: FieldTypeStore.create()
  });

  return formTonicStore;
}