// useHorizontalScroll.ts
import { useRef, useEffect } from 'react';

export function useHorizontalScroll() {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY === 0) return;

                // Check if the element is scrolled to the left or right boundary
                const isAtLeftEdge = el.scrollLeft === 0;
                const isAtRightEdge = Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) < 1;

                // If at either edge, don't prevent default - let the page scroll naturally
                if ((isAtLeftEdge && e.deltaY < 0) || (isAtRightEdge && e.deltaY > 0)) {
                    return;
                }

                // Otherwise, handle the horizontal scroll
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: 'smooth'
                });
            };

            el.addEventListener('wheel', onWheel);
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);

    return elRef;
}