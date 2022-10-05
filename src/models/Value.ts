import { types } from "mobx-state-tree";

export interface ValueSnapshot {
  name: string, 
  value: string | number | Array<string | number>
}

export const Value = types.custom<string, ValueSnapshot>({
  name: 'Value',

  fromSnapshot(snapshot: string) {
    const shema = JSON.parse(snapshot);

    return { 
      name: shema.name, 
      value: shema.value 
    }
  },

  toSnapshot(value: object) {
    return JSON.stringify(value);
  },

  isTargetType(value: string | object) {
    return true;
  },

  getValidationMessage(value: string) {
    return 'This is not a valid schema';
  }
});