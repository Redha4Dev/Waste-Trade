import Image from "next/image";
import { ArrowRight, Leaf, Recycle } from "lucide-react"; // Assuming 'lucide-react' is installed for icons

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 flex flex-col items-center p-8 sm:p-16">
      

      <main className="flex flex-col gap-12 sm:gap-16 items-center max-w-5xl text-center">
        
        <div className="flex flex-col gap-6 items-center">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            The <span className="text-green-600 dark:text-green-400">Green</span> Market for Waste.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Connect with certified recyclers and businesses. Trade waste materials efficiently, transparently, and sustainably.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full transition-all duration-300 flex items-center justify-center bg-green-600 text-white gap-2 hover:bg-green-700 font-semibold text-lg h-12 px-8 w-full sm:w-auto shadow-lg hover:shadow-xl"
            href="/register"
          >
            Start Trading Today
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>
          <a
            className="rounded-full transition-colors duration-300 flex items-center justify-center border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium text-lg h-12 px-8 w-full sm:w-auto"
            href="#howitworks"
          >
            Learn More
          </a>
        </div>
      
        <div className="mt-8">
          <Image
            src="/recycling-illustration.png" // Replace with a suitable image/illustration path
            alt="Waste Trade Recycling Illustration"
            width={600}
            height={400}
            priority
            className="rounded-xl shadow-2xl opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      </main>

      {/* Footer/Section Links */}
      <footer className="w-full max-w-7xl mt-24 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-6 sm:gap-12 items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Recycle className="w-4 h-4 text-green-500" />
          <span>Commitment to a Circular Economy</span>
        </div>
        <a
          className="hover:text-green-600 hover:underline hover:underline-offset-4 transition-colors"
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a
          className="hover:text-green-600 hover:underline hover:underline-offset-4 transition-colors"
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
        <span className="text-xs mt-4 sm:mt-0">&copy; {new Date().getFullYear()} Waste Trade. All rights reserved.</span>
      </footer>
    </div>
  );
}
