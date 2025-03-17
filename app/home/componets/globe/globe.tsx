"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import "./globe.css";

interface GlobeProps {
    className?: string;
}

const Globe: React.FC<GlobeProps> = ({ className = "" }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        containerRef.current.appendChild(renderer.domElement);

        const distance = Math.min(200, width / 4);
        const geometry = new THREE.BufferGeometry();
        const vertices: number[] = [];

        for (let i = 0; i < 1600; i++) {
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const x = distance * Math.sin(theta) * Math.cos(phi);
            const y = distance * Math.sin(theta) * Math.sin(phi);
            const z = distance * Math.cos(theta);
            vertices.push(x, y, z);
        }

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3)
        );
        const particles = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00ffa1,
                size: 2,
            })
        );

        const renderingParent = new THREE.Group();
        renderingParent.add(particles);
        renderingParent.position.set(0, 0, 0);
        scene.add(renderingParent);

        const animProps = { scale: 1.3, xRot: 0, yRot: 0 };
        const mouseRotation = { x: 0, y: 0 };

        gsap.to(animProps, {
            duration: 10,
            scale: 1.4,
            repeat: -1,
            yoyo: true,
            ease: "sine",
            onUpdate: () => {
                renderingParent.scale.set(
                    animProps.scale,
                    animProps.scale,
                    animProps.scale
                );
            },
        });

        gsap.to(animProps, {
            duration: 120,
            xRot: Math.PI * 2,
            yRot: Math.PI * 4,
            repeat: -1,
            ease: "none",
        });

        const onMouseMove = (event: MouseEvent) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            gsap.to(mouseRotation, {
                duration: 0.5,
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                ease: "power1.out",
                overwrite: true,
            });
        };

        const onResize = () => {
            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("resize", onResize);

        const animate = () => {
            requestAnimationFrame(animate);
            renderingParent.rotation.x = animProps.xRot + mouseRotation.x;
            renderingParent.rotation.y = animProps.yRot + mouseRotation.y;
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", onResize);
            if (
                containerRef.current &&
                renderer.domElement.parentElement === containerRef.current
            ) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div id="globe" ref={containerRef} className={className} />;
};

export default Globe;
