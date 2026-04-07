import { Link } from 'react-router-dom';

const highlights = [
  { label: 'Avg. delivery', value: '30 min', icon: '⏱️' },
  { label: 'Rating', value: '4.9 ★', icon: '⭐' },
  { label: 'Orders today', value: '1,500+', icon: '📦' },
];

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background pattern (light and subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f9fafb_1px,transparent_1px),linear-gradient(to_bottom,#f9fafb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20 lg:py-24 relative z-10">
        {/* On mobile: image first, then text. On desktop: text left, image right */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          
          {/* Image section - visible on all devices */}
          <div className="lg:order-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&auto=format&fit=crop&q=80"
                alt="Our signature fresh salad bowl"
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[520px] object-cover"
              />
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-none" />
              
              {/* Floating badge - repositioned for mobile */}
              <div className="absolute -bottom-4 left-4 right-4 lg:left-auto lg:right-auto lg:-bottom-6 lg:-left-6 bg-white rounded-2xl shadow-xl p-3 md:p-4 backdrop-blur-sm border border-gray-100/50 flex items-center gap-3">
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
            </div>
            {/* Decorative blur behind image (desktop only) */}
            <div className="hidden lg:block absolute -top-8 -right-8 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-40 -z-10" />
          </div>

          {/* Text content - order changes on mobile */}
          <div className="text-center lg:text-left lg:order-1">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-gray-50/80 backdrop-blur-sm rounded-full px-3 py-1.5 mb-5 md:mb-6 border border-gray-200/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-gray-700 tracking-wide">Direct from our kitchen</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.2] mb-4">
              Great food
              <span className="block text-orange-600">delivered fast</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-7 md:mb-9 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Order directly from our own signature kitchen and branch network. 
              Same brand quality, every single order.
            </p>

            {/* Buttons - fully responsive */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10 md:mb-12">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
              >
                Order now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-full text-sm sm:text-base md:text-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Create account
              </Link>
            </div>

            {/* Stats - responsive grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto lg:mx-0">
              {highlights.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{stat.icon}</div>
                  <div className="text-base sm:text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
