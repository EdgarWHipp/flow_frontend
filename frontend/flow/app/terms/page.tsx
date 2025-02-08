"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f3f1ea] flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 text-center mb-8">Last updated: February 2025</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using our website, you accept and agree to be bound by the terms and conditions stated herein.
            If you do not agree with any part of these terms, please discontinue use of our site immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting
            on this page. It is your responsibility to review these Terms periodically.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <p className="text-gray-700">
            You agree not to use our website for any unlawful purposes, including but not limited to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Engaging in fraudulent or illegal activities</li>
            <li>Disrupting website functionality</li>
            <li>Uploading harmful content or malware</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
          <p className="text-gray-700">
            We are not liable for any indirect, incidental, or consequential damages that may arise from the use of our website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Governing Law</h2>
          <p className="text-gray-700">
            These Terms shall be governed by and interpreted in accordance with the laws of your jurisdiction.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact Us
            </Link>.
          </p>
        </section>

        <div className="text-center mt-8">
          <Link href="/" className="text-blue-600 hover:underline text-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
