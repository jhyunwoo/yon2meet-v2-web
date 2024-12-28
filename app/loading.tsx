import LoadingSpinner from "@/app/components/loading-spinner"
import * as motion from "motion/react-client"

export default function Loading() {
  return (
    <motion.div
      className={
        "fixed top-0 left-0 w-screen h-screen z-10 bg-neutral-200/30 flex items-center justify-center"
      }
    >
      <LoadingSpinner />
    </motion.div>
  )
}
