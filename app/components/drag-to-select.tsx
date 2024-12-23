"use client";

import React, { useState, useRef } from "react";
import useDragToSelect from "@/lib/use-drag-to-select";
import { addDays, addHours, addMinutes } from "date-fns";
import getKorDay from "@/lib/get-kor-day";
import fixStringLength from "@/lib/fix-string-length";

const timeList = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

const NUM_ROWS = timeList.length;
const NUM_COLS = 7;

export default function DragToSelect({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  // State to store selected box indices
  const [selectedBoxes, setSelectedBoxes] = useState<Set<number>>(new Set());
  const dayList: { date: Date; isAvailable: boolean }[] = [];

  for (let i = 0; i < startDate.getDay(); i++) {
    dayList.push({ date: addDays(startDate, i), isAvailable: false });
  }

  for (let i = 0; i <= endDate.getDay(); i++) {
    dayList.push({ date: addDays(startDate, i), isAvailable: true });
  }

  for (let i = 0; i < 6 - endDate.getDay(); i++) {
    dayList.push({ date: addDays(endDate, i + 1), isAvailable: false });
  }

  const dateList: Date[] = [];

  for (let i = 0; i < timeList.length; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      const hours = Number(timeList[i].split(":")[0]);
      const minutes = Number(timeList[i].split(":")[1]);
      dateList.push(addMinutes(addHours(dayList[j].date, hours), minutes));
    }
  }

  // Reference to the grid container
  const gridRef = useRef<HTMLDivElement>(null);

  useDragToSelect({
    selected: selectedBoxes,
    setSelected: setSelectedBoxes,
    gridRef,
    NUM_COLS,
    NUM_ROWS,
  });

  // Render all boxes in the grid
  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < NUM_ROWS * NUM_COLS; i++) {
      boxes.push(
        <div
          key={i}
          className={`w-full h-full border text-xs transition-all flex justify-end ${
            selectedBoxes.has(i) ? "bg-green-500 text-white" : "bg-white"
          }`}
        >
          {fixStringLength(String(dateList[i].getHours()), 2, "0")}:
          {fixStringLength(String(dateList[i].getMinutes()), 2, "0")}
        </div>,
      );
    }
    return boxes;
  };

  return (
    <div className={`grid grid-cols-7 h-full w-full`} ref={gridRef}>
      {dayList.map((day, i) => (
        <div key={i} className={"text-center"}>
          {getKorDay(day.date.getDay())}
        </div>
      ))}
      {renderBoxes()}
    </div>
  );
}
