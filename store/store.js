import { configureStore } from "@reduxjs/toolkit";
import musicReducer from "./MusicSlice";

export default configureStore({
  reducer: {
    music: musicReducer,
  },
});
