import Link from "next/link";
import { Button } from "./ui/button";
import NavItems from "./navItems";
import { user } from "@/lib/user";
import Logout from "./Logout";
import AuthItem from "./AuthItem";
import { Leaf, Menu } from "lucide-react";

const Navbar = async () => {
  const currentUser = await user();

  return (
    // Fixed container spanning full width with a distinct background and shadow.
    <nav className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow-md z-50">
      
      {/* Content wrapper: Max width and centered for consistent desktop layout */}
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo/Brand Section */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl text-green-600 flex items-center font-momo-signature">
            Wasto
            <Leaf className="w-5 h-5 sm:w-6 sm:h-6 ml-1" />
          </h1>
        </Link>
        
        {/* Main Navigation (NavItems) - Hidden on small screens if necessary */}
        <div className="hidden md:flex flex-grow justify-center">
          <NavItems />
        </div>
        
        
        <div className="flex items-center space-x-2">
          <AuthItem />
        </div>
        
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;