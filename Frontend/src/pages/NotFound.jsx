import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-fluid py-20 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-6xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="font-display text-3xl font-bold text-neutral-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        <Link to="/" className="btn-primary inline-block">
          Go Home
        </Link>
      </div>
    </div>
  )
}
