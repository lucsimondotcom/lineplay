# Modern Loading System

This loading system provides a sophisticated, classy way to show loading states during page transitions and user interactions.

## Features

- **Immediate Response**: Starts loading as soon as user clicks a link
- **Automatic Page Transitions**: Shows loading indicator during route changes
- **Programmatic Navigation**: Works with router.push(), router.replace(), etc.
- **Manual Control**: Trigger loading states for specific actions
- **Smooth Animations**: Sophisticated progress bar with shimmer effects
- **Context-Based**: Uses React Context for global state management
- **Customizable**: Easy to customize appearance and behavior

## Components

### 1. NavigationLoadingProvider
The main provider that wraps your app and handles automatic loading states.

```tsx
// In your root layout
import NavigationLoadingProvider from '../components/NavigationLoadingProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavigationLoadingProvider>
          {children}
        </NavigationLoadingProvider>
      </body>
    </html>
  )
}
```

### 2. EnhancedLoadingIndicator
The visual loading indicator with sophisticated animations.

- Progress bar with gradient effects
- Shimmer animations
- Optional loading text
- Smooth transitions

### 3. LoadingButton
A button component that shows loading states for actions.

```tsx
import LoadingButton from '../components/LoadingButton'

function MyComponent() {
  const handleSubmit = async () => {
    // Your async action here
    await submitForm()
  }

  return (
    <LoadingButton
      onClick={handleSubmit}
      loadingText="Submitting..."
      variant="primary"
    >
      Submit Form
    </LoadingButton>
  )
}
```

### 4. LoadingLink
A Link component that automatically starts loading on click.

```tsx
import LoadingLink from '../components/LoadingLink'

function Navigation() {
  return (
    <nav>
      <LoadingLink href="/products" className="nav-link">
        Products
      </LoadingLink>
      <LoadingLink href="/about" className="nav-link">
        About
      </LoadingLink>
    </nav>
  )
}
```

## Hooks

### useLoading
Custom hook for manual loading control.

```tsx
import { useLoading } from '../lib/hooks/use-loading'

function MyComponent() {
  const { startLoading, stopLoading, withLoading } = useLoading()

  // Manual control
  const handleAction = async () => {
    startLoading()
    try {
      await someAsyncAction()
    } finally {
      stopLoading()
    }
  }

  // Automatic control
  const handleActionWithLoading = async () => {
    await withLoading(async () => {
      await someAsyncAction()
    })
  }

  return (
    <button onClick={handleActionWithLoading}>
      Perform Action
    </button>
  )
}
```

### useNavigationWithLoading
Custom hook for navigation with automatic loading states.

```tsx
import { useNavigationWithLoading } from '../lib/hooks/use-navigation-with-loading'

function MyComponent() {
  const { push, replace, back } = useNavigationWithLoading()

  const handleNavigation = () => {
    push('/products') // Automatically starts loading
  }

  const handleReplace = () => {
    replace('/checkout') // Automatically starts loading
  }

  return (
    <div>
      <button onClick={handleNavigation}>Go to Products</button>
      <button onClick={handleReplace}>Go to Checkout</button>
      <button onClick={back}>Go Back</button>
    </div>
  )
}
```

## Usage Examples

### 1. Form Submission
```tsx
import LoadingButton from '../components/LoadingButton'

function ContactForm() {
  const handleSubmit = async (data) => {
    await submitContactForm(data)
  }

  return (
    <form>
      {/* form fields */}
      <LoadingButton
        onClick={handleSubmit}
        loadingText="Sending..."
        variant="primary"
      >
        Send Message
      </LoadingButton>
    </form>
  )
}
```

### 2. Data Fetching
```tsx
import { useLoading } from '../lib/hooks/use-loading'

function ProductList() {
  const { withLoading } = useLoading()
  const [products, setProducts] = useState([])

  const loadProducts = async () => {
    await withLoading(async () => {
      const data = await fetchProducts()
      setProducts(data)
    })
  }

  return (
    <div>
      <button onClick={loadProducts}>Load Products</button>
      {/* product list */}
    </div>
  )
}
```

### 3. Custom Loading States
```tsx
import { useNavigationLoading } from '../components/NavigationLoadingProvider'

function CustomComponent() {
  const { startLoading, stopLoading } = useNavigationLoading()

  const handleComplexAction = async () => {
    startLoading()
    
    // Step 1
    await step1()
    
    // Step 2
    await step2()
    
    // Step 3
    await step3()
    
    stopLoading()
  }

  return (
    <button onClick={handleComplexAction}>
      Perform Complex Action
    </button>
  )
}
```

## Customization

### Styling the Loading Indicator
The loading indicator uses Tailwind CSS classes and can be customized by modifying the `EnhancedLoadingIndicator` component.

### Animation Timing
Adjust the timing in the `NavigationLoadingProvider`:

```tsx
// Minimum loading time (ms)
const timeout = setTimeout(() => {
  setIsLoading(false)
}, 200) // Adjust this value
```

### Progress Bar Behavior
Modify the progress simulation in `EnhancedLoadingIndicator`:

```tsx
// Progress increment
const increment = Math.random() * 8 + 2 // Adjust range
```

## Best Practices

1. **Use for Async Operations**: Only show loading for operations that take time
2. **Provide Feedback**: Use descriptive loading text
3. **Consistent Timing**: Keep loading times consistent for better UX
4. **Error Handling**: Always handle errors and stop loading states
5. **Accessibility**: Ensure loading states are accessible to screen readers

## Performance Considerations

- The loading system is lightweight and doesn't impact performance
- Loading states are managed efficiently with proper cleanup
- Animations use CSS transforms for optimal performance
- Context updates are optimized to prevent unnecessary re-renders 