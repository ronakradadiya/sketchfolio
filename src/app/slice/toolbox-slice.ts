import { COLORS, MENU_ITEMS } from "@/app/constants";
import { StateCreator } from "zustand";
import { IMenuSlice } from "./menu-slice";

export interface IToolboxSlice {
  [MENU_ITEMS.PENCIL]: {
    color: (typeof COLORS)[keyof typeof COLORS];
    size: number;
  };
  [MENU_ITEMS.ERASER]: {
    color: (typeof COLORS)[keyof typeof COLORS];
    size: number;
  };
  [MENU_ITEMS.UNDO]: {};
  [MENU_ITEMS.REDO]: {};
  [MENU_ITEMS.DOWNLOAD]: {};

  changeColor: (payload: {
    item: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS];
    color: (typeof COLORS)[keyof typeof COLORS];
  }) => void;
  changeBrushSize: (payload: {
    item: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS];
    size: number;
  }) => void;
}

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    color: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    color: COLORS.WHITE,
    size: 3,
  },
  [MENU_ITEMS.UNDO]: {},
  [MENU_ITEMS.REDO]: {},
  [MENU_ITEMS.DOWNLOAD]: {},
};

const toolboxSlice: StateCreator<
  IMenuSlice & IToolboxSlice,
  [],
  [],
  IToolboxSlice
> = (set) => ({
  ...initialState,
  changeColor: (payload: {
    item: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS];
    color: (typeof COLORS)[keyof typeof COLORS];
  }) =>
    set((state) => ({
      [payload.item]: {
        ...state[payload.item],
        color: payload.color,
      },
    })),
  changeBrushSize: (payload: {
    item: (typeof MENU_ITEMS)[keyof typeof MENU_ITEMS];
    size: number;
  }) =>
    set((state) => ({
      [payload.item]: {
        ...state[payload.item],
        brush: payload.size,
      },
    })),
});

export default toolboxSlice;
