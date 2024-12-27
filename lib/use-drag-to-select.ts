import { Dispatch, SetStateAction, RefObject, useEffect, useRef } from "react"

export default function useDragToSelect({
  never,
  setNever,
  modifiable,
  setModifiable,
  gridRef,
  NUM_COLS,
  NUM_ROWS,
  dateList,
}: {
  never: Set<string>
  setNever: Dispatch<SetStateAction<Set<string>>>
  modifiable: Set<string>
  setModifiable: Dispatch<SetStateAction<Set<string>>>
  gridRef: RefObject<HTMLDivElement | null>
  NUM_COLS: number
  NUM_ROWS: number
  dateList: Date[]
}) {
  const dragMode = useRef<"never" | "modifiable" | "remove">("never")
  const isDragging = useRef<boolean>(false)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    // Handler to start dragging
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      isDragging.current = true

      const touch = e.touches[0]
      const boxIndex = getBoxIndex(touch.clientX, touch.clientY)

      if (boxIndex !== null) {
        // Determine drag mode based on initial box state
        if (never.has(dateList[boxIndex].toJSON())) {
          dragMode.current = "modifiable"
          addModifiable(boxIndex)
        } else if (modifiable.has(dateList[boxIndex].toJSON())) {
          dragMode.current = "remove"
          removeModifiable(boxIndex)
        } else {
          dragMode.current = "never"
          addNever(boxIndex)
        }
      }
    }
    // Handler for dragging over boxes
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      const touch = e.touches[0]
      const boxIndex = getBoxIndex(touch.clientX, touch.clientY)

      if (boxIndex !== null) {
        if (dragMode.current === "never") {
          addNever(boxIndex)
        } else if (dragMode.current === "remove") {
          removeModifiable(boxIndex)
        } else if (dragMode.current === "modifiable") {
          addModifiable(boxIndex)
        }
      }
    }

    // Handler to end dragging
    const handleTouchEnd = () => {
      isDragging.current = false
    }

    // Calculate box index based on touch coordinates
    const getBoxIndex = (clientX: number, clientY: number): number | null => {
      const grid = gridRef.current
      if (!grid) return null

      const rect = grid.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      const boxWidth = rect.width / NUM_COLS
      const boxHeight = rect.height / NUM_ROWS

      const col = Math.floor(x / boxWidth)
      const row = Math.floor(y / boxHeight)

      if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
        return row * NUM_COLS + col
      }
      return null
    }

    // Add a box to the selection
    const addNever = (index: number) => {
      setNever((prev) => {
        if (prev.has(dateList[index].toJSON())) {
          return prev
        }
        const newSelected = new Set(prev)
        newSelected.add(dateList[index].toJSON())
        return newSelected
      })
    }

    const addModifiable = (index: number) => {
      setNever((prev) => {
        if (!prev.has(dateList[index].toJSON())) {
          return prev
        }
        const newSelected = new Set(prev)
        newSelected.delete(dateList[index].toJSON())
        return newSelected
      })
      setModifiable((prev) => {
        if (prev.has(dateList[index].toJSON())) {
          return prev
        }
        const newSelected = new Set(prev)
        newSelected.add(dateList[index].toJSON())
        return newSelected
      })
    }

    // Remove a box from the selection
    const removeModifiable = (index: number) => {
      setModifiable((prev) => {
        if (!prev.has(dateList[index].toJSON())) {
          return prev
        }
        const newSelected = new Set(prev)
        newSelected.delete(dateList[index].toJSON())
        return newSelected
      })
    }

    // Add event listeners for touch interactions
    grid.addEventListener("touchstart", handleTouchStart, { passive: false })
    grid.addEventListener("touchmove", handleTouchMove, { passive: false })
    grid.addEventListener("touchend", handleTouchEnd)
    grid.addEventListener("touchcancel", handleTouchEnd)

    // Cleanup event listeners on unmount
    return () => {
      grid.removeEventListener("touchstart", handleTouchStart)
      grid.removeEventListener("touchmove", handleTouchMove)
      grid.removeEventListener("touchend", handleTouchEnd)
      grid.removeEventListener("touchcancel", handleTouchEnd)
    }
  }, [
    gridRef,
    never,
    dateList,
    modifiable,
    NUM_COLS,
    NUM_ROWS,
    setNever,
    setModifiable,
  ])
}
