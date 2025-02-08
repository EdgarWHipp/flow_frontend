"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import ChatInterface from '@/components/ChatInterface'
import { Completion } from '@/types/api'

// API Endpoints
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
const FLOWS_ENDPOINT = `${API_BASE}${process.env.NEXT_PUBLIC_FLOWS_ENDPOINT}`
const COMPLETION_ENDPOINT = `${API_BASE}${process.env.NEXT_PUBLIC_COMPLETION_ENDPOINT}`
const CHAT_ENDPOINT = `${API_BASE}${process.env.NEXT_PUBLIC_CHAT_ENDPOINT}`

// API Functions
const fetchFlowData = async (flowId: string): Promise<Completion> => {
  const response = await fetch(`${FLOWS_ENDPOINT}/${flowId}`)
  if (!response.ok) throw new Error('Failed to fetch flow')
  return response.json()
}

const fetchCompletion = async (flowId: string): Promise<{ message: string }> => {
  const response = await fetch(COMPLETION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flowId }),
  })
  if (!response.ok) throw new Error('Failed to fetch completion')
  return response.json()
}

const sendChatMessage = async (flowId: string, message: string): Promise<{ message: string }> => {
  const response = await fetch(CHAT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ flowId, message }),
  })
  if (!response.ok) throw new Error('Failed to send message')
  return response.json()
}

export default function FlowPage() {
  const params = useParams()
  const [flow, setFlow] = useState<Completion | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPdf, setIsPdf] = useState(false)

  useEffect(() => {
    const initializeFlow = async () => {
      try {
        setLoading(true)
        // Fetch initial flow data
        const flowData = await fetchFlowData(params.id as string)
        setFlow(flowData)

        // Check if return value is a PDF path
        const returnValue = flowData.relatedFlows[0]?.return || ''
        const isPdfFile = returnValue.startsWith('/') && returnValue.endsWith('.pdf')
        setIsPdf(isPdfFile)

        // If not a PDF, fetch completion
        if (!isPdfFile) {
          const completionData = await fetchCompletion(params.id as string)
          setFlow(prev => ({
            ...prev!,
            relatedFlows: [{ ...prev!.relatedFlows[0], return: completionData.message }]
          }))
        }
      } catch (error) {
        console.error('Error initializing flow:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeFlow()
  }, [params.id])

  const handleSendMessage = async (message: string) => {
    try {
      const response = await sendChatMessage(params.id as string, message)
      setFlow(prev => ({
        ...prev!,
        relatedFlows: [{ ...prev!.relatedFlows[0], return: response.message }]
      }))
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return <LoadingState />
  }

  if (!flow) {
    return <ErrorState />
  }

  return (
    <main className="min-h-screen bg-[#f3f1ea]">
      <Header />
      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <FlowHeader flow={flow} />
        {isPdf ? (
          <PdfDownload url={flow.relatedFlows[0].return} />
        ) : (
          <ChatContainer
            initialMessage={flow.relatedFlows[0].return}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </main>
  )
}

// Component Extractions
const LoadingState = () => (
  <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
    <div className="text-xl font-semibold">Loading...</div>
  </div>
)

const ErrorState = () => (
  <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
    <div className="text-xl font-semibold">Flow not found</div>
  </div>
)

const Header = () => (
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
)

const FlowHeader = ({ flow }: { flow: Completion }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-4">{flow.title}</h1>
    <p className="text-gray-600 mb-6">{flow.description}</p>
    <div className="text-green-600 text-xl font-semibold">
      Potential savings: €{flow.potentialSavings}
    </div>
  </div>
)

const PdfDownload = ({ url }: { url: string }) => (
  <a
    href={url}
    download
    className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
  >
    Download PDF
  </a>
)

const ChatContainer = ({ initialMessage, onSendMessage }: { initialMessage: string, onSendMessage: (message: string) => void }) => (
  <div className="h-[600px]">
    <ChatInterface
      initialMessage={initialMessage}
      onSendMessage={onSendMessage}
    />
  </div>
) 