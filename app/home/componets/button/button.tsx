import React from "react";
import "./button.css";

interface ButtonProps {
    text: string;
    href?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    text,
    href = "#",
    className = "",
}) => {
    return (
        <button className={`ui-btn ${className}`}>
            <span className="btn-text-light">
               {text}
            </span>
        </button>
    );
};

export default Button;
