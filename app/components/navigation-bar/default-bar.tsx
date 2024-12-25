import NavigationButton from "@/app/components/navigation-bar/navigation-button"
import { usePathname } from "next/navigation"
import {
  ListBulletIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"

export default function DefaultBar() {
  const path = usePathname()

  return (
    <div
      className={
        "bg-neutral-50 rounded-2xl shadow-2xl p-3 flex justify-around items-center gap-2"
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
    </div>
  )
}
