import { motion } from 'framer-motion';

function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <section className="section container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900">Terms & Conditions</h1>
          <div className="prose prose-base max-w-none text-gray-700 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By using the Foodly platform and services, you agree to comply with and be bound by these Terms & Conditions. 
                If you do not agree with any part of these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account information and password. 
                You agree to accept responsibility for all activities that occur under your account. You must notify us 
                immediately of any unauthorized use of your account.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Order Placement</h2>
              <p>
                All orders placed through Foodly are subject to acceptance and confirmation. We reserve the right to refuse 
                or cancel any order. Orders are confirmed when you receive an order confirmation notification.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
              <p>
                Payment must be made before or upon delivery. We accept multiple payment methods as specified during checkout. 
                All prices are in USD and include applicable taxes. Additional charges may apply for special requests or locations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Delivery</h2>
              <p>
                We strive to deliver your order within the estimated time. However, we are not liable for delays caused by 
                factors beyond our control (traffic, weather, etc.). You must provide a valid delivery address.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Cancellation & Refunds</h2>
              <p>
                Orders can be cancelled within 5 minutes of placement. Refunds will be processed to the original payment method. 
                For other refund requests, please contact our support team within 48 hours of delivery.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. User Conduct</h2>
              <p>
                You agree not to engage in any illegal activities, harassment, or abuse through our platform. 
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Liability Limitation</h2>
              <p>
                To the maximum extent permitted by law, Foodly shall not be liable for indirect, incidental, special, 
                consequential, or punitive damages arising from your use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Third-Party Content</h2>
              <p>
                Foodly is not responsible for the quality or safety of food provided by restaurant partners. 
                Each restaurant is responsible for compliance with food safety regulations.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our services indicates acceptance 
                of the updated terms. Please review this page regularly for changes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
              <p>
                These Terms & Conditions are governed by and construed in accordance with the laws of your jurisdiction, 
                and you irrevocably submit to the exclusive jurisdiction of the courts located in that jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:
                <br />
                <br />
                Email: support@foodly.com
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
export default Terms