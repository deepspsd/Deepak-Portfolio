import { useRef, useEffect, FC, ReactNode, useState } from 'react';
import gsap from 'gsap';
import { vec2 } from 'vecteur';

type Vec2 = any;

// Animation constants
const ANIMATION_CONSTANTS = {
    SPEED_MULTIPLIER: 0.04,
    MAX_SCALE_X: 1,
    MAX_SCALE_Y: 0.3,
    ATTACH_DURATION: 0.6,
    DETACH_DURATION: 0.5,
    CURSOR_DEFAULT_SIZE: 24,
};

interface MagneticCursorProps {
    children: ReactNode;
    lerpAmount?: number;
    magneticFactor?: number;
    hoverPadding?: number;
    hoverAttribute?: string;
    cursorSize?: number;
    cursorColor?: string;
    blendMode?: string;
    cursorClassName?: string;
    shape?: 'circle' | 'square' | 'rounded-square';
    disableOnTouch?: boolean;
}

interface CursorState {
    el: HTMLDivElement | null;
    pos: {
        current: Vec2;
        target: Vec2;
        previous: Vec2;
    };
    hover: {
        isHovered: boolean;
        currentMagneticElement: HTMLElement | null;
    };
}

export const MagneticCursor: FC<MagneticCursorProps> = ({
    children,
    lerpAmount = 0.1,
    magneticFactor = 0.2,
    hoverPadding = 8,
    hoverAttribute = 'data-magnetic',
    cursorSize = ANIMATION_CONSTANTS.CURSOR_DEFAULT_SIZE,
    cursorColor = 'white',
    blendMode = 'difference',
    cursorClassName = '',
    shape = 'circle',
    disableOnTouch = true,
}) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorStateRef = useRef<CursorState | null>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Check for touch device
    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();
    }, []);

    // Early return if touch device
    if (disableOnTouch && isTouchDevice) {
        return <>{children}</>;
    }

    useEffect(() => {
        const cursorEl = cursorRef.current;
        if (!cursorEl) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const effectiveLerpAmount = prefersReducedMotion ? 1 : lerpAmount;
        const animationDuration = prefersReducedMotion ? 0.1 : 0.4;
        const detachDuration = prefersReducedMotion ? 0.1 : 0.4;

        if (!cursorStateRef.current) {
            cursorStateRef.current = {
                el: cursorEl,
                pos: {
                    current: vec2(-100, -100),
                    target: vec2(-100, -100),
                    previous: vec2(-100, -100),
                },
                hover: { isHovered: false, currentMagneticElement: null },
            };
        }

        const state = cursorStateRef.current!;

        const update = () => {
            if (!state.hover.isHovered) {
                state.pos.current.lerp(state.pos.target, effectiveLerpAmount);
                const delta = state.pos.current.clone().sub(state.pos.previous);
                state.pos.previous.copy(state.pos.current);

                const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y) * ANIMATION_CONSTANTS.SPEED_MULTIPLIER;

                gsap.set(state.el, {
                    x: state.pos.current.x,
                    y: state.pos.current.y,
                    rotate: Math.atan2(delta.y, delta.x) * (180 / Math.PI),
                    scaleX: 1 + Math.min(speed, ANIMATION_CONSTANTS.MAX_SCALE_X),
                    scaleY: 1 - Math.min(speed, ANIMATION_CONSTANTS.MAX_SCALE_Y),
                });
            }
        };

        const onMouseMove = (event: PointerEvent) => {
            // Check visibility
            const isInViewport =
                event.clientX >= 0 &&
                event.clientX <= window.innerWidth &&
                event.clientY >= 0 &&
                event.clientY <= window.innerHeight;

            if (isInViewport) {
                state.pos.target.x = event.clientX - cursorSize / 2;
                state.pos.target.y = event.clientY - cursorSize / 2;
                gsap.to(cursorEl, { opacity: 1, duration: 0.2 });
            } else {
                gsap.to(cursorEl, { opacity: 0, duration: 0.2 });
            }

            // Check for magnetic elements dynamically
            const target = event.target as HTMLElement;
            const magneticElement = target.closest(`[${hoverAttribute}]`) as HTMLElement;

            if (magneticElement) {
                if (state.hover.currentMagneticElement !== magneticElement) {
                    // Start hovering new element
                    state.hover.isHovered = true;
                    state.hover.currentMagneticElement = magneticElement;

                    const bounds = magneticElement.getBoundingClientRect();
                    const computedStyle = window.getComputedStyle(magneticElement);
                    const magneticColor = magneticElement.getAttribute('data-magnetic-color') || cursorColor;
                    const customPadding = magneticElement.getAttribute('data-magnetic-padding');
                    const effectivePadding = customPadding ? parseInt(customPadding) : hoverPadding;

                    gsap.killTweensOf(cursorEl);
                    gsap.to(cursorEl, {
                        x: bounds.left - effectivePadding,
                        y: bounds.top - effectivePadding,
                        width: bounds.width + effectivePadding * 2,
                        height: bounds.height + effectivePadding * 2,
                        borderRadius: computedStyle.borderRadius,
                        backgroundColor: magneticColor,
                        scaleX: 1,
                        scaleY: 1,
                        rotate: 0,
                        duration: animationDuration,
                        ease: 'power3.out',
                    });
                }

                // Animate element magnetic pull
                const { left, top, width, height } = magneticElement.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;

                const x = (event.clientX - centerX) * magneticFactor;
                const y = (event.clientY - centerY) * magneticFactor;

                gsap.to(magneticElement, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: 'elastic.out(1, 0.3)',
                    overwrite: "auto"
                });

            } else {
                // Not hovering a magnetic element
                if (state.hover.isHovered) {

                    // Reset the previous magnetic element position
                    if (state.hover.currentMagneticElement) {
                        gsap.to(state.hover.currentMagneticElement, {
                            x: 0,
                            y: 0,
                            duration: 1,
                            ease: 'elastic.out(1, 0.3)',
                        });
                    }

                    // Sync state position with current visual position to prevent jumping
                    const currentX = gsap.getProperty(cursorEl, "x") as number;
                    const currentY = gsap.getProperty(cursorEl, "y") as number;
                    state.pos.current.x = currentX;
                    state.pos.current.y = currentY;
                    state.pos.previous.x = currentX;
                    state.pos.previous.y = currentY;

                    state.hover.isHovered = false;
                    state.hover.currentMagneticElement = null;

                    const shapeBorderRadius =
                        shape === 'circle' ? '50%' : shape === 'square' ? '0' : '8px';

                    gsap.killTweensOf(cursorEl);
                    gsap.to(cursorEl, {
                        width: cursorSize,
                        height: cursorSize,
                        borderRadius: shapeBorderRadius,
                        backgroundColor: cursorColor,
                        duration: detachDuration,
                        ease: 'power3.out',
                    });
                }
            }


            // Text selection feedback
            const isTextContent =
                target.tagName === 'P' ||
                target.tagName === 'SPAN' ||
                target.tagName === 'H1' ||
                target.tagName === 'H2' ||
                target.tagName === 'H3' ||
                target.tagName === 'H4' ||
                target.tagName === 'H5' ||
                target.tagName === 'H6' ||
                window.getComputedStyle(target).cursor === 'text';

            if (isTextContent && !state.hover.isHovered) {
                gsap.to(cursorEl, {
                    scaleX: 0.5,
                    scaleY: 1.5,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeaveWindow = () => {
            gsap.to(cursorEl, { opacity: 0, duration: 0.3 });
        };

        const handleMouseEnterWindow = () => {
            gsap.to(cursorEl, { opacity: 1, duration: 0.3 });
        };

        // Particle effect on click
        const createParticles = (x: number, y: number) => {
            const particleCount = 8;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'cursor-particle';
                particle.style.cssText = `
          position: fixed;
          width: 4px;
          height: 4px;
          background: ${cursorColor};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
        `;
                document.body.appendChild(particle);

                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 50 + Math.random() * 50;

                gsap.fromTo(
                    particle,
                    { x, y, opacity: 1 },
                    {
                        x: x + Math.cos(angle) * velocity,
                        y: y + Math.sin(angle) * velocity,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        onComplete: () => particle.remove(),
                    }
                );
            }
        };

        const handleClick = (event: MouseEvent) => {
            createParticles(event.clientX, event.clientY);
        };

        gsap.ticker.add(update);
        window.addEventListener('pointermove', onMouseMove);
        document.addEventListener('mouseleave', handleMouseLeaveWindow);
        document.addEventListener('mouseenter', handleMouseEnterWindow);
        window.addEventListener('click', handleClick);

        return () => {
            gsap.ticker.remove(update);
            window.removeEventListener('pointermove', onMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeaveWindow);
            document.removeEventListener('mouseenter', handleMouseEnterWindow);
            window.removeEventListener('click', handleClick);
        }

    }, [lerpAmount, magneticFactor, hoverPadding, hoverAttribute, cursorSize, cursorColor, shape]);

    return (
        <>
            <div
                ref={cursorRef}
                className={`magnetic-cursor ${cursorClassName}`}
                style={{
                    backgroundColor: cursorColor,
                    mixBlendMode: blendMode as any,
                    width: cursorSize,
                    height: cursorSize,
                }}
            />
            {children}
        </>
    );
};
