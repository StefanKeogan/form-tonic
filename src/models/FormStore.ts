import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Form, FormType } from "./Form";

export interface IFormConfig {
  name: string;
  fields: IFormField[];
}

export interface IFormField {
  name: string;
  type: string;
  default: string | number | boolean;
}

export const FormStore = types.model('FormStore', {
  forms: types.optional(types.array(Form), [])
})
  .views(self => ({
    get formByName() {
      return (formName: string) => {
        return self.forms.find((form: FormType) => form.name === formName)
      }
    }
  }))
  .actions(self => ({
    createForm(formConfig: IFormConfig) {
      console.log(formConfig.fields)
    }
  }));

export interface FormStoreType extends Instance<typeof FormStore> {}
type FormStoreSnapshotType = SnapshotOut<typeof FormStore>
export interface FormStoreSnapshot extends FormStoreSnapshotType {}