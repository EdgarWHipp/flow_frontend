"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Recommendation } from '../../../types/api'
import { MOCK_RECOMMENDATIONS } from '../../../mock/recommendations'
import Link from 'next/link'

// Add environment check
const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export default function FlowPage() {
  const params = useParams()
  const [flow, setFlow] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <main className="min-h-screen bg-[#f3f1ea] p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-500 hover:underline mb-6 block">
          ← Back to recommendations
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">{flow.title}</h1>
        <p className="text-gray-600 mb-6">{flow.description}</p>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Potential Savings</h2>
            <p className="text-green-600 text-2xl font-bold">€{flow.potentialSavings}</p>
          </div>

          {flow.relatedFlows.map((relatedFlow) => (
            <div key={relatedFlow.id} className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{relatedFlow.name}</h2>
              <p className="text-gray-600 mb-4">{relatedFlow.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Steps:</h3>
                <ul className="list-disc pl-5">
                  {relatedFlow.steps.map((step, index) => (
                    <li key={index} className="mb-1">{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc pl-5">
                  {relatedFlow.requirements.map((req, index) => (
                    <li key={index} className="mb-1">{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 