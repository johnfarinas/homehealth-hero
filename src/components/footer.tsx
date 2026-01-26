import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.footer
      id="contact"
      className="bg-[#0A4D8C] text-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={fadeInUp}>
      {/* Subtle Background Patterns and Textures */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-20"></div>

        {/* Hexagonal Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yOCAwTDU2IDE2LjY2N1Y1MC4wMDFMNTYgODMuMzM0TDI4IDEwMEwwIDgzLjMzNFY1MC4wMDFWMTYuNjY3TDI4IDBaIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>

        {/* Gradient Orbs for Depth */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#00A9A5]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#3B63F6]/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl"></div>

        {/* Subtle Dot Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjA2Ii8+PC9zdmc+')]  opacity-50"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12"
          variants={staggerContainer}>
          {/* Column 1: About */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <div className="mb-5 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">HomeHealthHero</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Empowering home health and hospice agencies with expert back-office support and clinical excellence.
              </p>
            </div>
            {/* Social Media Links */}
            <div className="flex gap-3 sm:gap-4 mt-6">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#0A4D8C] flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 touch-manipulation active:scale-95"
                aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#0A4D8C] flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 touch-manipulation active:scale-95"
                aria-label="Twitter/X">
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-[#0A4D8C] flex items-center justify-center transition-all duration-300 ease-out transform hover:scale-110 touch-manipulation active:scale-95"
                aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Services */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  OASIS & HIS Coding
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  Clinical Documentation QA
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  Revenue Cycle Management
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  Virtual Admin Support
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Resources */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#case-studies"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-gray-200 hover:text-white hover:translate-x-1 transition-all duration-300 ease-out text-sm inline-block touch-manipulation">
                  Careers
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h4 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6">Contact</h4>
            <div className="space-y-4">
              {/* Skokie Office */}
              <div>
                <p className="text-xs font-semibold text-gray-300 mb-2">Skokie Office</p>
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#00A9A5] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-200 text-sm leading-relaxed">
                    9933 Lawler Ave. Ste. 332
                    <br />
                    Skokie, IL 60077
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#00A9A5] mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:1-312-889-0670"
                    className="text-gray-200 hover:text-white transition-all duration-300 ease-out text-sm touch-manipulation">
                    1 (312) 889-0670
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#00A9A5] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:solutions@homehealthhero.com"
                  className="text-gray-200 hover:text-white transition-all duration-300 ease-out text-sm break-words touch-manipulation">
                  solutions@homehealthhero.com
                </a>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#hero"
                  className="inline-block w-full text-center bg-[#3B63F6] hover:bg-[#2D4FD8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3B63F6]/30 touch-manipulation active:scale-95">
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-200 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} HomeHealthHero. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#privacy"
                className="text-gray-200 hover:text-white transition-all duration-300 ease-out whitespace-nowrap touch-manipulation hover:translate-x-1 inline-block">
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-gray-200 hover:text-white transition-all duration-300 ease-out whitespace-nowrap touch-manipulation hover:translate-x-1 inline-block">
                Terms of Service
              </a>
              <a
                href="#hipaa"
                className="text-gray-200 hover:text-white transition-all duration-300 ease-out whitespace-nowrap touch-manipulation hover:translate-x-1 inline-block">
                HIPAA Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
