import { flow } from "mobx";
import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Field } from "./Field";
import { ValidationSchema } from './ValidationSchema';

interface IHandleSubmitParams {
  action: () => Promise<any>
}

export const Form = types.model('Form', {
  name: types.string,
  fields: types.map(Field),
  validationSchema: types.maybeNull(ValidationSchema),
  submitting: types.boolean
})
  .actions(self => ({
    setSubmitting(submitting: boolean) {
      self.submitting = submitting;
    }
  }))
  .actions(self => ({
    handleSubmit: flow(function* (params: IHandleSubmitParams) {
      self.setSubmitting(true);

      // TODO: Validation

      yield params.action();

      self.setSubmitting(false);
    })
  }));

export interface FormType extends Instance<typeof Form> {}
type FormSnapshotType = SnapshotOut<typeof Form>
export interface FormSnapshot extends FormSnapshotType {}