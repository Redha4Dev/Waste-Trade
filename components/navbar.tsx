"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import NavItems from "./navItems";
import { Leaf, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl text-green-600 flex items-center font-momo-signature">
            Wasto
            <Leaf className="w-8 h-8" />
          </h1>
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex flex-grow justify-center">
          <NavItems />
        </div>

        {/* AUTH BUTTON AREA */}
        <div className="flex items-center space-x-4">

          {/* While loading */}
          {loading && (
            <Button variant="outline" disabled>
              Loading...
            </Button>
          )}

          {/* Not logged in → Show Login button */}
          {!loading && !user && (
            <Link href="/sign-in">
              <Button variant="outline">Login</Button>
            </Link>
          )}

          {/* Logged in → Show username + logout */}
          {!loading && user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                Hi, {user.username || user.email}
              </span>

              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
