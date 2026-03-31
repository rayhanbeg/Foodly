import { Link } from 'react-router-dom';

const highlights = [
  { label: 'Average delivery', value: '30 min', icon: '⏱️' },
  { label: 'Customer rating', value: '4.9', icon: '⭐' },
  { label: 'Partner restaurants', value: '200+', icon: '🏪' },
];

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9fafb_1px,transparent_1px),linear-gradient(to_bottom,#f9fafb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      
      <div className="container-fluid mx-auto px-6 lg:px-8 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-gray-50/80 backdrop-blur-sm rounded-full px-3 py-1.5 mb-8 border border-gray-200/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-gray-700 tracking-wide">Now serving your area</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.2] mb-6">
              Great food
              <span className="block text-orange-600">delivered fast</span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Discover the best local restaurants and get your favorites delivered in minutes. 
              Free delivery on first order.
            </p>

            {/* CTA buttons */}
            <div className="flex gap-1 lg:gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Order now
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-8 py-3.5 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Partner with us
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {highlights.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80"
                alt="Bowl of fresh salad with vegetables and grains"
                className="w-full h-[520px] object-cover"
              />
              {/* Overlay to enhance text readability if needed - subtle */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border border-gray-100/50 flex items-center gap-3">
              <div className="bg-emerald-100 rounded-full p-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">1,500+ meals</p>
                <p className="text-xs text-gray-500">delivered today</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-40 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}