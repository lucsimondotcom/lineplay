'use client'

import { useState } from 'react'
import LoadingButton from './LoadingButton'
import { useLoading } from '../lib/hooks/use-loading'

export default function LoadingExample() {
  const [data, setData] = useState<string[]>([])
  const { withLoading } = useLoading()

  // Simulate async data fetching
  const fetchData = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    return ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  }

  // Simulate form submission
  const submitForm = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form submitted successfully!')
  }

  // Simulate complex operation
  const performComplexOperation = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000))
    console.log('Complex operation completed!')
  }

  const handleFetchData = async () => {
    const result = await withLoading(fetchData)
    setData(result)
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Loading System Examples</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">1. Data Fetching with Loading</h3>
          <LoadingButton
            onClick={handleFetchData}
            loadingText="Fetching data..."
            variant="primary"
          >
            Fetch Data
          </LoadingButton>
          
          {data.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h4 className="font-medium mb-2">Fetched Data:</h4>
              <ul className="space-y-1">
                {data.map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">2. Form Submission</h3>
          <LoadingButton
            onClick={submitForm}
            loadingText="Submitting..."
            variant="secondary"
          >
            Submit Form
          </LoadingButton>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">3. Complex Operation</h3>
          <LoadingButton
            onClick={performComplexOperation}
            loadingText="Processing..."
            variant="outline"
            size="lg"
          >
            Perform Complex Operation
          </LoadingButton>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="text-lg font-semibold mb-2">How it works:</h3>
        <ul className="text-sm space-y-1">
          <li>• The loading indicator appears at the top of the page</li>
          <li>• Progress bar animates with realistic loading simulation</li>
          <li>• Shimmer effects provide visual feedback</li>
          <li>• Loading text shows current action</li>
          <li>• Smooth transitions between states</li>
        </ul>
      </div>
    </div>
  )
} 