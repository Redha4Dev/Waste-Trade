import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button is available
import { Separator } from "@/components/ui/separator"; // Assuming Shadcn Separator is available
import {
  DollarSign,
  Package,
  TrendingUp,
  Bell,
  PlusCircle,
  ArrowRight,
  Truck,
  MessageSquare,
} from "lucide-react"; // Icons
import Link from "next/link";

// --- Static Data Simulation ---
const sellerData = {
  kpis: [
    {
      title: "Total Active Listings",
      value: 15,
      unit: "Listings",
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Sales / Bids",
      value: 5,
      unit: "Sales",
      icon: TrendingUp,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Waste Sold (MTD)",
      value: 15.5,
      unit: "Tons",
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Est. Revenue (MTD)",
      value: 15000,
      unit: "$",
      icon: DollarSign,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ],
  pendingActions: [
    {
      id: 1,
      type: "New Messages",
      count: 3,
      description: "Unread chats with potential buyers.",
      link: "/seller/messages",
      icon: MessageSquare,
    },
    {
      id: 2,
      type: "Bids Ending Soon",
      count: 2,
      description: "Two listings require attention.",
      link: "/seller/listings",
      icon: Bell,
    },
  ],
  recentListings: [
    {
      id: "1",
      material: "PET Bottles",
      quantity: 3000,
      unit: "kg",
      bestBid: "$450",
      status: "Active",
    },
    {
      id: "33",
      material: "HDPE Containers",
      quantity: 5000,
      unit: "kg",
      bestBid: "$1200",
      status: "Pending Bid",
    },
    {
      id: "22",
      material: "Plastic Bags",
      quantity: 800,
      unit: "kg",
      bestBid: "$150",
      status: "Active",
    },
  ],
};

// --- Component for KPI Cards ---
const KPICard = ({
  title,
  value,
  unit,
  icon: Icon,
  color,
  bgColor,
}: (typeof sellerData.kpis)[0] & { icon: React.ElementType }) => (
  <div
    className={`p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col items-start`}
  >
    <div className={`p-3 rounded-full ${bgColor} mb-3`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {title}
    </p>
    <h2 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
      {unit === "$" && unit}
      {value.toLocaleString()}
      {unit !== "$" && ` ${unit}`}
    </h2>
  </div>
);

const SellerDashboardPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto  p-4 sm:p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Seller Dashboard 👋
        </h1>
        {/* Quick Action Button */}
        <Link href="/seller/new">
          <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2 px-6 h-11">
            <PlusCircle className="w-5 h-5" />
            Create New Listing
          </Button>
        </Link>
      </header>

      <Separator className="my-6 bg-gray-200 dark:bg-gray-700" />

      {/* 1. KPI Grid */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Your Performance Snapshot
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sellerData.kpis.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>
      </section>

      {/* 2. Pending Actions and Alerts */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Pending Actions & Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sellerData.pendingActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.id}
                className="p-5 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 p-3 rounded-full bg-yellow-400/80">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
                      {action.count} {action.type}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {action.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  asChild
                  className="text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/50"
                >
                  <a href={action.link}>
                    View <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Recent Listings Table */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent Active Listings
        </h2>
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Best Bid
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
              {sellerData.recentListings.map((listing) => (
                <tr key={listing.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {listing.material}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {listing.quantity.toLocaleString()} {listing.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-semibold">
                    {listing.bestBid}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        listing.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="link"
                      asChild
                      className="text-green-600 hover:text-green-700 p-0"
                    >
                      <a href={`/seller/listings/${listing.id}`}>
                        View Details
                      </a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SellerDashboardPage;
