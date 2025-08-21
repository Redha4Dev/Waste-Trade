"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const buyerNavItems = [
  { label: "Home", href: "/" },
  { label: "Browse", href: "/buyer/browse" },
  { label: "My Orders", href: "/buyer/orders" },
];

const sellerNavItems = [
  { label: "Dashboard", href: "/seller/" },
  { label: "Messages", href: "/seller/messages" },
  { label: "Transactions", href: "/seller/transactions" },
];

const adminNavItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Manage Users", href: "/admin/users" },
  { label: "Reports", href: "/admin/reports" },
];

export default function NavItems() {
  const [role, setRole] = useState<string>("seller");

  useEffect(() => {
    // Example: get role from localStorage (after login)
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const items =
    role === "seller"
      ? sellerNavItems
      : role === "admin"
      ? adminNavItems
      : buyerNavItems;

  return (
    <nav className="flex items-center mx-auto gap-4">
      {items.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="hover:text-primary transition"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
