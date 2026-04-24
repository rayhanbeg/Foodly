import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
void motion

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

  const values = [
    { title: 'Quality', desc: 'We vet every kitchen and ingredient.', icon: '🔍' },
    { title: 'Speed', desc: 'Average delivery under 30 minutes.', icon: '⏱️' },
    { title: 'Care', desc: '24/7 support, real human help.', icon: '💛' },
    { title: 'Planet', desc: 'Carbon‑neutral deliveries by 2025.', icon: '🌱' },
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
      {/* Minimal Hero with "About" tag */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-orange-600 text-sm font-mono tracking-wider">// about</span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-4 mb-4">
              We deliver more than just food
            </h1>
            <div className="w-16 h-0.5 bg-orange-500 mx-auto mb-6" />
            <p className="text-gray-600 text-base">
              Foodly was born from a simple idea: great food should feel effortless. 
              Since 2020, we've been connecting local kitchens with hungry neighbors — 
              faster, fresher, and with a whole lot of care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats – simple centered numbers */}
      <section ref={statsRef} className="py-12 border-t border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <div className="text-xl md:text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide text-gray-500 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.suffix}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision – simple two columns */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To make quality food accessible to everyone — by partnering with the best local kitchens 
                and delivering with speed, transparency, and a smile.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most loved food delivery brand — where every order feels like a gift, 
                and every meal brings people together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values – simple card grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">What drives us</h2>
            <p className="text-gray-500 mt-2">Four principles, one promise.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-3">{value.icon}</div>
                <h3 className="text-base font-bold text-gray-900">{value.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team – simple cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">The faces behind Foodly</h2>
            <p className="text-gray-500 mt-2">Real people, real passion.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-sm transition"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-base font-bold text-gray-900">{person.name}</h3>
                  <p className="text-orange-600 text-sm font-medium mt-1">{person.role}</p>
                  <p className="text-gray-500 text-sm mt-3">{person.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="border-t border-gray-100 py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to taste the difference?</h2>
          <p className="text-gray-500 mb-6">Join thousands of happy customers — order now and get 20% off your first meal.</p>
          <button
            onClick={() => navigate('/menu')}
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition"
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
