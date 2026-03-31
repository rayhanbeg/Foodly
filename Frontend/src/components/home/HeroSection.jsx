import { Link } from 'react-router-dom'

const highlights = [
  { label: 'Fast delivery', value: '30-45 min' },
  { label: 'Happy customers', value: '25k+' },
  { label: 'Restaurants', value: '200+' }
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_45%)]" />
      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-white/20 mb-5">
              🔥 Trending now in your city
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Cravings delivered
              <span className="block text-orange-100">fresh, fast, and hot.</span>
            </h1>
            <p className="text-lg text-orange-100 mb-8 max-w-xl leading-relaxed">
              Browse top-rated meals from local kitchens and get your favorites delivered to your door in minutes.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/menu" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors shadow-lg shadow-orange-700/20">
                Explore Menu
              </Link>
              <Link to="/register" className="border border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Create Account
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {highlights.map(item => (
                <div key={item.label} className="bg-white/15 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
                  <p className="font-bold text-xl">{item.value}</p>
                  <p className="text-xs text-orange-100">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-3xl bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80"
                alt="Food bowl"
                className="w-full h-[420px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
