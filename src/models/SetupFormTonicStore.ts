import { FieldTypeStore } from "./FieldTypeStore";
import FormStore from "./FormStore";
import FormTonicStrore from "./FormTonicStore";

interface IConfig {
  customFieldTypes?: Array<{name: string}>
}

export async function setupFormTonicStore(config: IConfig) {

  let fieldTypes = [
    { name: 'text' },
    { name: 'select' },
  ];

  if (config.customFieldTypes) {
    fieldTypes = [
      ...fieldTypes,
      ...config.customFieldTypes
    ];
  }

  return FormTonicStrore.create({
    formStore: FormStore.create(),
    fieldTypeStore: FieldTypeStore.create({ fieldTypes })
  });
}