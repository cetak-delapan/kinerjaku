import Link from "next/link";
import {
  Home,
  ClipboardList,
  PlusCircle,
  FolderOpen,
  Settings
} from "lucide-react";

export default function Navbar() {

  const menus = [
    {
      name: "Home",
      icon: Home,
      link: "/"
    },
    {
      name: "Tugas",
      icon: ClipboardList,
      link: "/tasks"
    },
    {
      name: "Tambah",
      icon: PlusCircle,
      link: "/activities/new"
    },
    {
      name: "Bukti",
      icon: FolderOpen,
      link: "/bukti"
    },
    {
      name: "Setting",
      icon: Settings,
      link: "/settings"
    }
  ];


  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      shadow-lg
      "
    >

      <div
        className="
        mx-auto
        flex
        max-w-xl
        justify-around
        py-3
        "
      >

        {menus.map((menu)=>{

          const Icon = menu.icon;

          return (

            <Link
              key={menu.name}
              href={menu.link}
              className="
              flex
              flex-col
              items-center
              text-xs
              text-gray-600
              "
            >

              <Icon size={22}/>

              <span>
                {menu.name}
              </span>

            </Link>

          )

        })}

      </div>

    </nav>
  );
}