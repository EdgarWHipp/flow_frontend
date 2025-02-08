"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Recommendation } from '../../../types/api'
import { MOCK_RECOMMENDATIONS } from '../../../mock/recommendations'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

// Add environment check
const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export default function FlowPage() {
  const params = useParams()
  const [flow, setFlow] = useState<Recommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

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

  const handleStepClick = (index: number) => {
    setSelectedStep(selectedStep === index ? null : index)
  }

  const StepContent = ({ step, requirements }: { step: string, requirements: string[] }) => (
    <div className="bg-white rounded-lg p-6 shadow-md h-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Expected Return</h3>
        <p className="text-gray-600">{step}</p>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Documents needed:</h4>
        <ul className="list-disc pl-5 space-y-2">
          {requirements.map((req, idx) => (
            <li key={idx} className="text-gray-700">{req}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Document
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </div>
    </div>
  )

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
    <main className="min-h-screen bg-[#f3f1ea]">
      {/* Fixed header bar */}
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

      {/* Main content with top padding to account for fixed header */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex gap-8">
            {/* Left sidebar with steps - updated for single step */}
            <div className="w-1/3">
              <div className="sticky top-24 h-[calc(100vh-8rem)] flex items-center">
                <div className="relative w-full">
                  <AnimatePresence>
                    {flow.relatedFlows[0]?.return && (
                      <motion.div
                        key="single-step"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                          opacity: selectedStep === 0 ? 1 : 0.5,
                          y: 0,
                          scale: selectedStep === 0 ? 1.1 : 0.9,
                        }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className={`
                          absolute w-full
                          ${selectedStep === 0 ? 'relative z-10' : 'z-0'}
                        `}
                      >
                        <button
                          onClick={() => setSelectedStep(0)}
                          className={`
                            w-full text-left p-4 rounded-lg transition-all
                            ${selectedStep === 0 ? 
                              'bg-white border-2 border-blue-500 shadow-xl' : 
                              'bg-white hover:bg-gray-50 border-2 border-transparent'
                            }
                          `}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                              1
                            </div>
                            <p className="ml-4 font-medium text-gray-800">
                              {flow.relatedFlows[0].return}
                            </p>
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right side content */}
            <div className="flex-1">
              {selectedStep !== null ? (
                <StepContent 
                  step={flow.relatedFlows[0]?.return}
                  requirements={flow.relatedFlows[0]?.requirements}
                />
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h1 className="text-3xl font-bold mb-4">{flow.title}</h1>
                  <p className="text-gray-600 mb-6">{flow.description}</p>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Potential Savings</h2>
                    <p className="text-green-600 text-2xl font-bold">€{flow.potentialSavings}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      Select a step from the left to get started
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 