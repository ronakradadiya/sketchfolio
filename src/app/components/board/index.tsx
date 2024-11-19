"use client";

import React, { useRef, useLayoutEffect } from "react";
import { useShallow } from "zustand/shallow";
import useStore from "@/app/store";

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { activeMenuItem } = useStore(
    useShallow((state) => ({
      activeMenuItem: state.activeMenuItem,
    }))
  );
  const activeMenuItemData = useStore((state) => state[activeMenuItem]);

  console.log("Board", activeMenuItemData);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
