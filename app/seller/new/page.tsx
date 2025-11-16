import SellForme from "@/components/SellForme";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ListPlus } from 'lucide-react'; // Icon for visual clarity

const CreateListingPage = () => {
  return (
    // Centered content container with appropriate padding
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8"> 
      
      {/* Header with Icon */}
      <header className="flex items-center gap-3 mb-6">
        <ListPlus className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Create New Listing
        </h1>
      </header>

      <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />
      
      {/* Form Container */}
      <main className="mt-8 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
        <SellForme />
      </main>
    </div>
  );
};

export default CreateListingPage;