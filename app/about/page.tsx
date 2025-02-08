"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f3f1ea] flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          We are a team of three young, ambitious students passionate about innovation and technology.  
          Our mission is to build impactful digital solutions that simplify complex problems and bring creative ideas to life.  
          With backgrounds in product development, business, and technology, we are driven to launch a company that makes a difference.
        </p>

        <h2 className="text-2xl font-semibold text-center mb-6">Meet the Founders</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Edgar Hipp */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Edgar Hipp</h3>
            <p className="text-center text-gray-600">Business Lead & Co-founder</p>
            <Link
              href="https://www.linkedin.com/in/edgar-hipp-b850aa200/"
              target="_blank"
              className="text-blue-600 hover:underline mt-2"
            >
              LinkedIn
            </Link>
          </div>

          {/* Rick Petzold */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Rick Petzold</h3>
            <p className="text-center text-gray-600">Product Lead & Co-founder</p>
            <Link
              href="https://www.linkedin.com/in/rick-petzold/"
              target="_blank"
              className="text-blue-600 hover:underline mt-2"
            >
              LinkedIn
            </Link>
          </div>

          {/* Johann Hipp */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Johann Hipp</h3>
            <p className="text-center text-gray-600">Technical Lead & Co-founder</p>
            <Link
              href="https://www.linkedin.com/in/johannhipp/"
              target="_blank"
              className="text-blue-600 hover:underline mt-2"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-blue-600 hover:underline text-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}