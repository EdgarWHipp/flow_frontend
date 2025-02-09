"use client"

import Link from "next/link"

export default function UseCasesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f3f1ea]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2F1EA]/80 backdrop-blur-lg border-b-2 border-[#E8E8E8] h-[66px] flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="lg:absolute lg:left-[271px]">
            <Link href="/">
            <span className="font-instrument-serif text-xl font-bold text-orange-500"><i>goldfish</i></span>
            </Link>
          </div>
          
          <div className="lg:absolute lg:right-[271px] flex items-center gap-[40px]">
            <Link href="/" className="text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors font-instrument-sans">
              Home
            </Link>
            <Link
              href="/contact"
              className="text-[13px] font-medium bg-black text-white px-[13px] pt-[8px] pb-[8px] rounded-[7px] hover:bg-gray-800 transition-colors font-instrument-sans"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center bg-[#f3f1ea] pt-[66px]">
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-12 font-instrument-serif">
            Transform Your <span className="italic">Financial</span> Decision Making
          </h1>

          <p className="text-xl text-center mb-12 font-instrument-sans">
            goldfish analyzes your financial data & provides insights you'd normally need an expert to uncover.
          </p>

        

        
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            <nav className="flex gap-6">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
            </nav>

          </div>
        </div>
      </footer>
    </main>
  )
}