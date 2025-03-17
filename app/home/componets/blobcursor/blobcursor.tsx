"use client";

import { useTrail, animated } from "@react-spring/web";
import { useRef, useEffect, useCallback, useState } from "react";

const fast = { tension: 1500, friction: 50 };
const slow = { mass: 5, tension: 400, friction: 50 };
const trans = (x: number, y: number) =>
    `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0) rotate(45deg)`;

export default function BlobCursor({
    fillColor = "#00ffa1",
    className = "",
}: {
    fillColor?: string;
    className?: string;
}) {
    const [trail, api] = useTrail(2, (i) => ({
        xy: [0, 0],
        config: i === 0 ? fast : slow,
    }));

    const [isOverElement, setIsOverElement] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            return { left: rect.left, top: rect.top };
        }
        return { left: 0, top: 0 };
    }, []);

    const handleMove = (e: MouseEvent | TouchEvent) => {
        const { left, top } = updatePosition();
        const x = "clientX" in e ? e.clientX : e.touches[0].clientX;
        const y = "clientY" in e ? e.clientY : e.touches[0].clientY;
        api.start({ xy: [x - left, y - top] });

        const element = document.elementFromPoint(x, y);
        if (
            element &&
            ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "IMAGE", "IMG", "HEADER"].includes(
                element.tagName
            )
        ) {
            setIsOverElement(true);
        } else {
            setIsOverElement(false);
        }
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("touchmove", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("touchmove", handleMove);
        };
    }, [handleMove]);

    // Atualiza o cursor do usuário conforme o estado do cursor
    useEffect(() => {
        document.body.style.cursor = isOverElement ? "auto" : "none";
        return () => {
            document.body.style.cursor = "auto";
        };
    }, [isOverElement]);

    // Tamanhos para o quadrado perfeito
    const normalSize = 30; // Tamanho do quadrado normal
    const smallSize = 10;  // Tamanho do quadrado quando sobre elementos interativos

    return (
        <div className={`${className}`}>
            <div
                className="fixed top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 50 }}
            >
                <svg style={{ position: "absolute", width: 0, height: 0 }}>
                    <filter id="glow">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="5" />
                        <feColorMatrix
                            in="blur"
                            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -5"
                        />
                    </filter>
                </svg>
                <div
                    ref={ref}
                >
                    {trail.map((props, index) => (
                        <animated.div
                            key={index}
                            style={{
                                transform: props.xy.to(trans),
                                width: isOverElement
                                    ? `${index === 0 ? smallSize : smallSize * 0.7}px`
                                    : `${index === 0 ? normalSize : normalSize * 0.7}px`,
                                height: isOverElement
                                    ? `${index === 0 ? smallSize : smallSize * 0.7}px`
                                    : `${index === 0 ? normalSize : normalSize * 0.7}px`,
                                willChange: "transform, width, height, opacity",
                                backgroundColor: fillColor,
                                opacity: isOverElement ? 0.5 : 0.9,
                                transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
                                filter: `drop-shadow(0px 0px 6px ${fillColor})`,
                                borderRadius: "0px", 
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}