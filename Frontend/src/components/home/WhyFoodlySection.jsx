const features = [
  {
    icon: "⚡",
    title: "Lightning delivery",
    desc: "Real-time rider tracking with optimized routes for faster delivery.",
  },
  {
    icon: "🍱",
    title: "Freshly prepared",
    desc: "Every meal is cooked on demand by our in-house chefs at Foodly branches.",
  },
  {
    icon: "🏷️",
    title: "Smart deals",
    desc: "Enjoy exclusive discounts, offers, and loyalty rewards.",
  },
];

 function WhyFoodlySection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-orange-50/40 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] h-[250px] sm:h-[300px] bg-orange-100 blur-3xl opacity-40 rounded-full" />

      <div className="container-fluid relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-orange-600 mb-2 sm:mb-3 tracking-wide">
            WHY CHOOSE FOODLY
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight">
            Built for speed, quality,
            <span className="block text-orange-600">
              and convenience
            </span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            FOODLY simplifies your food ordering experience — from browsing menus
            to fast doorstep delivery.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-orange-50 text-xl sm:text-2xl mb-4 sm:mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {feature.desc}
              </p>

              {/* Hover Bottom Line */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-orange-500 group-hover:w-full transition-all duration-300 rounded-b-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default WhyFoodlySection
