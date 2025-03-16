"use client"

import React, { useRef, useEffect } from "react";

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

interface GridOffset {
    x: number;
    y: number;
}

interface SquaresProps {
    direction?: "diagonal" | "up" | "right" | "down" | "left";
    speed?: number;
    borderColor?: CanvasStrokeStyle;
    squareSize?: number;
    hoverFillColor?: CanvasStrokeStyle;
    children?: React.ReactNode;
    id?: string;
}

const Squares: React.FC<SquaresProps> = ({
    direction = "diagonal",
    speed = 1,
    borderColor = "#2a322f",
    squareSize = 40,
    hoverFillColor = "#00ffa1",
    children = null,
    id = "",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const numSquaresX = useRef<number>(0);
    const numSquaresY = useRef<number>(0);
    const gridOffset = useRef<GridOffset>({ x: 0, y: 0 });
    const hoveredSquareRef = useRef<GridOffset | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
            numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawGrid = () => {
            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
            const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

            for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
                for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
                    const squareX = x - (gridOffset.current.x % squareSize);
                    const squareY = y - (gridOffset.current.y % squareSize);

                    if (
                        hoveredSquareRef.current &&
                        Math.floor((x - startX) / squareSize) === hoveredSquareRef.current.x &&
                        Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
                    ) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.fillRect(squareX, squareY, squareSize, squareSize);
                    }

                    ctx.strokeStyle = borderColor;
                    ctx.strokeRect(squareX, squareY, squareSize, squareSize);
                }
            }
        };

        const updateAnimation = () => {
            const effectiveSpeed = Math.max(speed, 0.1);
            switch (direction) {
                case "right":
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    break;
                case "left":
                    gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
                    break;
                case "up":
                    gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
                    break;
                case "down":
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                case "diagonal":
                    gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
                    gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
                    break;
                default:
                    break;
            }

            drawGrid();
            requestRef.current = requestAnimationFrame(updateAnimation);
        };

        requestRef.current = requestAnimationFrame(updateAnimation);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, [direction, speed, borderColor, hoverFillColor, squareSize]);

    return (
        <div id="squares">
            <canvas ref={canvasRef} />
            {children}
        </div>
    );
};

export default Squares;
