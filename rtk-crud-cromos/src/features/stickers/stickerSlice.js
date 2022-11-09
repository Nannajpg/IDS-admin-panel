import { createSlice } from '@reduxjs/toolkit';

export const stickerSlice = createSlice({
    name: 'stickers',
    initialState: [],
    reducers: {
        createSticker: (state, action) => {
            state.push(action.payload)
        },
        readStickers: (state, action) => {
            const id = action.payload.id
            const foundSticker = state.find(sticker => sticker.id === id)
            if (!foundSticker){
                state.push(action.payload)
            }
        },
        updateSticker: (state, action) => {
            const { id, playerName, team, country, position, height, weight, appearanceRate, img } = action.payload
            console.log('Update')
            console.log(action.payload)
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

export const { createSticker, readStickers, updateSticker, deleteSticker } = stickerSlice.actions

export default stickerSlice.reducer