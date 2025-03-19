import React from "react";
import { ArrowRight } from "lucide-react";
import "./InteractiveHoverButton.css"; 

interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
    return (
        <button ref={ref} className={`interactive-button ${className}`} {...props}>
            <div className="button-content">
                <div className="dot"></div>
                <span className="button-text">{children}</span>
            </div>
            <div className="hover-content">
                <span>{children}</span>
                <ArrowRight strokeWidth={1} />
            </div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
