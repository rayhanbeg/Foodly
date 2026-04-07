import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function About() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  const stats = [
    { value: '5+', label: 'years', suffix: 'of excellence' },
    { value: '200k+', label: 'customers', suffix: 'happy & fed' },
    { value: '50+', label: 'partners', suffix: 'local kitchens' },
    { value: '30', label: 'minutes', suffix: 'avg delivery' },
  ];

  const milestones = [
    { year: '2020', title: 'Foodly founded', description: 'Started with a single kitchen and big dreams.' },
    { year: '2021', title: 'First 10k orders', description: 'Reached our first milestone, thanks to you.' },
    { year: '2022', title: '3 branches opened', description: 'Expanded across the city for faster service.' },
    { year: '2024', title: 'Eco‑first packaging', description: '100% compostable boxes and bags.' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Former chef turned entrepreneur. Believes food is love.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Culinary',
      bio: 'Classically trained, obsessed with flavor & freshness.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Emma Davis',
      role: 'Customer Experience',
      bio: 'Ensures every delivery brings a smile.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero – clean, text‑driven, no generic image */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-transparent" />
        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-orange-600 text-sm font-mono tracking-wider">// about</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mt-4 leading-[1.1]">
              We deliver more<br />than just food.
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed max-w-xl">
              Foodly was born from a simple idea: great food should feel effortless. 
              Since 2020, we've been connecting local kitchens with hungry neighbors — 
              faster, fresher, and with a whole lot of care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats – clean, minimal, with subtle icons */}
      <section ref={statsRef} className="py-12 border-t border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide text-gray-500 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two‑column mission/vision with subtle asymmetry */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="sticky top-32">
                <div className="w-12 h-px bg-orange-500 mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mission</h2>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  To make quality food accessible to everyone — by partnering with the best local kitchens 
                  and delivering with speed, transparency, and a smile.
                </p>
              </div>
            </div>
            <div>
              <div className="sticky top-32">
                <div className="w-12 h-px bg-orange-500 mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Vision</h2>
                <p className="text-gray-600 text-lg mt-4 leading-relaxed">
                  To become the most loved food delivery brand — where every order feels like a gift, 
                  and every meal brings people together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline – brand journey */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our journey</h2>
            <p className="text-gray-500 mt-2">From a single kitchen to your doorstep</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-300" />
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="flex-1 md:text-right pl-10 md:pl-0">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <span className="text-orange-600 font-mono text-sm">{item.year}</span>
                    <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-white border-2 border-orange-500 rounded-full -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-bold text-orange-600">
                  {idx + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values – card grid with custom icons (no emojis) */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What drives us</h2>
            <p className="text-gray-500 mt-2">Four principles, one promise.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Quality', desc: 'We vet every kitchen and ingredient.', icon: '🔍' },
              { title: 'Speed', desc: 'Average delivery under 30 minutes.', icon: '⏱️' },
              { title: 'Care', desc: '24/7 support, real human help.', icon: '💛' },
              { title: 'Planet', desc: 'Carbon‑neutral deliveries by 2025.', icon: '🌱' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team – modern, clean cards with role & bio */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The faces behind Foodly</h2>
            <p className="text-gray-500 mt-2">Real people, real passion.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-orange-600 text-sm font-medium mt-1">{person.role}</p>
                  <p className="text-gray-500 text-sm mt-3">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – minimal, confident, no heavy background */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to taste the difference?</h2>
          <p className="text-gray-500 text-lg mt-4 mb-8">
            Join thousands of happy customers — order now and get 20% off your first meal.
          </p>
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition shadow-md hover:shadow-lg"
          >
            Explore menu
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;