import { createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "Music",
  initialState: [],
  reducers: {
    // State : immutable
    // Reducer : renvoie le nouvel état mis à jour
    addMusic: (state, action) => {
      state.push(action.payload);
    },
    removeMusic: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateRating: (state, action) => {
      const { trackId, rating } = action.payload;
      const song = state.find((song) => song.trackId === trackId);
      if (song) {
        song.rating = rating;
      }
    },
  },
});

export const { addMusic, removeMusic, updateRating } = musicSlice.actions;
export const musicSelector = (state) => state.music;
export default musicSlice.reducer;
