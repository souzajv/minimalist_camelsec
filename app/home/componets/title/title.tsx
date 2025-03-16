"use client";

import { useEffect, useState } from "react";
import "./title.css";

interface TitleProps {
    setTriggerStart?: (value: boolean) => void;
}

export default function Title({ setTriggerStart }: TitleProps) {
    const segments = [
        "s",
        "egurança não traz estresse",
        ",",
        "traz ",
        "resultado",
    ];
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    const [displayedSegments, setDisplayedSegments] = useState<string[]>(
        Array(segments.length).fill("")
    );
    const [animationFinished, setAnimationFinished] = useState(false);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const getRandomStrings = () =>
            segments.map((seg) =>
                seg
                    .split("")
                    .map(() => charset[Math.floor(Math.random() * charset.length)])
                    .join("")
            );

        let currentTexts = getRandomStrings();
        setDisplayedSegments(currentTexts);

        let currentSegmentIndex = 0;
        let currentCharIndex = 0;

        const animateSegment = () => {
            if (currentSegmentIndex >= segments.length) {
                setAnimationFinished(true);
                if (setTriggerStart) {
                    setTimeout(() => setTriggerStart(true), 500);
                }
                return;
            }
            const segmentReal = segments[currentSegmentIndex];
            const revealed = segmentReal
                .split("")
                .map((char, idx) =>
                    idx < currentCharIndex
                        ? char
                        : charset[Math.floor(Math.random() * charset.length)]
                )
                .join("");

            currentTexts[currentSegmentIndex] = revealed;
            setDisplayedSegments([...currentTexts]);

            if (currentCharIndex >= segmentReal.length) {
                currentSegmentIndex++;
                currentCharIndex = 0;
                setTimeout(animateSegment, 30);
            } else {
                currentCharIndex++;
                setTimeout(animateSegment, 30);
            }
        };

        animateSegment();
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <h1 id="title">
            <span>{displayedSegments[0]}</span>
            {displayedSegments[1]}
            <span id="span-penultimo">{displayedSegments[2]}</span>
            <br />
            {displayedSegments[3]}
            <span id="span-final">{displayedSegments[4]}</span>
            {showCursor && <span className="blinking-cursor">|</span>}
        </h1>
    );
}
