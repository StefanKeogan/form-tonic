import { IAnyModelType, Instance, IStateTreeNode, SnapshotOut, types } from "mobx-state-tree";
import { withRootStore } from "./extensions/withRootStore";
import { Field, FieldSnapshot } from "./Field";
import { Form, FormSnapshot, FormType } from "./Form";
import { ValidationSchema } from "./ValidationSchema";

export interface IFormConfig {
  formName: string;
  fields?: IFormField[];
  model?:  IStateTreeNode<IAnyModelType>
  initialValues?: Array<string | number | boolean | Array<{value: string | number, label: string}>>
}

export interface IFormField {
  name: string;
  type: string;
  validation?: string;
}

export const FormStore = types.model('FormStore', {
  forms: types.optional(types.array(Form), [])
})
  .extend(withRootStore)
  .views(self => ({
    get formByName() {
      return (formName: string) => {
        return self.forms.find((form: FormType) => form.name === formName)
      }
    }
  }))
  .actions(self => ({
    saveForm(formSnapshot: FormSnapshot) {
      self.forms.replace([
        ...self.forms, 
        Form.create(formSnapshot)
      ]);
    }
  }))
  .actions(self => ({
    /**
     * Have the option to pass field array and or model, base fields off of the model first (if its provided)
     * then add any fields passed as objects, this could be a nice way of overriding any of the
     * models fields with a custom field type.
     */
    createForm(formConfig: IFormConfig) {

      let fieldSnapshots: FieldSnapshot[] = [];

      let valdationSchemaSnapshot: any = {};

      // Using a model
      if (formConfig.model) {
        Object.keys(formConfig.model).forEach((key: string) => {

          const model: any = formConfig.model;

          let fieldSnapshot: FieldSnapshot = {
            name: key,
            type: '1',
          }

          switch (true) {
            case typeof model[key] === 'string':
              fieldSnapshot.type = '1';
              // valdationSchemaSnapshot[key] = 'string|required';
              break;
            case typeof model[key] === 'number':
              fieldSnapshot.type = '1';
              // valdationSchemaSnapshot[key] = 'number|required';
              break;
            // case typeofmodel[key] === 'array':
            //   fieldSnapshot.type = '2';
              // break;
          }

          fieldSnapshots.push(fieldSnapshot);
        });
      }

      // Using fields
      if (formConfig.fields) {
        formConfig.fields.forEach((field: IFormField) => {
          let fieldSnapshot: FieldSnapshot | undefined = fieldSnapshots.find((f: FieldSnapshot) => f.name === field.name);

          if (fieldSnapshot === undefined) {
            fieldSnapshot = {
              name: field.name,
              type: field.type,
            }
          }
        });
      }

      const formSnapshot: FormSnapshot = {
        name: formConfig.formName,
        fields: fieldSnapshots.map((f: FieldSnapshot) => Field.create(f)),
        validationSchema: JSON.stringify(valdationSchemaSnapshot),
        submitting: false
      }

      self.saveForm(formSnapshot);
    }
  }));

export interface FormStoreType extends Instance<typeof FormStore> {}
type FormStoreSnapshotType = SnapshotOut<typeof FormStore>
export interface FormStoreSnapshot extends FormStoreSnapshotType {}