import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,
         PURGE, REGISTER } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import authReducer from './state'
import storage from 'redux-persist/lib/storage'

const persistConfig = { key: 'root', storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer )
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistStore(store) }>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
