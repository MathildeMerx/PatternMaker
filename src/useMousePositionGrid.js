import { useEffect } from "react";

function useMousePositionGrid(isDragging, onDrag) {
    useEffect(() => {
        const interval = setInterval(() => {
            if (isDragging) {
                onDrag();
            }
        }, 20);

        return () => clearInterval(interval);
    }, [isDragging, onDrag]);
}

export default useMousePositionGrid;
