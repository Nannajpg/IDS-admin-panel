import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: "0",
        name: "Sticker 1",
        height: "Height",
        weight: "Weight",
        stickerRate: 'Ratio',
        completed: false,
    }
]

export const stickerSlice = createSlice({
    name: 'stickers',
    initialState,
    reducers: {
        createSticker: (state, action) => {
            state.push(action.payload)
        },
        updateSticker: (state, action) => {
            const {id, name, height, weight, stickerRate} = action.payload
            const foundSticker = state.find(sticker => sticker.id === id)
            if (foundSticker) {
                foundSticker.name = name
                foundSticker.height = height
                foundSticker.weight = weight
                foundSticker.stickerRate = stickerRate
            }
        },
        deleteSticker: (state, action) => {
            const stickerFound = state.find(sticker => sticker.id === action.payload)
            if (stickerFound) {
                state.splice(state.indexOf(stickerFound), 1)
            }
        },
        
    },
})

export const { createSticker, updateSticker, deleteSticker } = stickerSlice.actions

export default stickerSlice.reducer