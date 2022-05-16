import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TemplateType } from "../types/template";

export interface AppState {
  templates: TemplateType[];
}

const initialState: AppState = { templates: [] };

export const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    add: (state: AppState, action: PayloadAction<TemplateType>) => {
      state.templates.push(action.payload);
    },
    remove: (state: AppState, action: PayloadAction<number>) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload)
    },
    update: (state: AppState, action: PayloadAction<TemplateType>) => {
      state.templates = state.templates.map(t => {
				if (t.id === action.payload.id) {
					return {...t, ...action.payload};
				}
					return t;
			})
		}
  },
});

export const { add, remove, update } =
  templateSlice.actions;

export default templateSlice.reducer