import { createSlice } from '@reduxjs/toolkit';

export const stickerSlice = createSlice({
    name: 'stickers',
    initialState: {
        amount: 0,
        page: 0,
        totalPages: 0,
        stickers: [],
        search: "",
    },
    reducers: {
        setSticker: (state, {payload}) =>{
            state.stickers = payload;
        },
        updateSticker: (state, action) => {
            const { id, playerName, team, position, height, weight, appearanceRate, myFile } = action.payload
            const foundSticker = state.stickers.find(sticker => sticker.id === id)
            if (foundSticker) {
                foundSticker.playerName = playerName
                foundSticker.team = team
                foundSticker.position = position
                foundSticker.height = height
                foundSticker.weight = weight
                foundSticker.appearanceRate = appearanceRate
                foundSticker.img = URL.createObjectURL(myFile)
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
        setTotalPages: (state, action) => {
            state.totalPages = action.payload;
        },
        toSearch: (state, action) => {
            state.search = action.payload;
          },
        toFilter: (state, action) => {
            state.event = action.payload;
        },
        toFirstPage: (state) => {
            state.page = 0;
        },
    },
})

export const { readStickers, updateSticker, nextPage, prevPage, setPage, setAmount, setTotalPages, toFirstPage, toSearch, setSticker } = stickerSlice.actions

export default stickerSlice.reducer