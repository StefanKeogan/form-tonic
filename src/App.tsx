import { useEffect, useState } from 'react'
import './App.css'
import { RootStoreProvider } from './models/RootStoreContext'
import { setupRootStore } from './models/SetupRootStore'
import { RootStoreType } from './models/RootStore'

function App() {
  const [rootStore, setRootStore] = useState<RootStoreType | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    ; (async () => {
      const store = await setupRootStore();
      setRootStore(store);
    })();
  }, []);

  useEffect(() => {
    if (rootStore) {
      setUser(rootStore.userStore.user);
    }
  }, [rootStore]);

  return rootStore && (
    <RootStoreProvider value={rootStore}>
      <div className="App">
        <h1>Salty Forms</h1>
        {user ? <>
          <p>First name: {user.first_name}</p>
          <p>Last name: {user.last_name}</p>
          <p>Email: {user.email}</p>
        </>
          : null}
      </div>
    </RootStoreProvider>
  )
}

export default App