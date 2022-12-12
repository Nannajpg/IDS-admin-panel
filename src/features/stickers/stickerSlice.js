import { createSlice } from '@reduxjs/toolkit';

export const stickerSlice = createSlice({
    name: 'stickers',
    initialState: {
        amount: 0,
        page: 0,
        stickers: []
    },
    reducers: {
        readStickers: (state, action) => {
            const id = action.payload.id
            const foundSticker = state.stickers.find(sticker => sticker.id === id)
            if (!foundSticker){
                state.stickers.push(action.payload)
            }
        },
        updateSticker: (state, action) => {
            const { id, playerName, team, country, position, height, weight, appearanceRate, myFile } = action.payload
            const foundSticker = state.stickers.find(sticker => sticker.id === id)
            if (foundSticker) {
                foundSticker.playerName = playerName
                foundSticker.team = team
                foundSticker.country = country
                foundSticker.position = position
                foundSticker.height = height
                foundSticker.weight = weight
                foundSticker.appearanceRate = appearanceRate
                foundSticker.img = URL.createObjectURL(myFile)
            }
        },
        deleteSticker: (state, action) => {
            const stickerFound = state.stickers.find(sticker => sticker.id === action.payload)
            if (stickerFound) {
                state.stickers.splice(state.stickers.indexOf(stickerFound), 1)
            }
        },
        nextPage: (state, action) => {
            state.page++;
        },
        prevPage: (state, action) => {
            state.page--;
        },
        setPage: (state, action) => {
            state.stickers = [];
            state.page = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
    },
})

export const { readStickers, updateSticker, deleteSticker, nextPage, prevPage, setPage, setAmount } = stickerSlice.actions

export default stickerSlice.reducer