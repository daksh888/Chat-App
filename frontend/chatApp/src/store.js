import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { chatApi } from './services/chatApi'
import { userReducer } from './services/userReducer'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [chatApi.reducerPath]: chatApi.reducer,
    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)