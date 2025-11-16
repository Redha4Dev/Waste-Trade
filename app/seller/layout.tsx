// app/seller/layout.tsx (Child Layout)

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// Assuming your global Navbar height is h-16 (64px)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* 1. Flex container to hold the full-height layout */}
      <div className="flex mx-auto h-full">
        
        <AppSidebar />

        {/* 2. Main content area: uses flex-1 to occupy the remaining horizontal space. */}
        <main className="flex-1 overflow-y-auto relative">
          
          {/* 3. FIX: Move the SidebarTrigger OUT of the scrollable main content 
                 and position it absolutely/fixed based on its implementation. 
                 
                 Since SidebarTrigger is likely designed to be simple, let's use 
                 a **fixed** position wrapper that sits right below the Navbar (top-[64px]).
                 This ensures it is always in the viewport regardless of scroll.
          */}
          <div className="fixed top-[64px] left-0 z-50 p-2 bg-green-600 shadow-xl rounded-r-full rounded-tl-none">

            <SidebarTrigger />
          </div>


          <div className="p-4 sm:p-6 flex justify-center lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}