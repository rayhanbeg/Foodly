import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 text-white">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-white/10 blur-3xl rounded-full opacity-40" />

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
          Ready for your next
          <span className="block text-orange-100">
            delicious bite?
          </span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Join FOODLY today, explore top-rated meals, and enjoy fast delivery
          straight to your doorstep — fresh, hot, and on time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          
          <Link
            to="/menu"
            className="w-full sm:w-auto bg-white text-orange-600 px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg shadow-orange-700/20 hover:bg-orange-50 transition-all"
          >
            Start Ordering
          </Link>

          <Link
            to="/register"
            className="w-full sm:w-auto border border-white/40 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
          >
            Create Account
          </Link>

        </div>
      </div>
    </section>
  );
}