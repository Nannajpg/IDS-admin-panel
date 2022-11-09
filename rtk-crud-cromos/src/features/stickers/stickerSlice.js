import { createSlice } from '@reduxjs/toolkit';
import { saveSticker } from '../../services/axios';

const initialState = []

export const stickerSlice = createSlice({
    name: 'stickers',
    initialState,
    reducers: {
        initStickers: (state, action) => {
            action.payload.forEach(sticker => state.push(sticker));
        },
        createSticker: (state, action) => {
            state.push(action.payload);
        },
        updateSticker: (state, action) => {
            const { id, playerName, team, country, position, height, weight, appearanceRate, img } = action.payload
            const foundSticker = state.find(sticker => sticker.id === id)
            if (foundSticker) {
                foundSticker.playerName = playerName
                foundSticker.team = team
                foundSticker.country = country
                foundSticker.position = position
                foundSticker.height = height
                foundSticker.weight = weight
                foundSticker.appearanceRate = appearanceRate
                foundSticker.img = img
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

export const { initStickers, createSticker, updateSticker, deleteSticker } = stickerSlice.actions

export default stickerSlice.reducer