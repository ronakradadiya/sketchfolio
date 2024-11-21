"use client";

import React, { useRef, useLayoutEffect, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import useStore from "@/app/store";
import { COLORS, MENU_ITEMS } from "@/app/constants";

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef<ImageData[]>([]);
  const historyPointer = useRef(0);
  const { activeMenuItem, actionMenuItem, actionItemClick } = useStore(
    useShallow((state) => ({
      activeMenuItem: state.activeMenuItem,
      actionMenuItem: state.actionMenuItem,
      actionItemClick: state.actionItemClick,
    }))
  );
  const activeMenuItemData = useStore((state) => state[activeMenuItem]);
  const color =
    "color" in activeMenuItemData ? activeMenuItemData.color : COLORS.BLACK;
  const size = "size" in activeMenuItemData ? activeMenuItemData.size : 1;

  console.log("Board", activeMenuItemData);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context || !actionMenuItem) {
      return;
    }

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) {
        historyPointer.current -= 1;
      }
        
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      ) {
        historyPointer.current += 1;
      }
        
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }

    actionItemClick(null);
  }, [actionMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const changeConfig = (
      color: (typeof COLORS)[keyof typeof COLORS],
      size: number
    ) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig(color, size);
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const beginPath = (x: number, y: number) => {
      context.beginPath(); // tells the canvas “I’m starting a new drawing path”. Without this, new strokes would keep connecting to previous ones, beginPath essentially resets the drawing state and it needs moveTo.
      context.moveTo(x, y); // moves the “pen” to a starting position (x, y) without drawing a line. Think of it as “pick up the pen and place it here”.
    };

    const drawLine = (x: number, y: number) => {
      context.lineTo(x, y); // draws a line from the current position (set by moveTo or the last lineTo) to the new (x, y) point, but doesn’t render it yet.
      context.stroke(); // actually renders (strokes) the path on the canvas, using the current stroke style (color, thickness, etc.). This is what makes the line visible.
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      shouldDraw.current = true;

      let x: number;
      let y: number;

      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }

      beginPath(x, y);
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!shouldDraw.current) return;

      let x: number;
      let y: number;

      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }

      drawLine(x, y);
    };

    const handleMouseUp = (e: MouseEvent | TouchEvent) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleMouseDown);
    canvas.addEventListener("touchmove", handleMouseMove);
    canvas.addEventListener("touchend", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      canvas.removeEventListener("touchstart", handleMouseDown);
      canvas.removeEventListener("touchmove", handleMouseMove);
      canvas.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
