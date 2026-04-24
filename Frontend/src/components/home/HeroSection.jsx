import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative border-b border-neutral-900/20 min-h-[45vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] flex items-center">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dolcergq1/image/upload/v1777034460/ZgHRpaJ4TryrNg6xr6Sopvza6meJ2DtuT7kvwIY8-t_sfiqW9iJsD7BzqLU0FA82pvx-vsN9GetbgtW5ten8swUfoYMMRM-VEg0YYHOzOIeqne0VjeGefPQnqZRBuTsdbfInbzVOILXv6YUlo5_QK11DQ7HGnnOVprbSyLjP3vmIr2wh0t7rBsR7m-pDFOM9_j4g4zl.jpg"
          alt="Fresh food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* Badge */}
          <p className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] sm:text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm">
            MODERN FOOD DELIVERY
          </p>

          {/* Heading */}
          <h1 className="mt-4 font-semibold text-white leading-tight 
            text-[clamp(22px,5vw,42px)] max-w-2xl mx-auto">
            Clean flavors, fast delivery,
            <span className="text-[#ffb400]"> zero hassle.</span>
          </h1>

          {/* Description */}
          <p className="mt-4 text-white/80 
            text-[13px] sm:text-sm md:text-base 
            max-w-md sm:max-w-lg mx-auto leading-relaxed">
            Chef-crafted meals with a smooth and fast ordering experience.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center items-center gap-3 w-full sm:w-auto">

            <Link
              to="/menu"
              className="w-full sm:w-auto h-10 lg:h-14 px-6 rounded-full bg-[#ffb400] text-sm font-medium text-[#0f1724] flex items-center justify-center hover:brightness-95 transition"
            >
              Browse Menu
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto h-10 lg:h-14 px-6 rounded-full border border-white/20 text-sm font-medium text-white flex items-center justify-center hover:bg-white/10 transition"
            >
              Create Account
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}