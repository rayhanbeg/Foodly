const features = [
  { icon: '⚡', title: 'Lightning delivery', desc: 'Real-time rider tracking and fastest routes.' },
  { icon: '🍱', title: 'Freshly prepared', desc: 'Partner kitchens prepare every order on demand.' },
  { icon: '🏷️', title: 'Smart deals', desc: 'Get exclusive discounts and loyalty rewards.' }
]

export default function WhyFoodlySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-fluid">
        <h2 className="font-display text-4xl font-bold text-center mb-3">Why FOODLY works</h2>
        <p className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto">
          Minimal steps, faster meals, and a smooth experience from browsing to delivery.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div
              key={feature.title}
              className="card p-8 text-center border border-neutral-200 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2 text-neutral-900">{feature.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
