'use client'

import LoadingLink from './LoadingLink'
import LoadingButton from './LoadingButton'
import { useNavigationWithLoading } from '../lib/hooks/use-navigation-with-loading'
import { useLoading } from '../lib/hooks/use-loading'

export default function ImmediateLoadingExample() {
  const { push, replace, back } = useNavigationWithLoading()
  const { withLoading } = useLoading()

  const handleAsyncAction = async () => {
    await withLoading(async () => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Async action completed!')
    })
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Immediate Loading Examples</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">1. LoadingLink (Immediate on Click)</h3>
          <div className="space-x-4">
            <LoadingLink 
              href="/products" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Products
            </LoadingLink>
            <LoadingLink 
              href="/about" 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Go to About
            </LoadingLink>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Loading starts immediately when you click these links
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">2. Programmatic Navigation</h3>
          <div className="space-x-4">
            <button 
              onClick={() => push('/collections')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Push to Collections
            </button>
            <button 
              onClick={() => replace('/checkout')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Replace with Checkout
            </button>
            <button 
              onClick={back}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go Back
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Loading starts immediately when using these navigation methods
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">3. Async Actions</h3>
          <LoadingButton
            onClick={handleAsyncAction}
            loadingText="Processing..."
            variant="primary"
          >
            Perform Async Action
          </LoadingButton>
          <p className="text-sm text-gray-600 mt-2">
            Loading starts immediately when button is clicked
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded">
        <h3 className="text-lg font-semibold mb-2 text-green-800">Key Improvements:</h3>
        <ul className="text-sm space-y-1 text-green-700">
          <li>• <strong>No Delay:</strong> Loading starts immediately on click</li>
          <li>• <strong>All Navigation:</strong> Works with links, buttons, and programmatic navigation</li>
          <li>• <strong>Faster Progress:</strong> Progress bar animates more quickly for immediate feedback</li>
          <li>• <strong>Better UX:</strong> Users see instant response to their actions</li>
        </ul>
      </div>
    </div>
  )
} 