import {
  Dispatch,
  SetStateAction,
  useCallback,
  RefObject,
  useEffect,
  useRef,
} from "react";

export default function useDragToSelect({
  selected,
  setSelected,
  gridRef,
  NUM_COLS,
  NUM_ROWS,
}: {
  selected: Set<number>;
  setSelected: Dispatch<SetStateAction<Set<number>>>;
  gridRef: RefObject<HTMLDivElement | null>;
  NUM_COLS: number;
  NUM_ROWS: number;
}) {
  const dragMode = useRef<"select" | "deselect">("select");
  const isDragging = useRef<boolean>(false);

  // Handler to start dragging
  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      isDragging.current = true;

      const touch = e.touches[0];
      const boxIndex = getBoxIndex(touch.clientX, touch.clientY);

      if (boxIndex !== null) {
        // Determine drag mode based on initial box state
        if (selected.has(boxIndex)) {
          dragMode.current = "deselect";
          removeBox(boxIndex);
        } else {
          dragMode.current = "select";
          addBox(boxIndex);
        }
      }
    },
    [selected],
  );

  // Handler for dragging over boxes
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    const boxIndex = getBoxIndex(touch.clientX, touch.clientY);

    if (boxIndex !== null) {
      if (dragMode.current === "select") {
        addBox(boxIndex);
      } else if (dragMode.current === "deselect") {
        removeBox(boxIndex);
      }
    }
  }, []);

  // Handler to end dragging
  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Calculate box index based on touch coordinates
  const getBoxIndex = (clientX: number, clientY: number): number | null => {
    const grid = gridRef.current;
    if (!grid) return null;

    const rect = grid.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const boxWidth = rect.width / NUM_COLS;
    const boxHeight = rect.height / NUM_ROWS;

    const col = Math.floor(x / boxWidth);
    const row = Math.floor(y / boxHeight);

    if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
      return row * NUM_COLS + col;
    }
    return null;
  };

  // Add a box to the selection
  const addBox = (index: number) => {
    setSelected((prev) => {
      if (prev.has(index)) {
        return prev;
      }
      const newSelected = new Set(prev);
      newSelected.add(index);
      return newSelected;
    });
  };

  // Remove a box from the selection
  const removeBox = (index: number) => {
    setSelected((prev) => {
      if (!prev.has(index)) {
        return prev;
      }
      const newSelected = new Set(prev);
      newSelected.delete(index);
      return newSelected;
    });
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Add event listeners for touch interactions
    grid.addEventListener("touchstart", handleTouchStart, { passive: false });
    grid.addEventListener("touchmove", handleTouchMove, { passive: false });
    grid.addEventListener("touchend", handleTouchEnd);
    grid.addEventListener("touchcancel", handleTouchEnd);

    // Cleanup event listeners on unmount
    return () => {
      grid.removeEventListener("touchstart", handleTouchStart);
      grid.removeEventListener("touchmove", handleTouchMove);
      grid.removeEventListener("touchend", handleTouchEnd);
      grid.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
}
