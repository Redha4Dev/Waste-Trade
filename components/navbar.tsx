import Link from "next/link";

import { Button } from "./ui/button";
import NavItems from "./navItems";
import { user } from "@/lib/user";
import Logout from "./Logout";

const Navbar = async () => {

  const currentUser = await user();

  return (
    <div className="w-full px-24 py-4 bg-background flex items-center mx-auto max-sm:px-4">
      <h1 className="text-3xl text-green-600 text-semibold bricolage-grotesque max-sm:hidden">
        LOGO
      </h1>
      <NavItems />
      {currentUser ? (
        <Logout />
      ) : (
        <Link href="/sign-in">
          <Button className="max-sm:hidden border-2 border-green-500" variant={'outline'}>Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
