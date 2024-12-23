import DragToSelect from "@/app/components/drag-to-select";

export default function HomePage() {
  return (
    <div
      className={"w-screen h-screen flex flex-col items-center justify-center"}
    >
      <div>Yon2Meet V2</div>
      <DragToSelect
        startDate={new Date(2024, 11, 15)}
        endDate={new Date(2024, 11, 16)}
      />
    </div>
  );
}
