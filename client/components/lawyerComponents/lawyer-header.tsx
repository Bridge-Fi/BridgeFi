"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Menu, Calendar, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LawyerApi } from "@/app/api/LawyerApi";

interface Props {
  lawyer: any;
  pendingCount: number;
}

export function LawyerHeader({ lawyer, pendingCount }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    await LawyerApi.logout();
    localStorage.removeItem("currentLawyer");
    router.push("/");
  };

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/lawyer-dashboard" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-bold">
            BF
          </div>
          <div>
            <div className="text-lg font-bold">BridgeFi</div>
            <div className="text-xs text-gray-500">Lawyer Portal</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/lawyer-dashboard" className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </Button>
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {pendingCount}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>{lawyer.fullName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/lawyer-dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="mt-8 space-y-4">
              <div>
                <div className="font-medium">{lawyer.fullName}</div>
                <div className="text-sm text-gray-500">{lawyer.email}</div>
              </div>
              <Link href="/lawyer-dashboard" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Appointments
                </Button>
              </Link>
              <Button variant="outline" className="w-full" onClick={onLogout}>
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
