"use client";

import React from "react";
import cx from "classnames";
import { COLORS, MENU_ITEMS } from "@/app/constants";
import styles from "./index.module.css";
import useStore from "@/app/store";
import { useShallow } from "zustand/shallow";

import { socket } from "@/app/socket";

const ToolBox = () => {
  const { activeMenuItem, changeColor, changeBrushSize } = useStore(
    useShallow((state) => ({
      activeMenuItem: state.activeMenuItem,
      changeColor: state.changeColor,
      changeBrushSize: state.changeBrushSize,
    }))
  );
  const activeMenuItemData = useStore((state) => state[activeMenuItem]);
  const color =
    "color" in activeMenuItemData ? activeMenuItemData.color : COLORS.BLACK;
  const size = "size" in activeMenuItemData ? activeMenuItemData.size : 1;

  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption =
    activeMenuItem === MENU_ITEMS.ERASER ||
    activeMenuItem === MENU_ITEMS.PENCIL;

  const updateBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeBrushSize({
      item: activeMenuItem,
      size: +e.target.value,
    });
    socket.emit("changeConfig", {
      color,
      size: +e.target.value,
    });
  };

  const updateColor = (value: (typeof COLORS)[keyof typeof COLORS]) => {
    changeColor({
      item: activeMenuItem,
      color: value,
    });
    socket.emit("changeConfig", { color: value, size });
  };

  return (
    <div className={styles.toolboxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            {Object.entries(COLORS).map(([key, value]) => (
              <div
                key={key}
                className={cx(styles.colorBox, {
                  [styles.active]:
                    value ===
                    ("color" in activeMenuItemData
                      ? activeMenuItemData.color
                      : COLORS.BLACK),
                })}
                style={{ backgroundColor: value }}
                onClick={() => updateColor(value)}
              />
            ))}
          </div>
        </div>
      )}
      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Brush Size</h4>
          <div className={styles.itemContainer}>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              style={{
                cursor: "pointer",
              }}
              onChange={updateBrushSize}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolBox;
