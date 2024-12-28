import LoadingSpinner from "@/app/components/loading-spinner"

export default function Loading() {
  return (
    <div
      className={
        "fixed top-0 left-0 w-screen h-screen z-10 bg-neutral-500/30 flex items-center justify-center"
      }
    >
      <LoadingSpinner />
    </div>
  )
}
