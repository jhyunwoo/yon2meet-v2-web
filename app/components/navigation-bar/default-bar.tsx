import NavigationButton from "@/app/components/navigation-bar/navigation-button";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  ListBulletIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function DefaultBar() {
  const path = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={
        "bg-neutral-50 backdrop-blur-sm rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
      }
    >
      <NavigationButton href={"/"} path={path}>
        <SquaresPlusIcon className={"size-7"} />
      </NavigationButton>
      <NavigationButton href={"/meetings"} path={path}>
        <ListBulletIcon className={"size-7"} />
      </NavigationButton>
      <NavigationButton href={"/profile"} path={path}>
        <UserCircleIcon className={"size-7"} />
      </NavigationButton>
    </motion.div>
  );
}
