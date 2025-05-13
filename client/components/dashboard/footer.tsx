"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  if (
    !pathName.includes("/sign-up") &&
    !pathName.includes("/login") &&
    !pathName.includes("/admin") &&
    !pathName.includes("/lawyer-login")
  ) {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-4">BridgeFi</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:underline">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Product</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-4">Support</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700">
          <div className="max-w-6xl mx-auto py-6 px-6 text-center text-sm text-gray-400">
            © 2025 BridgeFi. All rights reserved.
          </div>
        </div>
      </footer>
    );
  } else {
    return null;
  }
}
