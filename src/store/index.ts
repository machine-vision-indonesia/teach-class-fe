// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/@example/store/___examples/apps/chat'
import user from 'src/@example/store/___examples/apps/user'
import email from 'src/@example/store/___examples/apps/email'
import invoice from 'src/@example/store/___examples/apps/invoice'
import calendar from 'src/@example/store/___examples/apps/calendar'
import permissions from 'src/@example/store/___examples/apps/permissions'
import modules from 'src/store/module'

export const store = configureStore({
  reducer: {
    // ___EXAMPLE STORE
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    modules

    // ___EXAMPLE STORE [END]
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
