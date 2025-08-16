import Link from "next/link";

import { Button } from "./ui/button";
import NavItems from "./navItems";

const Navbar = () => {
  return (
    <div className="w-full px-24 py-4 bg-background flex items-center mx-auto max-sm:px-4">
      <h1 className="text-3xl text-green-600 text-semibold bricolage-grotesque max-sm:hidden">
        LOGO
      </h1>
      <NavItems />
      <Button variant={"outline"} className="border-[2.5px] border-green-500">
        <Link href="/sign-in">Sign-in</Link>
      </Button>
    </div>
  );
};

export default Navbar;
