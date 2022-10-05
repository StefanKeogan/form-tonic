import { flow } from "mobx";
import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Field } from "./Field";
import { ValidationSchema } from './ValidationSchema';
import { ValueSnapshot, Value } from "./Value";

interface IHandleSubmitParams {
  action: () => Promise<any>
}

export const Form = types.model('Form', {
  name: types.string,
  fields: types.array(Field),
  values: types.array(Value),
  validationSchema: ValidationSchema,
  submitting: types.optional(types.boolean, false),
})
  .actions(self => ({
    setSubmitting(submitting: boolean) {
      self.submitting = submitting;
    },
    setValue(valueSnapshot: ValueSnapshot) {
      const newValues = [...self.values].filter((v: ValueSnapshot) => v.name === valueSnapshot.name);
      self.values.replace([...newValues, Value.create(valueSnapshot)]);
    }
  }))
  .actions(self => ({
    handleSubmit: flow(function* (params: IHandleSubmitParams) {
      self.setSubmitting(true);

      let values: any = {}

      self.values.forEach((value: ValueSnapshot) => {
        values[value.name] = value.value;        
      });

      const errors = yield self.validationSchema.validate(values);

      if (Object.keys(errors).length) {
        self.setSubmitting(false);
        return { errors };
      }

      const response = yield params.action();

      self.setSubmitting(false);

      return { response };
    })
  }));

export interface FormType extends Instance<typeof Form> {}
type FormSnapshotType = SnapshotOut<typeof Form>
export interface FormSnapshot extends FormSnapshotType {}