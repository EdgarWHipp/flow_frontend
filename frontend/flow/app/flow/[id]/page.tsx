"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Recommendation } from '../../../types/api'
import { MOCK_RECOMMENDATIONS } from '../../../mock/recommendations'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

// Add environment check
const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export default function FlowPage() {
  const params = useParams()
  const [flow, setFlow] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const fetchFlow = async () => {
      try {
        if (IS_MOCK) {
          // Use mock data
          const mockFlow = MOCK_RECOMMENDATIONS.find(r => r.id === params.id)
          setFlow(mockFlow || null)
        } else {
          // Real API implementation
          const response = await fetch(`/api/flows/${params.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch flow');
          }
          const data = await response.json();
          setFlow(data);
        }
      } catch (error) {
        console.error('Error fetching flow:', error)
        // Fallback to mock data
        const mockFlow = MOCK_RECOMMENDATIONS.find(r => r.id === params.id)
        setFlow(mockFlow || null)
      } finally {
        setLoading(false)
        // Hide intro after 3 seconds
        setTimeout(() => {
          setShowIntro(false)
        }, 3000)
      }
    }

    fetchFlow()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  if (!flow) {
    return (
      <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
        <div className="text-xl font-semibold">Flow not found</div>
      </div>
    )
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <p className="text-3xl font-semibold text-gray-800">
            Sounds good, lets help you with:
          </p>
          <p className="text-4xl font-bold text-blue-600 mt-4">
            {flow.title}
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#f3f1ea]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
          <Link 
            href="/" 
            className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to recommendations</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto p-8">
          <div className="bg-white rounded-lg p-6 shadow-md animate-fade-in">
            <p className="text-gray-600">{flow.relatedFlows[0]?.return}</p>
          </div>
        </div>
      </div>
    </main>
  )
} 