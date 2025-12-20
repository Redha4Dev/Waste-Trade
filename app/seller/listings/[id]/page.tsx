// app/seller/listings/[id]/page.tsx
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Edit3 } from "lucide-react";
import EditForme from "@/components/EditForme"; // Ensure this path is correct

// Mock Data Structure (matching formSchema)
const mockListingData = {
  title: "HDPE Containers (Blue Grade)",
  description:
    "High-quality blue HDPE containers, clean and shredded. Ideal for reprocessing into pipes and drums.",
  price: 4000,
  unity: "ton",
  type: "plastic",
  subType: "HDPE",
  status: "available",
  quantity: 120, // 120 tons available
  userId: 1,
};

interface EditListingPageProps {
  params: {
    id: string; // The listing ID from the URL segment
  };
}

const EditListingPage = async (props: EditListingPageProps) => {
  const { id: listingId } = await props.params;

  // NOTE: In a real application, you would fetch data here:
  // const { data: listing, isLoading } = useQuery(['listing', listingId], () => fetchListing(listingId));

  // For now, use mock data:

  console.log(listingId);

  let listingData = null;

  // NOTE: Replace with actual data fetching logic later
  try {
    const listingsRes = await fetch(
      `http://localhost:3000/api/product/getProduct/${listingId}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Cookie: `jwt`,
        },
      }
    );

    listingData = await listingsRes.json();
    listingData = listingData.product;
    console.log(listingData);
  } catch (error) {
    console.log(error);
  }

  if (!listingData) {
    // Handle loading or error state
    return (
      <div className="w-full max-w-4xl mx-auto p-8 text-center">
        Loading listing details...
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header with Icon and Listing ID */}
      <header className="flex items-center gap-3 mb-6">
        <Edit3 className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Edit Listing:
          <span className="text-green-600 dark:text-green-400 ml-2">
            {listingData.title}
          </span>
        </h1>
      </header>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Listing ID:{" "}
        <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded">
          {listingId}
        </code>
        . Modify the details below and save your changes.
      </p>

      <Separator className="my-4 bg-gray-200 dark:bg-gray-700" />

      {/* Form Container */}
      <main className="mt-8 bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
        <EditForme initialData={listingData} listingId={listingId} />
      </main>
    </div>
  );
};

export default EditListingPage;
