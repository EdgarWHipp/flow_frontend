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
        <div className="w-full max-w-2xl mx-auto px-8 py-16">
          {/* Fixed Title Section */}
          <div className="mb-20">
            <h1 className="text-5xl font-bold text-center mb-8 font-instrument-serif tracking-tight">
              Transform Your <span className="italic">Financial</span> Decision Making
            </h1>
          </div>

          {/* Content Sections */}
          
          <div className="text-left">
              <h2 className="text-3xl font-bold mb-6 font-instrument-serif tracking-tight">Introduction</h2>
              <p className="text-lg text-gray-700 font-instrument-sans leading-relaxed">
                Goldfish is a project launched at a Berlin AI Hackathon that focuses on giving individuals more financial freedom.
                 One can upload their personal financial statement and recieve personal recommendations on how to minimize their spendings.
                
      
              </p>
            </div>
            <br></br><br></br>
            
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6 font-instrument-serif tracking-tight">Background</h2>
              <p className="text-lg text-gray-700 font-instrument-sans leading-relaxed">
                The aim was to create a general application that can guide an individual to a more secure personal financial situation. 
                While other tools like Finanzfluss, Kirchensteuer.de etc already exist, a solution that guides a person through several optimizations for their finances does not yet exist. Goldfish aims to tackle this. 
                In the current version goldfish aims to identify issues such as:
                <ul className="list-disc list-inside text-left max-w-md mx-auto mt-4 text-gray-700 font-instrument-sans">
                <li>Tax benefits of a church exit</li>
                <li>Tex benefits when switching your tax class </li>
                <li>Overpaying for your rent</li>
                <li>Overspending on leisure </li>
                <li>Too many unused monthly subscriptions</li>
              </ul>
              </p>
            </div>
            <br></br><br></br>
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6 font-instrument-serif tracking-tight">How it works</h2>
              <p className="text-lg text-gray-700 font-instrument-sans leading-relaxed">
                
              
              </p>
            </div>
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