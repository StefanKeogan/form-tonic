import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Form, FormType } from "./Form";

const FormStore = types.model('FormStore', {
  forms: types.optional(types.array(Form), [])
})
  .views(self => ({
    get formByName() {
      return (formName: string) => {
        return self.forms.find((form: FormType) => form.name === formName)
      }
    }
  }));

export default FormStore;

export interface FormStoreType extends Instance<typeof FormStore> {}
type FormStoreSnapshotType = SnapshotOut<typeof FormStore>
export interface FormStoreSnapshot extends FormStoreSnapshotType {}