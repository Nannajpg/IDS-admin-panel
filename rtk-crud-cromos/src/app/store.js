import { configureStore } from '@reduxjs/toolkit'
import stickerReducer from '../features/stickers/stickerSlice'

export const store = configureStore({
    reducer: {
        stickers: stickerReducer,
    },
})
