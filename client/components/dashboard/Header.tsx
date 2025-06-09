// components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { UserAPI } from "@/app/api/UserAPI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface User {
  id: number;
  email: string;
  role: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const pathName = usePathname() || "";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await UserAPI.getLoggedUser();
        if (!(user instanceof Error)) setLoggedUser(user);
      } catch {
        setLoggedUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [pathName]);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await UserAPI.logout();
      setLoggedUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
      setDialogOpen(false);
    }
  };

  if (
    pathName.includes("/sign-up") ||
    pathName.includes("/login") ||
    pathName.includes("/lawyer-login") ||
    pathName.includes("/admin")
  )
    return null;

  return (
    <header className="bg-white shadow-sm px-36 py-6 drop-shadow-sm">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          BridgeFi
        </Link>

        <nav className="hidden md:flex space-x-6 text-gray-700 items-center">
          {!loggedUser ? (
            <>
              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>
              <Link href="/services" className="hover:text-blue-600">
                Services
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </>
          ) : loggedUser.role === "user" ? (
            <>
              <Link href="/lawyer" className="hover:text-blue-600">
                Lawyers
              </Link>
              <Link href="/user/appointments" className="hover:text-blue-600">
                My Appointments
              </Link>
              <Link href="/employer-hub" className="hover:text-blue-600">
                Employer Hub
              </Link>
              <Link href="/financial-resources" className="hover:text-blue-600">
                Financial Resources
              </Link>
              <Link href="/profile" className="hover:text-blue-600">
                Profile
              </Link>
            </>
          ) : loggedUser.role === "lawyer" ? (
            <>
              <Link href="/lawyer/appointments" className="hover:text-blue-600">
                Appointments
              </Link>
              <Link href="/lawyer/clients" className="hover:text-blue-600">
                Clients
              </Link>
            </>
          ) : null}

          {!loading &&
            (loggedUser ? (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive">Logout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-black">
                      Confirm Logout
                    </DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="secondary"
                      onClick={() => setDialogOpen(false)}
                      disabled={logoutLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging Out...
                        </>
                      ) : (
                        "Log Out"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Sign Up
                </Link>
              </>
            ))}
        </nav>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col space-y-4 text-gray-700">
          {!loggedUser ? (
            <>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                About
              </Link>
              <Link
                href="/services"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Services
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Contact
              </Link>
            </>
          ) : loggedUser.role === "user" ? (
            <>
              <Link
                href="/lawyers"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Lawyers
              </Link>
              <Link
                href="/employer-hub"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Employer Hub
              </Link>
              <Link
                href="/financial-resources"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Financial Resources
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Profile
              </Link>
            </>
          ) : loggedUser.role === "lawyer" ? (
            <>
              <Link
                href="/lawyer/appointments"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Appointments
              </Link>
              <Link
                href="/lawyer/clients"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Clients
              </Link>
            </>
          ) : null}

          {loggedUser && (
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="mt-4"
            >
              Logout
            </Button>
          )}
        </nav>
      )}
    </header>
  );
}
