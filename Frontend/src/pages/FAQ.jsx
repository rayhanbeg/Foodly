import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
void motion;

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Browse our menu, add items to your cart, proceed to checkout, and confirm your delivery address. You can pay via card or cash on delivery.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Typical delivery times are 30-45 minutes depending on your location and order complexity. You can track your order in real-time.',
    },
    {
      question: 'What are your delivery charges?',
      answer: 'Delivery charges are typically $5. Orders over $50 get free delivery. Charges may vary by location.',
    },
    {
      question: 'Can I modify my order after placing it?',
      answer: 'You can modify your order within 5 minutes of placing it. After that, please contact our support team immediately.',
    },
    {
      question: 'Do you offer vegetarian options?',
      answer: 'Yes! We have a wide range of vegetarian and vegan options available. Filter by dietary preferences in the menu.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, digital wallets, and cash on delivery. All payments are secure and encrypted.',
    },
    {
      question: 'Can I schedule an order for later?',
      answer: 'Yes, you can schedule your order up to 7 days in advance during checkout.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time through your account. You’ll receive updates on preparation, dispatch, and delivery.',
    },
    {
      question: 'What if I receive the wrong order?',
      answer: 'Contact us immediately with photos. We’ll send the correct order right away and arrange a full refund.',
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your personal and payment information.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          ><span className="text-orange-600 text-sm font-mono tracking-wider">// FAQ</span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-4 mb-4">
              Frequently Asked Questions
            </h1>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-neutral-600 text-base">
              Everything you need to know about Foodly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion – Minimal */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="border-b border-neutral-200"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-base md:text-base font-medium text-neutral-900 pr-4 group-hover:text-amber-600 transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 transition-all duration-200 ${
                      openIndex === idx ? 'rotate-45 text-amber-500' : ''
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pb-5"
                    >
                      <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal CTA */}
      <section className="border-t border-neutral-200 py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Still have questions?</h2>
          <p className="text-neutral-500 mb-6">We're here to help – just reach out.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-neutral-800 transition"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default FAQ;