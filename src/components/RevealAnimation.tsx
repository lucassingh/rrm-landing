import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

export const RevealFromLeft = ({ children }: { children: ReactNode }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const onScreen = useInView(ref, { margin: "0px 0px -100px 0px" });

    useEffect(() => {
        if (onScreen) {
            controls.start({
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            });
        } else {
            controls.start({
                opacity: 0,
                x: -100,
                transition: { duration: 0.3 }
            });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -100 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};

export const RevealFromRight = ({ children }: { children: ReactNode }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const onScreen = useInView(ref, { margin: "0px 0px -100px 0px" });

    useEffect(() => {
        if (onScreen) {
            controls.start({
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            });
        } else {
            controls.start({
                opacity: 0,
                x: 100,
                transition: { duration: 0.3 }
            });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 100 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};

export const RevealZoom = ({ children }: { children: ReactNode }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const onScreen = useInView(ref, { margin: "0px 0px -150px 0px" });

    useEffect(() => {
        if (onScreen) {
            controls.start({
                opacity: 1,
                scale: 1,
                transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1
                }
            });
        } else {
            controls.start({
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.3 }
            });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};

export const RevealFromBottom = ({ children }: { children: ReactNode }) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const onScreen = useInView(ref, { margin: "0px 0px -100px 0px" });

    useEffect(() => {
        if (onScreen) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            });
        } else {
            controls.start({
                opacity: 0,
                y: 50,
                transition: { duration: 0.3 }
            });
        }
    }, [onScreen, controls]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
        >
            {children}
        </motion.div>
    );
};