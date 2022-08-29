import { types } from "mobx-state-tree";
import { Form, FormType } from "./Form";

export const FormStore = types.model('FormStore', {
  forms: types.array(Form)
})
  .views(self => ({
    get formByName() {
      return (formName: string) => {
        return self.forms.find((form: FormType) => form.name === formName)
      }
    }
  }));