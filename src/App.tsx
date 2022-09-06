import { useEffect, useState } from 'react'
import './App.css'
import { RootStoreProvider, useStores } from './models/RootStoreContext'
import { setupRootStore } from './models/SetupRootStore'
import { RootStoreType } from './models/RootStore'

function App() {
  const [rootStore, setRootStore] = useState<RootStoreType | null>(null);

  useEffect(() => {
    ; (async () => {
      const store = await setupRootStore();
      setRootStore(store);
      store.formTonicStore.formStore.createForm(store.userStore.userAsFormConfig);
    })();
  }, []);

  const TestForm: React.FC = () => {
    const { formTonicStore } = useStores();
    // const form = formTonicStore.formStore.selectedForm;

    return <>

    </>;
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