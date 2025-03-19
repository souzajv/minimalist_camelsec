"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "../button/InteractiveHoverButton";
import "./header.css"; 

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className={`header-container ${className}`}
        >
            <div className="header-left">
                <div className="header-logo-group">
                    <img
                        src="images/logo.svg"
                        alt="logo da CamelSec"
                        className="header-logo-size"
                    />
                    <span className="header-brand-text">
                        camel
                        <span className="highlight-neon">sec</span>
                    </span>
                </div>
            </div>

            <nav className="header-nav">
                <Link href="#" className="ui-nav nav-link">
                    <span>vantagens</span>
                </Link>
                <Link href="#" className="ui-nav nav-link">
                    <span>pilares</span>
                </Link>
                <Link href="#" className="ui-nav nav-link">
                    <span>funcionalidades</span>
                </Link>
                <Link href="#" className="ui-nav nav-link">
                    <span>números</span>
                </Link>
                <Link href="#" className="ui-nav nav-link">
                    <span>módulos</span>
                </Link>
                <Link href="#" className="ui-nav nav-link">
                    <span>porque-nós</span>
                </Link>
            </nav>

            <Link id="button" href="/login">
                <InteractiveHoverButton>
                    login camel<span id="team">team</span>
                </InteractiveHoverButton>
            </Link>
        </motion.header>
    );
};

export default Header;
