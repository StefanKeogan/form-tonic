import { flow } from "mobx";
import { IAnyModelType, Instance, SnapshotOut, types } from "mobx-state-tree";
import { Field } from "./Field";
import { ValidationSchema } from './ValidationSchema';

interface IHandleSubmitParams {
  action: () => Promise<any>
}

export const Form = types.model('Form', {
  name: types.string,
  fields: types.array(types.reference(types.late(():IAnyModelType => Field))),
  validationSchema: types.maybeNull(ValidationSchema),
  submitting: types.optional(types.boolean, false),
  values: types.optional(types.array(types.string), []), // TODO: Value model / store
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