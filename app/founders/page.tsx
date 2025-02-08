"use client"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function FoundersPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f3f1ea]">
      {/* Header - keeping the same header as main page */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2F1EA]/80 backdrop-blur-lg border-b-2 border-[#E8E8E8] h-[66px] flex items-center">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="lg:absolute lg:left-[271px]">
            <Link href="/">
              <span className="font-instrument-serif text-xl font-bold">flow</span>
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
            Meet the <span className="italic">Founders</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Johann Hipp */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <Image
                  src="/founders/johann_pic.jpg"
                  alt="Johann Hipp"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 font-instrument-serif">Johann Hipp</h2>
              <p className="text-center text-gray-600 font-instrument-sans">
              Technical Lead 
              </p>
              <p className="text-center text-gray-600 font-instrument-sans">
              <i>Currently @Deloitte 
              </i>
              </p>
            </div>

            {/* Johann Hipp */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <Image
                  src="/founders/rick_pic.jpeg"
                  alt="Rick Petzold"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 font-instrument-serif">Rick Petzold</h2>
              <p className="text-center text-gray-600 font-instrument-sans">
                Product Lead
              </p>
              <p className="text-center text-gray-600 font-instrument-sans">
              <i>Currently @Deloitte 
              </i>              </p>
            </div>

            {/* Edgar Hipp */}
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full bg-gray-200 mb-4 overflow-hidden">
                <Image
                  src="/founders/edgar_pic.jpg"
                  alt="Edgar Hipp"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 font-instrument-serif">Edgar Hipp</h2>
              <p className="text-center text-gray-600 font-instrument-sans">
                Business Lead
              </p>
              <p className="text-center text-gray-600 font-instrument-sans">
                <i>Currently @PwC
                  </i>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4">
            
            <nav className="flex gap-6">
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link href="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </nav>
            <p className="text-sm opacity-70">
              Made with <span className="text-red-500">❤️</span> and the power of AI.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}