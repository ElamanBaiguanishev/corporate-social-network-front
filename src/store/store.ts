import { configureStore } from '@reduxjs/toolkit'
import userReduser from "./user/userSlice"
import themeReducer from "./theme/themeSlice"
import notificationsReducer from "./notifications/notificationsSlice"

export const store = configureStore({
    reducer: {
        user: userReduser,
        theme: themeReducer,
        notifications: notificationsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch