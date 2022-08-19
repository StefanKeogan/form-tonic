import { types, flow, getRoot, getParent } from 'mobx-state-tree';
import { User, UserSnapshot, UserType } from './User';
import { RootStore } from './RootStore';


const UserStore = types.model('UserStore', {
  user: User,
  loggedIn: types.optional(types.boolean, false),
  accessToken: types.maybeNull(types.string),
  loading: types.optional(types.boolean, false)
})
  .views(self => ({}))
  .actions(self => ({
    setUser: (userSnapshot: UserSnapshot) => {
      self.user = User.create(userSnapshot);
    }
  }));

export default UserStore;