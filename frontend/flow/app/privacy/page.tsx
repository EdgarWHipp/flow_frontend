"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f3f1ea] flex flex-col items-center py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 text-center mb-8">Last updated: February 2025</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700">
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <p className="text-gray-700">
            We may collect personal information such as your name, email address, and other relevant details when you use our website or contact us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Provide and improve our services</li>
            <li>Respond to your inquiries</li>
            <li>Send updates and promotional materials (if opted in)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700">
            Our website may use cookies to enhance user experience. You can choose to disable cookies in your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
          <p className="text-gray-700">
            We take appropriate security measures to protect your personal information from unauthorized access or disclosure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Third-Party Services</h2>
          <p className="text-gray-700">
            We may use third-party services (such as analytics providers) that collect data in accordance with their privacy policies.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to request access to, update, or delete your personal information. Contact us for assistance.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at{" "}
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