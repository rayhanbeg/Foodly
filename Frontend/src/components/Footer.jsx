import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-50 mt-16">
      <div className="container-fluid py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-primary mb-4">FOODLY</h3>
            <p className="text-neutral-400">
              Your favorite food delivered right to your door. Fast, fresh, and delicious!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-100 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-neutral-400 hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-neutral-100 mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-neutral-100 mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>📧 support@foodly.com</li>
              <li>📞 +1 234 567 8900</li>
              <li>📍 123 Food Street, City</li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="hover:text-primary transition-colors">FB</a>
                <a href="#" className="hover:text-primary transition-colors">TW</a>
                <a href="#" className="hover:text-primary transition-colors">IG</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 pt-8">
          <p className="text-center text-neutral-400">
            &copy; 2024 FOODLY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
