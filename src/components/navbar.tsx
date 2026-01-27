import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Services", sectionId: "services" },
    { label: "Why Choose", sectionId: "why-choose" },
    { label: "Testimonials", sectionId: "testimonials" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                if (location.pathname !== "/") {
                  navigate("/");
                  return;
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2 group transition-all duration-300 ease-out">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 ease-out group-hover:scale-110">
                <span className="text-white font-bold text-lg sm:text-xl">HH</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#0A4D8C] transition-colors duration-300 ease-out hidden min-[380px]:inline">
                HomeHealthHero
              </span>
              <span className="text-lg font-bold text-gray-900 group-hover:text-[#0A4D8C] transition-colors duration-300 ease-out min-[380px]:hidden">
                HHH
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/about"
              className="text-gray-700 hover:text-[#0A4D8C] font-medium transition-all duration-300 ease-out relative group text-sm lg:text-base whitespace-nowrap hover:scale-105">
              About
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#0A4D8C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </Link>
            {navLinks.map((link) => (
              <button
                key={link.sectionId}
                onClick={() => scrollToSection(link.sectionId)}
                className="text-gray-700 hover:text-[#0A4D8C] font-medium transition-all duration-300 ease-out relative group text-sm lg:text-base whitespace-nowrap hover:scale-105">
                {link.label}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#0A4D8C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </button>
            ))}
            <Link
              to="/contact"
              className="text-gray-700 hover:text-[#0A4D8C] font-medium transition-all duration-300 ease-out relative group text-sm lg:text-base whitespace-nowrap hover:scale-105">
              Contact Us
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#0A4D8C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#3B63F6] hover:bg-[#2D4FD8] text-white px-4 lg:px-6 py-2 font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:scale-105 text-sm lg:text-base">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#0A4D8C] transition-all duration-300 ease-out p-2 -mr-2 touch-manipulation hover:scale-110"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <div className="px-4 py-4 sm:py-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollToSection(link.sectionId)}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-[#0A4D8C] hover:bg-[#0A4D8C]/5 rounded-lg font-medium transition-all duration-300 ease-out touch-manipulation active:scale-95 hover:scale-[1.02] hover:shadow-sm">
              {link.label}
            </button>
          ))}
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:text-[#0A4D8C] hover:bg-[#0A4D8C]/5 rounded-lg font-medium transition-all duration-300 ease-out touch-manipulation active:scale-95 hover:scale-[1.02] hover:shadow-sm">
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:text-[#0A4D8C] hover:bg-[#0A4D8C]/5 rounded-lg font-medium transition-all duration-300 ease-out touch-manipulation active:scale-95 hover:scale-[1.02] hover:shadow-sm">
            Contact Us
          </Link>
          <Button
            onClick={() => scrollToSection("contact")}
            className="w-full bg-[#3B63F6] hover:bg-[#2D4FD8] text-white px-6 py-3 font-semibold rounded-lg shadow-md mt-2 touch-manipulation active:scale-95 transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.02]">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};
