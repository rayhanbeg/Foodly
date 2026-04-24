import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-50 mt-16">
      <div className="container-fluid py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
           {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffb400] text-lg font-bold text-[#0f1724]">
                🍽
              </span>
              <span className="">
                <span className="block text-base font-bold leading-none text-white">
                  FOODLY
                </span>
                <span className="block text-xs text-neutral-400">
                  Fresh meals, delivered fast
                </span>
              </span>
            </Link>

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
                <Link to="/about" className="text-neutral-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-neutral-100 mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral-400 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
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
            &copy; 2026 FOODLY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
