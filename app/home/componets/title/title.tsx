"use client";

import { useEffect, useState } from "react";
import "./title.css";

interface TitleProps {
    setTriggerStart?: (value: boolean) => void;
}

const GlitchText = ({ text, isGlitching }: { text: string; isGlitching: boolean }) => {
    return (
        <span className={`glitch ${isGlitching ? "glitch-active" : ""}`} data-text={text}>
            {text}
        </span>
    );
};

export default function Title({ setTriggerStart }: TitleProps) {
    const segments = [
        "s",
        "egurança",
        " não",
        " traz",
        " estresse,",
        " traz "
    ];

    const words = ["resultado", "excelência", "autoridade", "prestígio"];
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

    const [displayedSegments, setDisplayedSegments] = useState<string[]>(Array(segments.length).fill(""));
    const [glitchIndex, setGlitchIndex] = useState<number | null>(null);
    const [currentWord, setCurrentWord] = useState("");
    const [animationFinished, setAnimationFinished] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const glitchTargets = [2, 3, 4, 5]; 

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
        if (!animationFinished) return;

        let currentCharIndex = 0;

        let randomWord = words[currentWordIndex]
            .split("")
            .map(() => charset[Math.floor(Math.random() * charset.length)])
            .join("");

        setCurrentWord(randomWord);

        const animateWord = () => {
            const realWord = words[currentWordIndex];
            if (currentCharIndex > realWord.length) {
                return;
            }

            const revealed = realWord
                .split("")
                .map((char, idx) =>
                    idx < currentCharIndex
                        ? char
                        : charset[Math.floor(Math.random() * charset.length)]
                )
                .join("");

            setCurrentWord(revealed);

            currentCharIndex++;
            setTimeout(animateWord, 30);
        };

        animateWord();
    }, [animationFinished, currentWordIndex]);

    useEffect(() => {
        if (!animationFinished) return;

        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [animationFinished]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    useEffect(() => {
        if (!animationFinished) return;

        const glitchEffect = () => {
            const randomIndex = glitchTargets[Math.floor(Math.random() * glitchTargets.length)];
            setGlitchIndex(randomIndex);

            setTimeout(() => {
                setGlitchIndex(null);
            }, Math.random() * 400 + 200);
        };

        const glitchInterval = setInterval(glitchEffect, Math.random() * 2000 + 1000);

        return () => clearInterval(glitchInterval);
    }, [animationFinished]);

    return (
        <h1 id="title">
            <span className="span-box">
                <span id="first-letter">{displayedSegments[0]}</span>
                {displayedSegments[1]}
            </span>{" "}
            <GlitchText text={displayedSegments[2]} isGlitching={glitchIndex === 2} />{" "}
            <GlitchText text={displayedSegments[3]} isGlitching={glitchIndex === 3} />
            <br />
            <GlitchText text={displayedSegments[4]} isGlitching={glitchIndex === 4} />
            <br />
            <span id="span-margin">
                <GlitchText text={displayedSegments[5]} isGlitching={glitchIndex === 5} />{" "}
                <span className="span-box">{currentWord}</span>
                {showCursor && <span className="blinking-cursor">|</span>}
            </span>
        </h1>
    );
}
