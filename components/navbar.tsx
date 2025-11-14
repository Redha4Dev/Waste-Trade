import Link from "next/link";

import { Button } from "./ui/button";
import NavItems from "./navItems";
import { user } from "@/lib/user";
import Logout from "./Logout";
import AuthItem from "./AuthItem";
import { Leaf } from "lucide-react";

const Navbar = async () => {

  const currentUser = await user();

  return (
    <div className="w-full px-24 py-4 bg-background flex items-center mx-auto max-sm:px-4">
      <h1 className="text-3xl text-green-600 flex text-semibold bricolage-grotesque max-sm:hidden">
        <Leaf className="w-8 h-8" /> LOGO
      </h1>
      <NavItems />
      <AuthItem />
    </div>
  );
};

export default Navbar;
