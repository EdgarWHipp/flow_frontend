"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import ChatInterface from '@/components/ChatInterface'

interface FlowResponse {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  relatedFlows: Array<{
    return: string;
    requirements: string[];
  }>;
}

export default function FlowPage() {
  const params = useParams()
  const [flow, setFlow] = useState<FlowResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPdf, setIsPdf] = useState(false)

  useEffect(() => {
    const fetchFlow = async () => {
      try {
        // Initial recommendation fetch
        const response = await fetch(`/api/flows/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch flow');
        const data = await response.json();
        setFlow(data);

        // Check if return value is a PDF path
        const returnValue = data.relatedFlows[0]?.return || '';
        setIsPdf(returnValue.startsWith('/') && returnValue.endsWith('.pdf'));

        // If not a PDF, fetch completion
        if (!isPdf) {
          const completionResponse = await fetch('/api/completion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flowId: params.id }),
          });
          if (completionResponse.ok) {
            const completionData = await completionResponse.json();
            setFlow(prev => ({
              ...prev!,
              relatedFlows: [{ ...prev!.relatedFlows[0], return: completionData.message }]
            }));
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlow();
  }, [params.id]);

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          flowId: params.id,
          message 
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update flow with new message
        setFlow(prev => ({
          ...prev!,
          relatedFlows: [{ ...prev!.relatedFlows[0], return: data.message }]
        }));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (!flow) {
    return (
      <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
        <div className="text-xl font-semibold">Flow not found</div>
      </div>
    );
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
      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{flow.title}</h1>
          <p className="text-gray-600 mb-6">{flow.description}</p>
          <div className="text-green-600 text-xl font-semibold">
            Potential savings: €{flow.potentialSavings}
          </div>
        </div>

        {isPdf ? (
          // PDF download button
          <a
            href={flow.relatedFlows[0].return}
            download
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Download PDF
          </a>
        ) : (
          // Chat interface
          <div className="h-[600px]">
            <ChatInterface
              initialMessage={flow.relatedFlows[0].return}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}
      </div>
    </main>
  );
} 