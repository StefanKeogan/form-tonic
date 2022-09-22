import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ObjectSchema, object }from "yup"
import { AnyObject, TypeOfShape, OptionalObjectSchema } from "yup/lib/object";

export const ValidationSchema = types.custom<string, OptionalObjectSchema<any, AnyObject, TypeOfShape<any>>>({
  name: 'ValidationSchema',

  fromSnapshot(value: string) {
    const shema = JSON.parse(value);

    const objectSchema = {} as any;

    Object.keys(shema).forEach((key: string) => {
      const fieldRules = key.split('|');

      fieldRules.forEach((rule: string) => {
        switch(rule) {
          case 'required':
            objectSchema[key] = objectSchema[key].required();
            break;
          case 'string':
            objectSchema[key] = objectSchema[key].string();
            break;
          case 'integer':
            objectSchema[key] = objectSchema[key].integer();
            break;
          case 'email':
            objectSchema[key] = objectSchema[key].email();
            break;
        }
      });
    });

    return object(objectSchema);
  },

  toSnapshot(value: object) {
    return value.toString();
  },

  isTargetType(value: string | object) {
    return true; //value instanceof ObjectSchema;
  },

  getValidationMessage(value: string) {
    return 'This is not a valid schema';
  }
});

// export interface ValidationSchemaType extends Instance<typeof ValidationSchema> {}
// type ValidationSchemaSnapshotType = SnapshotOut<typeof ValidationSchema>
// export interface ValidationSchemaSnapshot extends ValidationSchemaSnapshotType {}
