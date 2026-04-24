import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
void motion;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/contact", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: (
        <svg
          className="w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Visit us",
      value: "123 Food Street, Downtown, City 10001",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call us",
      value: "+1 (555) 123-4567",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email us",
      value: "support@foodly.com",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Open hours",
      value: "10 AM – 11 PM, 7 days a week",
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
          ><span className="text-orange-600 text-sm font-mono tracking-wider">// Contact</span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mt-4 mb-4">
              Let’s talk
            </h1>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-6" />
            <p className="text-neutral-600 text-base">
              Have a question, feedback, or just want to say hello? We’d love to
              hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info – simple rows */}
      <section className="pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="space-y-4">
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 py-3 border-b border-neutral-200"
              >
                <div className="flex-shrink-0 mt-0.5">{method.icon}</div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wide">
                    {method.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mt-1">
                    {method.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section – minimal */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="border border-neutral-200 rounded-xl overflow-hidden">
            <iframe
              title="Foodly location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb5e8a3%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1644262074647!5m2!1sen!2sus"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full"
            />
          </div>
          <p className="text-center text-neutral-500 text-xs mt-3">
            123 Food Street, Downtown, City 10001
          </p>
        </div>
      </section>

      {/* Contact Form – minimal */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="border-t border-neutral-200 pt-10">
            <h2 className="text-lg font-semibold text-neutral-900 mb-6">
              Send us a message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                  ✓ Thank you! We’ll get back to you soon.
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone number (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="+1 234 567 890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Minimal bottom note */}
      <section className="border-t border-neutral-200 py-12 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-neutral-500 text-sm">
            Prefer instant help? Call us at{" "}
            <span className="text-neutral-900 font-medium">
              +1 (555) 123-4567
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
