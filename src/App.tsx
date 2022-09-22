import { useEffect, useState } from 'react'
import './App.css'
import { RootStoreProvider, useStores } from './models/RootStoreContext'
import { setupRootStore } from './models/SetupRootStore'
import { RootStoreType } from './models/RootStore'
import Form from './components/form/Form'

function App() {
  const [rootStore, setRootStore] = useState<RootStoreType | null>(null);

  useEffect(() => {
    ; (async () => {
      const store = await setupRootStore();
      setRootStore(store);
      // store.formTonicStore.formStore.createForm(store.userStore.userAsFormConfig);

      store.formTonicStore.formStore.createForm({formName: 'UserForm', model: store.userStore.user});
    })();
  }, []);

  const TestForm: React.FC = () => {
    const { formTonicStore } = useStores();
    // const form = formTonicStore.formStore.selectedForm;

    return (
      <Form
        name="UserForm"
        action={async () => {}}
        renderField={() => <></>}
      />
    );
  }
 
  return rootStore && (
    <RootStoreProvider value={rootStore}>
      <div className="App">
        <h1>Salty Forms</h1>

        <TestForm />
      </div>
    </RootStoreProvider>
  )
}

export default App