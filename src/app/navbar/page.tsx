import Link from "next/link";
import "./styles1.css";
import { ModeToggle } from "@/components/themer";
export default function Navbar() {
  return (
    <div className="sticky top-0 navheader z-50 backdrop-blur-md flex flex-col font-bold">
      <header className="text-white-600 border-gray-200">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-xl ">
            <Link href="/">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/sharetext">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Share Text
              </span>
            </Link>
            <Link href="/shorturl">
              <span className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer">
                Short Url
              </span>
            </Link>
            <div className="mr-5 dark:text-white hover:text-gray-500 cursor-pointer z-auto ">
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}