import SellForme from "@/components/SellForme";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = () => {
  return (
    <main className="w-full flex flex-col">
      <h1 className="text-xl font-semibold bricolage-grotesque">
        Create new listing
      </h1>
      <Separator className="my-4 min-w-sm" />
      <article className="min-lg:w-1/3 min-md:w-2/3 justify-center mx-auto gap-4 flex flex-col my-4">
        <SellForme />
      </article>
    </main>
  );
};

export default page;
