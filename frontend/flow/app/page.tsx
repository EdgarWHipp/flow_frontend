"use client"

import { useState, useEffect, useRef, DragEvent, ChangeEvent } from "react"
import Link from "next/link"
import { Upload, FileText, X, ChevronDown } from "lucide-react"
import LoadingBar from "../components/LoadingBar"
import { Recommendation } from '../types/api'
import { MOCK_RECOMMENDATIONS } from '../mock/recommendations'

// Add environment check (you can set this in your .env file)
const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// Add mock API function
const getMockRecommendations = async (): Promise<Recommendation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return MOCK_RECOMMENDATIONS;
};

// Utility function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

export default function LandingPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false)
  const [userDescription, setUserDescription] = useState("")
  const useCasesRef = useRef<HTMLDivElement>(null)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (useCasesRef.current && !useCasesRef.current.contains(event.target as Node)) {
        setIsUseCasesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    if (droppedFile) {
      await handleFileUpload(droppedFile);
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      await handleFileUpload(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null)
    setIsLoading(false)
  }

  const handleFileUpload = async (fileToUpload: File) => {
    setIsLoading(true);
    try {
      if (IS_MOCK) {
        // Use mock data with artificial delay
        const mockData = await getMockRecommendations();
        setRecommendations(mockData);
      } else {
        // Upload document first
        const base64Content = await fileToBase64(fileToUpload);
        const uploadResponse = await fetch('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: fileToUpload.type,
            content: base64Content,
            metadata: {
              filename: fileToUpload.name,
              uploadedAt: new Date().toISOString(),
              mimeType: fileToUpload.type,
            },
          }),
        });

        if (!uploadResponse.ok) {
          throw new Error('Document upload failed');
        }

        const { documentId } = await uploadResponse.json();

        // Then get recommendations
        const recommendationsResponse = await fetch(`/api/recommendations?documentId=${documentId}`);
        if (!recommendationsResponse.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const recommendationsData = await recommendationsResponse.json();
        setRecommendations(recommendationsData);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      // Fallback to mock data if API fails
      const mockData = await getMockRecommendations();
      setRecommendations(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f3f1ea]">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 
        bg-[#F2F1EA]/80 backdrop-blur-lg border-b-2 border-[#E8E8E8]
        h-[66px] flex items-center"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo container */}
          <div className="lg:absolute lg:left-[271px]">
            <div className="relative">
              <span className="font-instrument-serif text-xl font-bold">flow</span>
            </div>
          </div>

          {/* Right side elements */}
          <div className="lg:absolute lg:right-[271px] flex items-center gap-[40px]">
           
              <Link
                href="/use_cases"
                className="text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors font-instrument-sans flex items-center"
              >
                Use Cases
                </Link>
              
    
            <Link
              href="/founders"
              className="text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors font-instrument-sans"
            >
              Meet the Founders
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
          <h1 className="text-5xl font-bold text-center mb-6 font-instrument-serif">
            Automate <span className="italic">intelligent</span> financial analysis
          </h1>
          <p className="text-xl text-center mb-12 font-instrument-sans">
            Flow analyzes your financial data & provides insights you'd normally need an expert to uncover.
          </p>

          {/* User Description */}
          <div className="mb-8">
            <textarea
              id="userDescription"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Briefly describe your role and what you're looking to achieve financially"
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
            ></textarea>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-lg font-semibold">Drag and drop your file here, or click to select</p>
                <p className="mt-2 text-sm text-gray-500">Upload your PDFs, Excel sheets, or Obsidian.md files</p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  id="fileInput"
                  accept=".pdf,.xlsx,.xls,.md"
                />
                <label
                  htmlFor="fileInput"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                >
                  Select File
                </label>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between bg-white p-4 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-500 mr-3" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {isLoading && (
                  <div className="mt-4">
                    <div className="w-full h-[40px] overflow-hidden">
                      <LoadingBar />
                    </div>

                    <p className="mt-2 text-lg font-semibold text-black-600 animate-bounce">
                      creating flows
                      <span className="inline-block animate-wave"></span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Available Flows Section */}
          {file && !isLoading && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Available flows</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold mb-2">{recommendation.title}</h3>
                    <p className="text-sm text-gray-600">{recommendation.description}</p>
                    <div className="mt-2 text-sm text-green-600">
                      Potential savings: €{recommendation.potentialSavings}
                    </div>
                    <Link 
  href={`/flow/${recommendation.id}`}
  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors inline-block"
  onClick={(e) => {
    e.preventDefault()
    // Add a slight delay before navigation to allow the exit animation to play
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      window.location.href = `/flow/${recommendation.id}`
    }, 300)
  }}
>
  View Flow
</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {file && !isLoading && (
            <div className="mt-6 text-center">
              
            </div>
          )}
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