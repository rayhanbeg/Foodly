import { Link } from 'react-router-dom'

export default function CtaSection() {
  return (
    <section className="bg-secondary text-white py-16">
      <div className="container-fluid text-center">
        <h2 className="font-display text-4xl font-bold mb-6">Ready for your next bite?</h2>
        <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Sign up, pick your meal, and track your order from kitchen to doorstep.
        </p>
        <Link
          to="/menu"
          className="bg-white text-secondary px-8 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors inline-block"
        >
          Start Ordering
        </Link>
      </div>
    </section>
  )
}
