"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  Scale,
  Building2,
  DollarSign,
  Info,
  Briefcase,
  User as UserIcon,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { UserAPI } from "@/app/api/UserAPI";

interface User {
  id: number;
  email: string;
  role: string;
}

export function Header() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // — YOUR AUTH CHECK —
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await UserAPI.getLoggedUser();
        if (!(user instanceof Error)) setLoggedUser(user);
      } catch {
        setLoggedUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname]);

  // — DERIVE AUTH STATE —
  const isAuthenticated = !!loggedUser;

  // — YOUR LOGOUT HANDLER —
  const handleLogout = async () => {
    setLogoutLoading(true);
    await UserAPI.logout();
    setLoggedUser(null);
    window.location.href = "/";
  };

  // don’t show on admin/login/signup pages
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/lawyer-login") ||
    pathname.startsWith("/lawyer-dashboard")
  ) {
    return null;
  }

  // choose nav array
  const publicNav = [
    { name: "Home", href: "/", icon: Info },
    { name: "About Us", href: "/about", icon: Briefcase },
    { name: "Services", href: "/services", icon: Briefcase },
  ];
  const privateNav = [
    { name: "Home", href: "/", icon: undefined },
    { name: "Find Lawyers", href: "/lawyer", icon: Scale },
    { name: "Employer Hub", href: "/employer-hub", icon: Building2 },
    {
      name: "Financial Resources",
      href: "/financial-resources",
      icon: DollarSign,
    },
  ];
  const navigation = isAuthenticated ? privateNav : publicNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-sm font-bold">BF</span>
          </div>
          <span className="text-xl font-bold">BridgeFi</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {!loading && isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm">
                <UserIcon className="h-4 w-4 mr-2" /> Profile
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(true)}
              >
                Sign Out
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild />
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>Are you sure?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="secondary"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      disabled={logoutLoading}
                    >
                      {logoutLoading ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        "Log Out"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : !loading && !isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (window.location.href = "/login")}
              >
                <UserIcon className="h-4 w-4 mr-2" /> Sign In
              </Button>
              <Button
                size="sm"
                onClick={() => (window.location.href = "/sign-up")}
              >
                Get Started
              </Button>
            </>
          ) : null}
        </div>

        {/* Mobile Nav Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 text-lg font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile auth buttons */}
              <div className="pt-4 space-y-2">
                {!loading && isAuthenticated ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => setDialogOpen(true)}
                    >
                      <UserIcon className="h-4 w-4 mr-2" /> Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  !loading && (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => (window.location.href = "/login")}
                      >
                        <UserIcon className="h-4 w-4 mr-2" /> Sign In
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => (window.location.href = "/sign-up")}
                      >
                        Get Started
                      </Button>
                    </>
                  )
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
