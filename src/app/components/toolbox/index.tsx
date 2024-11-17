import React from "react";
import { COLORS } from "@/app/constants";
import styles from "./index.module.css";

const ToolBox = () => {
  const updateBrushSize = () => {
    //
  };

  const updateColor = () => {
    //
  };

  return (
    <div className={styles.toolboxContainer}>
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Stroke Color</h4>
        <div className={styles.itemContainer}>
          {Object.entries(COLORS).map(([key, value]) => (
            <div
              key={key}
              className={styles.colorBox}
              style={{ backgroundColor: value }}
              // onClick={() => updateColor(value)}
            />
          ))}
        </div>
      </div>
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush Size</h4>
        <div className={styles.itemContainer}>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            style={{
              cursor: 'pointer'
            }}
            // onChange={updateBrushSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
