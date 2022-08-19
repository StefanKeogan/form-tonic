import { types, Instance, SnapshotOut } from 'mobx-state-tree';

export const User = types.model('User', {
  first_name: types.string,
  last_name: types.string,
  email: types.string
}).views(self => ({
  get fullName() {
    return `${self.first_name} ${self.last_name}`;
  }
}))
  .actions(self => ({
    setAttributes: (userData: any) => {
      self.first_name = userData.first_name;
      self.last_name = userData.last_name;
      self.email = userData.email;
    }
  }));

export interface UserType extends Instance<typeof User> { }
type UserSnapshotType = SnapshotOut<typeof User>
export interface UserSnapshot extends UserSnapshotType { }