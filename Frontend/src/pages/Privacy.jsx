import { motion } from 'framer-motion';

function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <section className="section container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
          <div className="prose prose-base max-w-none text-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                At Foodly, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our website and mobile application.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Platform includes:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li><strong>Personal Data:</strong> Name, email address, phone number, delivery address, payment information</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, orders placed, preferences, feedback</li>
                <li><strong>Location Data:</strong> GPS coordinates for delivery purposes (with your consent)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Use of Information</h2>
              <p>Foodly uses the collected information for various purposes:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>To process your orders and payments</li>
                <li>To arrange delivery to your address</li>
                <li>To communicate with you about your orders and account</li>
                <li>To improve our services and user experience</li>
                <li>To comply with legal obligations</li>
                <li>To prevent fraud and ensure security</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Data Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. However, we may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Restaurant partners (name, delivery address, order details)</li>
                <li>Delivery personnel (delivery address, phone number)</li>
                <li>Payment processors (payment information)</li>
                <li>Service providers who assist us in operating our platform</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Cookies & Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences 
                through your browser settings. Some features may not function properly if cookies are disabled.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request portability of your data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Retention of Data</h2>
              <p>
                We retain your personal data for as long as necessary to provide our services and fulfill the purposes outlined 
                in this policy. You may request deletion of your data at any time, subject to legal requirements.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p>
                Our Platform is not directed to children under 13. We do not knowingly collect personal information from 
                children. If we become aware of such collection, we will delete it immediately.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Third-Party Links</h2>
              <p>
                Our Platform may contain links to third-party websites. We are not responsible for the privacy practices of 
                these external sites. Please review their privacy policies before providing any information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Policy Changes</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant changes via email or 
                prominent notice on our Platform. Your continued use of our services indicates acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices:
                <br />
                <br />
                Email: privacy@foodly.com
                <br />
                Phone: +1 (555) 123-4567
                <br />
                Address: 123 Food Street, Downtown, City 10001
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Last updated: January 2024
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
export default Privacy