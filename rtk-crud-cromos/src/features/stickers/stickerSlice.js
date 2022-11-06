import { createSlice } from '@reduxjs/toolkit';
import { getAllStickers, saveSticker,editSticker, deletSticker} from '../../services/axios';

const initialState = []

export const stickerSlice = createSlice({
    name: 'stickers',
    initialState,
    reducers: {
        createSticker: async (state, action) => {
            const {id, playerName, team, country, position, height, weight, appearanceRate} = action.payload;
            const sticker={
                "id": id,
                "playerName": playerName,
                "team": team,
                "country": country,
                "position": position,
                "img": "",
                "height": height,
                "weight": weight,
                "appearanceRate": appearanceRate
            };
            await saveSticker(sticker);
            state.push(action.payload);
        },
        updateSticker: (state, action) => {
            const {id, playerName, team, country, position, height, weight, appearanceRate} = action.payload
            const foundSticker = state.find(sticker => sticker.id === id)
            if (foundSticker) {
                foundSticker.playerName = playerName
                foundSticker.team = team
                foundSticker.country = country
                foundSticker.position = position
                foundSticker.height = height
                foundSticker.weight = weight
                foundSticker.appearanceRate = appearanceRate
                editSticker(foundSticker);
            }
        },
        deleteSticker: (state, action) => {
            const stickerFound = state.find(sticker => sticker.id === action.payload)
            if (stickerFound) {
                deletSticker(stickerFound)
                state.splice(state.indexOf(stickerFound), 1)
            }
        },
        
    },
})



export const { createSticker, updateSticker, deleteSticker } = stickerSlice.actions

export default stickerSlice.reducer