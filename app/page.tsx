"use client"

import { useState, useRef, DragEvent, ChangeEvent } from "react"
import Link from "next/link"
import { Upload, FileText, X, Loader2 } from "lucide-react"
import { Recommendation } from '../types/api'
import { MOCK_RECOMMENDATIONS } from '../mock/recommendations'

const IS_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
const T = process.env.NEXT_PUBLIC_T;
const N = process.env.NEXT_PUBLIC_N;

const LoadingScreen = ({ isVisible }: { isVisible: boolean }) => (
  isVisible ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-xl">
      <Loader2 className="h-10 w-10 text-black-600 animate-spin" />
    </div>
  ) : null
);

export default function LandingPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  const handleFileUpload = async (fileToUpload: File) => {
    setIsLoading(true);
    try {
      if (IS_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setRecommendations(MOCK_RECOMMENDATIONS);
      } else {
        const formData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('T', T || '1.5');
        formData.append('N', N || '1');
        
        const response = await fetch('http://localhost:8000/matrix', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        setRecommendations(MOCK_RECOMMENDATIONS);
      }
    } catch (error) {
      console.error('Error:', error);
      setRecommendations(MOCK_RECOMMENDATIONS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    if (droppedFile) await handleFileUpload(droppedFile);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await handleFileUpload(selectedFile);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f3f1ea]">
      <LoadingScreen isVisible={isLoading} />
      
      <div className="flex-1 flex flex-col items-center pt-[66px]">
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-center mb-6">
            Automate <span className="italic">intelligent</span> financial analysis
          </h1>

          <div className="border-2 border-dashed rounded-lg p-8 text-center"
               onDrop={handleDrop}
               onDragOver={(e) => e.preventDefault()}>
            {!file ? (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  id="fileInput"
                  accept=".csv"
                />
                <label
                  htmlFor="fileInput"
                  className="mt-4 inline-flex items-center px-4 py-2 border text-sm rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Select Matrix
                </label>
              </>
            ) : (
              <div className="flex items-center justify-between bg-white p-4 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-500 mr-3" />
                  <span>{file.name}</span>
                </div>
                <button onClick={() => setFile(null)}>
                  <X className="h-5 w-5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {recommendations.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((rec) => (
                <Link 
                  key={rec.id}
                  href={`/flow/${rec.id}`}
                  className="bg-black text-white rounded-lg p-6 hover:scale-105 transition-transform"
                >
                  <h3 className="text-lg font-semibold mb-3">{rec.title}</h3>
                  <p className="text-sm text-gray-300">{rec.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
