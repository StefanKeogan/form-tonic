import { types, flow, getRoot, getParent, castToSnapshot, getSnapshot } from 'mobx-state-tree';
import { User, UserSnapshot, UserType } from './User';
import { RootStore } from './RootStore';
import { toJS } from 'mobx';
import { IFormConfig, IFormField } from './FormStore';


const UserStore = types.model('UserStore', {
  user: User,
  loggedIn: types.optional(types.boolean, false),
  accessToken: types.maybeNull(types.string),
  loading: types.optional(types.boolean, false)
})
  .views(self => ({
    get userAsFormConfig(): IFormConfig {
      return {
        name: 'UserForm',
        fields: [{
          name: 'first_name',
          type: 'text',
          default: self.user.first_name
        }, {
          name: 'first_name',
          type: 'text',
          default: self.user.first_name
        }, {
          name: 'first_name',
          type: 'text',
          default: self.user.first_name
        }]
      };
    }
  }))
  .actions(self => ({
    setUser: (userSnapshot: UserSnapshot) => {
      self.user = User.create(userSnapshot);
    }
  }));

export default UserStore;