"use client"
import { useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathName = usePathname()
    if (!(pathName.includes("/sign-up")) && !(pathName.includes("/login")))
  return (
    <header className="bg-white shadow-sm px-36 py-6 drop-shadow-sm">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BridgeFi
        </Link>
        <nav className="hidden md:flex space-x-6 text-gray-700 items-center">
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/services" className="hover:text-blue-600">
            Services
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
          <Link href="/login" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800" onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
        </nav>
        <div className="md:hidden">
          {menuOpen ? (
            <HiOutlineX
              onClick={() => setMenuOpen(false)}
              className="w-6 h-6 text-gray-700 cursor-pointer"
            />
          ) : (
            <HiOutlineMenu
              onClick={() => setMenuOpen(true)}
              className="w-6 h-6 text-gray-700 cursor-pointer"
            />
          )}
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4 text-gray-700">
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
            About
          </Link>
          <Link href="/services" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
            Services
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-600">
            Contact
          </Link>
          <Link href="/login" onClick={() => setMenuOpen(false)} className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800"  onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
}
