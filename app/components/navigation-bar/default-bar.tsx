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
    <div className={"bar-layout"}>
      <NavigationButton href={"/"} path={path}>
        <SquaresPlusIcon className={"size-7"} />
        <p className={"text-xs"}>새로운 미팅</p>
      </NavigationButton>
      <NavigationButton href={"/meetings"} path={path}>
        <ListBulletIcon className={"size-7"} />
        <p className={"text-xs"}>미팅 기록</p>
      </NavigationButton>
      <NavigationButton href={"/profile"} path={path}>
        <UserCircleIcon className={"size-7"} />
        <p className={"text-xs"}>프로필</p>
      </NavigationButton>
    </div>
  )
}
