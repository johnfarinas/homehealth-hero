import { useList } from "@refinedev/core";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  FileText,
  Target,
  Clock,
  Play,
  ClipboardCheck,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Quote,
  Shield,
  Scale,
  Award,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MessageSquare,
  Plug,
  Zap,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import type { HeroContent, Statistic, Service, Testimonial } from "@/types";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { VideoModal } from "@/components/video-modal";

const iconMap = {
  "Certified Coders": Users,
  "Charts Processed": FileText,
  "Accuracy Rate": Target,
  "Average TAT": Clock,
};

export const LandingPage = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { query: heroQuery } = useList<HeroContent>({
    resource: "hero-content",
  });

  const { query: statsQuery } = useList<Statistic>({
    resource: "statistics",
  });

  const { query: servicesQuery } = useList<Service>({
    resource: "services",
  });

  const { query: testimonialsQuery } = useList<Testimonial>({
    resource: "testimonials",
  });

  const hero = heroQuery.data?.data?.[0];
  const stats = statsQuery.data?.data || [];
  const services = servicesQuery.data?.data || [];
  const testimonials = testimonialsQuery.data?.data || [];

  const isHeroLoading = heroQuery.isLoading;
  const isStatsLoading = statsQuery.isLoading;
  const isServicesLoading = servicesQuery.isLoading;
  const isTestimonialsLoading = testimonialsQuery.isLoading;

  // Smooth scroll function for CTA button
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace("#", "");
    if (!sectionId) return;

    requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  }, [location.hash]);

  // Map icon names to lucide-react components
  const serviceIconMap: Record<string, React.ElementType> = {
    "clipboard-check": ClipboardCheck,
    "shield-check": ShieldCheck,
    "trending-up": TrendingUp,
    users: Users,
  };

  // Pastel background colors for each service card
  const pastelBackgrounds = [
    "bg-yellow-50", // Pale yellow
    "bg-purple-50", // Light purple
    "bg-green-50", // Mint green
    "bg-blue-50", // Soft blue
  ];

  // Animation variants for fade-in
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animated counter hook
  const useCounter = (end: number, duration: number = 2000, shouldStart: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!shouldStart) return;

      let startTime: number | null = null;
      const startValue = 0;
      const hasDecimals = end % 1 !== 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentValue = startValue + (end - startValue) * easeOutQuart;

        // If the end value has decimals, preserve them during animation
        if (hasDecimals) {
          setCount(parseFloat(currentValue.toFixed(1)));
        } else {
          setCount(Math.floor(currentValue));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, [end, duration, shouldStart]);

    return count;
  };

  // Intersection Observer for stats animation
  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(statsRef.current);

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  // Helper to parse numeric value from stat
  const parseStatValue = (value: string): { numeric: number; suffix: string; prefix: string } => {
    // Updated regex to handle decimal numbers like 99.2
    const match = value.match(/^(\D*)(\d+(?:,\d+)*(?:\.\d+)?)(\D*)$/);
    if (match) {
      const prefix = match[1];
      const numericPart = parseFloat(match[2].replace(/,/g, ""));
      const suffix = match[3];
      return { numeric: numericPart, suffix, prefix };
    }
    return { numeric: 0, suffix: value, prefix: "" };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Video Modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A4D8C] via-[#00A9A5] to-[#0A4D8C] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 overflow-hidden">
        {/* Geometric Background Patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Circle - Top Right */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

          {/* Medium Circle - Bottom Left */}
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#3B63F6]/10 rounded-full blur-2xl"></div>

          {/* Small Circles - Scattered */}
          <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#3B63F6]/5 rounded-full blur-lg"></div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVbml0zPSJ1c2VyU3BhY2VPblVzZSIgZGF0YS10cmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkaWFnb25hbCkiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>

          {/* Healthcare Heartbeat Line Pattern */}
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDQwIEwzMCA0MCBMNDAgMjAgTDUwIDYwIEw2MCA0MCBMMjAwIDQwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgIHBhdHRlcm5Vbml0zPSJ1c2VyU3BhY2VPblVzZSIgZGF0YS10cmFuc2Zvcm09InJvdGF0ZSg0NSkiLz48L3N2Zz4=')] opacity-30 bg-repeat-x animate-pulse"
            style={{ animationDuration: "4s" }}></div>

          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0iIzBBNEQ4QyIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-40 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left">
              {isHeroLoading ? (
                <>
                  <Skeleton className="h-16 sm:h-20 md:h-24 w-full mb-6 bg-white/20" />
                  <Skeleton className="h-10 sm:h-12 w-4/5 mx-auto lg:mx-0 mb-8 bg-white/20" />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <Skeleton className="h-14 w-56 bg-white/20" />
                    <Skeleton className="h-14 w-56 bg-white/20" />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
                    {hero?.headline || "Empowering Home Health & Hospice Agencies with Clinical Excellence"}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 md:mb-10 leading-relaxed font-medium drop-shadow-lg">
                    {hero?.subheadline ||
                      "We provide the expert back-office support you need to focus on what matters most—patient care. Experience seamless coding, rigorous QA, and optimized revenue cycles."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("contact")}
                      className="w-full sm:w-auto bg-white text-[#0A4D8C] hover:bg-white/95 px-8 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105">
                      {hero?.ctaPrimary || "Connect With Us"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="w-full sm:w-auto border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/60 px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300 ease-out flex items-center justify-center gap-2 hover:scale-105 shadow-lg">
                      <Play className="w-5 h-5 fill-white" />
                      {hero?.ctaSecondary || "Play Video"}
                    </Button>
                  </div>
                </>
              )}
            </motion.div>

            {/* Right Side - Professional Female Virtual Health Assistant Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                {/* Main Image Container with Enhanced Glassmorphism Frame */}
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-2 border-white/30 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-ping animation-duration-3000"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#3B63F6]/20 rounded-full animate-ping animation-duration-4000"></div>
                  </div>

                  {/* Professional Female Virtual Health Assistant Image */}
                  <div className="relative w-full h-full p-4 sm:p-6">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent">
                      {/* Optimized Image with better loading strategy */}
                      <img
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Professional female virtual health assistant providing expert healthcare support with a friendly smile"
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                        loading="eager"
                        fetchPriority="high"
                      />
                      {/* Enhanced gradient overlay for better text integration and visual depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A4D8C]/30 via-transparent to-white/10 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#00A9A5]/10 via-transparent to-[#0A4D8C]/10 pointer-events-none"></div>

                      {/* Enhanced Trust Badge Overlay with better contrast */}
                      <div className="absolute bottom-4 left-4 right-4 bg-white/98 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/50 transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-grow">
                            <div className="text-sm font-bold text-gray-900 leading-tight">HIPAA Certified Team</div>
                            <div className="text-xs text-gray-600 font-medium">Trusted by 500+ Agencies</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Decorative Elements Around Container */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#3B63F6]/30 rounded-full blur-xl animate-pulse animation-duration-3000"></div>
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/20 rounded-full blur-xl animate-pulse animation-duration-4000"></div>

                {/* Additional accent glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0A4D8C]/20 via-transparent to-[#00A9A5]/20 blur-2xl -z-10 opacity-50"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* HIPAA Compliant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg border border-white/60 hover:bg-white/90 hover:backdrop-blur-md transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A4D8C]/10 flex items-center justify-center mb-3 group-hover:bg-[#0A4D8C]/20 transition-colors duration-300">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A4D8C]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center">HIPAA Compliant</span>
            </motion.div>

            {/* SOC 2 Type II */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg border border-white/60 hover:bg-white/90 hover:backdrop-blur-md transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00A9A5]/10 flex items-center justify-center mb-3 group-hover:bg-[#00A9A5]/20 transition-colors duration-300">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A9A5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center">SOC 2 Type II</span>
            </motion.div>

            {/* ISO 27001 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg border border-white/60 hover:bg-white/90 hover:backdrop-blur-md transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0A4D8C]/10 flex items-center justify-center mb-3 group-hover:bg-[#0A4D8C]/20 transition-colors duration-300">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A4D8C]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center">ISO 27001</span>
            </motion.div>

            {/* NCQA Certified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg border border-white/60 hover:bg-white/90 hover:backdrop-blur-md transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#00A9A5]/10 flex items-center justify-center mb-3 group-hover:bg-[#00A9A5]/20 transition-colors duration-300">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#00A9A5]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-900 text-center">NCQA Certified</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section
        ref={statsRef}
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F2F7FB] via-white to-[#EFFAF8] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0A4D8C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#00A9A5]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#F39A3D]/6 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {isStatsLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="text-center p-6 sm:p-8">
                    <div className="flex justify-center mb-4 sm:mb-6">
                      <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl" />
                    </div>
                    <Skeleton className="h-12 w-24 mx-auto mb-3" />
                    <Skeleton className="h-5 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-40 mx-auto hidden sm:block" />
                  </div>
                ))
              : stats.map((stat: Statistic, index: number) => {
                  const IconComponent = iconMap[stat.label as keyof typeof iconMap] || Target;
                  const { numeric, suffix, prefix } = parseStatValue(stat.value);

                  return (
                    <AnimatedStatCard
                      key={stat.id}
                      stat={stat}
                      icon={IconComponent}
                      numericValue={numeric}
                      suffix={suffix}
                      prefix={prefix}
                      shouldAnimate={hasAnimated}
                      index={index}
                    />
                  );
                })}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <motion.section
        id="services"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInUp}>
        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDAgTCA4MCAwIEwgODAgODAgTCAwIDgwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBBNEQ4QyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

        {/* Subtle Circular Gradients */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#0A4D8C]/3 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00A9A5]/3 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">Our Services</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Comprehensive back-office solutions designed specifically for home health and hospice agencies
            </p>
          </div>

          {/* Services Grid */}
          {isServicesLoading ? (
            <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-sm">
                  <Skeleton className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-4 sm:mb-5" />
                  <Skeleton className="h-6 w-3/4 mb-2 sm:mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4 sm:mb-6" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              variants={staggerContainer}>
              {services.map((service, index) => {
                const IconComponent = serviceIconMap[service.icon] || Target;

                return (
                  <motion.div
                    key={service.id}
                    variants={fadeInUp}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="group relative">
                    {/* Multi-layer Glow Effect */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#0A4D8C]/0 via-[#00A9A5]/0 to-[#0A4D8C]/0 opacity-0 group-hover:from-[#0A4D8C]/20 group-hover:via-[#00A9A5]/20 group-hover:to-[#0A4D8C]/20 group-hover:opacity-100 blur-xl transition-all duration-700 ease-out"></div>
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#0A4D8C]/0 to-[#00A9A5]/0 opacity-0 group-hover:from-[#0A4D8C]/30 group-hover:to-[#00A9A5]/30 group-hover:opacity-100 blur-md transition-all duration-700 ease-out"></div>

                    <div className="relative bg-white rounded-3xl border border-gray-200/80 p-7 sm:p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(10,77,140,0.15),0_10px_20px_rgba(0,169,165,0.1),0_4px_8px_rgba(0,0,0,0.05)] transition-all duration-700 ease-out transform hover:-translate-y-3 hover:scale-[1.03] group-hover:border-[#0A4D8C]/30 flex flex-col h-full">
                      {/* Icon Container with Gradient Background */}
                      <div className="relative mb-6 sm:mb-7">
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0A4D8C] via-[#00A9A5] to-[#0A4D8C] p-[2px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-lg group-hover:shadow-[0_10px_30px_rgba(10,77,140,0.4),0_5px_15px_rgba(0,169,165,0.3)]">
                          <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#0A4D8C]/5 group-hover:to-[#00A9A5]/5 transition-all duration-700">
                            <IconComponent className="w-9 h-9 sm:w-10 sm:h-10 text-[#0A4D8C] group-hover:text-[#00A9A5] transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-6" />
                          </div>
                        </div>
                        {/* Icon Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-700 ease-out -z-10"></div>
                      </div>

                      {/* Title with Better Typography */}
                      <h3 className="text-xl sm:text-[22px] font-bold text-gray-900 mb-3 sm:mb-4 leading-tight group-hover:text-[#0A4D8C] transition-colors duration-500">
                        {service.title}
                      </h3>

                      {/* Description with Improved Line Height */}
                      <p className="text-gray-600 text-sm sm:text-[15px] leading-[1.7] mb-6 sm:mb-8 flex-grow">
                        {service.description}
                      </p>

                      {/* Enhanced Read More Link */}
                      <div className="inline-flex items-center text-[#0A4D8C] font-bold text-sm sm:text-[15px] group/link cursor-pointer hover:text-[#00A9A5] transition-all duration-300 ease-out">
                        <span className="relative">
                          Learn More
                          {/* Animated Underline */}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#0A4D8C] to-[#00A9A5] group-hover/link:w-full transition-all duration-500 ease-out"></span>
                        </span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-2 group-hover/link:scale-110 transition-all duration-300 ease-out" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* CTA Section 1 - After Services */}
      <motion.section
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A4D8C] via-[#0A4D8C]/95 to-[#00A9A5] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInUp}>
        {/* Glass Overlay Effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3B63F6]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Diagonal Lines Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmci+PGRlZnM+PHBhdHRlcm4gaWQ9ImRpYWdvbmFsIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0zPSJ1c2VyU3BhY2VPblVzZSIgZGF0YS10cmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSI2MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkaWFnb25hbCkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Glass Card Container */}
          <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-10 md:p-12 shadow-2xl">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              variants={fadeInUp}>
              Ready to Transform Your Back-Office Operations?
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed font-medium max-w-3xl mx-auto"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}>
              Join hundreds of agencies who trust us with their clinical documentation
            </motion.p>
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-white text-[#0A4D8C] hover:bg-white/95 px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-bold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0A4D8C]/5 via-white to-[#00A9A5]/5 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInUp}>
        {/* Dots Pattern Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0iIzBBNEQ4QyIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-60 pointer-events-none"></div>

        {/* Subtle Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#00A9A5]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#0A4D8C]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              A simple, proven process to get you started with seamless back-office support
            </p>
          </div>

          {/* Process Steps Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative"
            variants={staggerContainer}>
            {/* Step 1: Consultation */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }} className="relative group">
              {/* Glassmorphism Card with subtle effect */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-white/60 hover:bg-white/95 hover:backdrop-blur-md">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A4D8C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Decorative Corner Border */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-100/50 rounded-bl-3xl opacity-50"></div>

                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-white text-xl sm:text-2xl font-bold">1</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0A4D8C]/10 to-[#00A9A5]/10 flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 ease-out">
                  <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#0A4D8C]" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Consultation</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
                  Initial assessment of your needs and workflows to design a tailored solution for your agency.
                </p>
              </div>

              {/* Arrow Connector - Desktop Only */}
              <div className="hidden lg:block absolute top-1/2 -right-4 xl:-right-6 transform -translate-y-1/2 z-0">
                <ArrowRight className="w-6 h-6 xl:w-8 xl:h-8 text-[#0A4D8C]/40" />
              </div>
            </motion.div>

            {/* Step 2: Integration */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="relative group">
              {/* Glassmorphism Card with subtle effect */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-white/60 hover:bg-white/95 hover:backdrop-blur-md">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9A5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#00A9A5] to-[#0A4D8C] flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-white text-xl sm:text-2xl font-bold">2</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00A9A5]/10 to-[#0A4D8C]/10 flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Plug className="w-8 h-8 sm:w-10 sm:h-10 text-[#00A9A5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Integration</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
                  Seamless onboarding to our systems with secure data transfer and minimal disruption to your
                  operations.
                </p>
              </div>

              {/* Arrow Connector - Desktop Only */}
              <div className="hidden lg:block absolute top-1/2 -right-4 xl:-right-6 transform -translate-y-1/2 z-0">
                <ArrowRight className="w-6 h-6 xl:w-8 xl:h-8 text-[#00A9A5]/40" />
              </div>
            </motion.div>

            {/* Step 3: Execution */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="relative group">
              {/* Glassmorphism Card with subtle effect */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-white/60 hover:bg-white/95 hover:backdrop-blur-md">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A4D8C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-white text-xl sm:text-2xl font-bold">3</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0A4D8C]/10 to-[#00A9A5]/10 flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-[#0A4D8C]" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Execution</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
                  Expert team delivers your services with precision, meeting deadlines and maintaining quality
                  standards.
                </p>
              </div>

              {/* Arrow Connector - Desktop Only */}
              <div className="hidden lg:block absolute top-1/2 -right-4 xl:-right-6 transform -translate-y-1/2 z-0">
                <ArrowRight className="w-6 h-6 xl:w-8 xl:h-8 text-[#00A9A5]/40" />
              </div>
            </motion.div>

            {/* Step 4: Ongoing Support */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="relative group">
              {/* Glassmorphism Card with subtle effect */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-white/60 hover:bg-white/95 hover:backdrop-blur-md">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00A9A5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#00A9A5] to-[#0A4D8C] flex items-center justify-center shadow-xl border-4 border-white z-10">
                  <span className="text-white text-xl sm:text-2xl font-bold">4</span>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#00A9A5]/10 to-[#0A4D8C]/10 flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-[#00A9A5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">Ongoing Support</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
                  Continuous optimization and responsive support to ensure your operations run smoothly at all times.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInUp}>
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#0A4D8C]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#00A9A5]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Trusted by leading home health and hospice agencies nationwide
            </p>
          </div>

          {/* Testimonials Carousel */}
          {isTestimonialsLoading ? (
            <div className="max-w-4xl mx-auto">
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
          ) : testimonials.length > 0 ? (
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <div className="relative group">
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#0A4D8C]/20 via-[#00A9A5]/20 to-[#0A4D8C]/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 ease-out"></div>

                      {/* Card */}
                      <div className="relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 sm:p-10 md:p-12 shadow-lg hover:shadow-2xl border border-gray-200/80 transition-all duration-500 ease-out">
                        {/* Quote Icon */}
                        <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] flex items-center justify-center shadow-xl">
                          <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>

                        {/* Quote Text */}
                        <blockquote className="text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 sm:mb-10 pt-16 sm:pt-20 font-medium italic">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Author Info */}
                        <div className="flex items-center gap-4 sm:gap-6">
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] p-[2px] shadow-lg">
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <span className="text-xl sm:text-2xl font-bold text-[#0A4D8C]">
                                  {testimonial.authorName.charAt(0)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Author Details */}
                          <div className="flex-grow">
                            <div className="font-bold text-gray-900 text-lg sm:text-xl">{testimonial.authorName}</div>
                            <div className="text-gray-600 text-sm sm:text-base">{testimonial.authorTitle}</div>
                            <div className="text-[#0A4D8C] font-semibold text-sm sm:text-base">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>

                        {/* Decorative Accent */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A4D8C] via-[#00A9A5] to-[#0A4D8C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out rounded-b-3xl"></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
                <CarouselPrevious className="static translate-y-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#0A4D8C]/20 hover:bg-[#0A4D8C] hover:border-[#0A4D8C] hover:text-white text-[#0A4D8C] transition-all duration-300 shadow-lg hover:shadow-xl">
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                </CarouselPrevious>
                <CarouselNext className="static translate-y-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-[#0A4D8C]/20 hover:bg-[#0A4D8C] hover:border-[#0A4D8C] hover:text-white text-[#0A4D8C] transition-all duration-300 shadow-lg hover:shadow-xl">
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                </CarouselNext>
              </div>
            </Carousel>
          ) : (
            <div className="text-center text-gray-500">No testimonials available</div>
          )}
        </div>
      </motion.section>

      {/* Why Choose HomeHealthHero Section */}
      <motion.section
        id="why-choose"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInUp}>
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDAgTCA4MCAwIEwgODAgODAgTCAwIDgwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBBNEQ4QyIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00A9A5]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#0A4D8C]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose HomeHealthHero
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              The trusted partner for healthcare agencies seeking excellence
            </p>
          </div>

          {/* Three Key Points Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10" variants={staggerContainer}>
            {/* Point 1: HIPAA Compliant */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.5, ease: "easeOut" }} className="group relative">
              {/* Multi-layer Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#0A4D8C]/0 via-[#00A9A5]/0 to-[#0A4D8C]/0 opacity-0 group-hover:from-[#0A4D8C]/20 group-hover:via-[#00A9A5]/20 group-hover:to-[#0A4D8C]/20 group-hover:opacity-100 blur-xl transition-all duration-700 ease-out"></div>

              <div className="relative bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02] group-hover:border-[#0A4D8C]/30 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] p-[2px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-lg group-hover:shadow-[0_10px_30px_rgba(10,77,140,0.4),0_5px_15px_rgba(0,169,165,0.3)]">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#0A4D8C]/5 group-hover:to-[#00A9A5]/5 transition-all duration-700">
                    <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-[#0A4D8C] group-hover:text-[#00A9A5] transition-all duration-700 ease-out" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#0A4D8C] transition-colors duration-500">
                  HIPAA Compliant
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Your data security is our priority. We maintain strict HIPAA compliance standards to protect patient
                  information and ensure regulatory adherence at every step.
                </p>

                {/* Decorative Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A4D8C] to-[#00A9A5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out rounded-b-3xl"></div>
              </div>
            </motion.div>

            {/* Point 2: Scalable Solutions */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="group relative">
              {/* Multi-layer Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#00A9A5]/0 via-[#0A4D8C]/0 to-[#00A9A5]/0 opacity-0 group-hover:from-[#00A9A5]/20 group-hover:via-[#0A4D8C]/20 group-hover:to-[#00A9A5]/20 group-hover:opacity-100 blur-xl transition-all duration-700 ease-out"></div>

              <div className="relative bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02] group-hover:border-[#00A9A5]/30 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#00A9A5] to-[#0A4D8C] p-[2px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-lg group-hover:shadow-[0_10px_30px_rgba(0,169,165,0.4),0_5px_15px_rgba(10,77,140,0.3)] mb-6">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#00A9A5]/5 group-hover:to-[#0A4D8C]/5 transition-all duration-700">
                    <Scale className="w-10 h-10 sm:w-12 sm:h-12 text-[#00A9A5] group-hover:text-[#0A4D8C] transition-all duration-700 ease-out" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#00A9A5] transition-colors duration-500">
                  Scalable Solutions
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Whether you're a growing startup or an established agency, our flexible solutions scale with your
                  needs—from handling a few charts to thousands monthly.
                </p>

                {/* Decorative Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A9A5] to-[#0A4D8C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out rounded-b-3xl"></div>
              </div>
            </motion.div>

            {/* Point 3: Specialized Expertise */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="group relative">
              {/* Multi-layer Glow Effect */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#0A4D8C]/0 via-[#00A9A5]/0 to-[#0A4D8C]/0 opacity-0 group-hover:from-[#0A4D8C]/20 group-hover:via-[#00A9A5]/20 group-hover:to-[#0A4D8C]/20 group-hover:opacity-100 blur-xl transition-all duration-700 ease-out"></div>

              <div className="relative bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02] group-hover:border-[#0A4D8C]/30 flex flex-col items-center text-center h-full">
                {/* Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] p-[2px] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-lg group-hover:shadow-[0_10px_30px_rgba(10,77,140,0.4),0_5px_15px_rgba(0,169,165,0.3)] mb-6">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#0A4D8C]/5 group-hover:to-[#00A9A5]/5 transition-all duration-700">
                    <Award className="w-10 h-10 sm:w-12 sm:h-12 text-[#0A4D8C] group-hover:text-[#00A9A5] transition-all duration-700 ease-out" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#0A4D8C] transition-colors duration-500">
                  Specialized Expertise
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  Our team consists of certified professionals with deep expertise in home health and hospice
                  documentation, coding, and compliance standards.
                </p>

                {/* Decorative Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A4D8C] to-[#00A9A5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out rounded-b-3xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section 2 - After Testimonials */}
      <motion.section
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#00A9A5] via-[#00A9A5]/95 to-[#0A4D8C] relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        variants={fadeInUp}>
        {/* Glass Overlay Effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0A4D8C]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Cross-hatch Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXRoIGQ9Ik0wIDMwIEg2MHoiIHN0cm9rZT0iI2FhIiBzdHJva2Utd2lkdGg9IjEuMCIgb3BhY2l0eT0iMC4wIi8+PHBhdGggZD0iTTMwIDAgVjYweiIgc3Ryb2tlPSIjYWEiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjAiLz48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNjcm9zcykiLz48L3N2Zz4=')] opacity-40 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Glass Card Container */}
          <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-10 md:p-12 shadow-2xl">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              variants={fadeInUp}>
              See the Difference for Yourself
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed font-medium max-w-3xl mx-auto"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}>
              Get started with a complimentary workflow assessment
            </motion.p>
            <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-white text-[#00A9A5] hover:bg-white/95 px-8 sm:px-10 py-6 sm:py-7 text-lg sm:text-xl font-bold rounded-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105">
                Get Started Today
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Animated Stat Card Component
const AnimatedStatCard = ({
  stat,
  icon: IconComponent,
  numericValue,
  suffix,
  prefix,
  shouldAnimate,
  index,
}: {
  stat: Statistic;
  icon: React.ElementType;
  numericValue: number;
  suffix: string;
  prefix: string;
  shouldAnimate: boolean;
  index: number;
}) => {
  const animatedValue = useCounter(numericValue, 2000, shouldAnimate);

  // Format number with commas and preserve decimals
  const formatNumber = (num: number) => {
    // Check if number has decimals
    const hasDecimals = num % 1 !== 0;
    if (hasDecimals) {
      // For decimals, format with fixed decimal places
      const parts = num.toFixed(1).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    // For integers, just add commas
    return Math.floor(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Gradient colors for each stat
  const gradients = [
    "from-[#0A4D8C] to-[#00A9A5]", // Medical blue to teal
    "from-[#00A9A5] to-[#0A4D8C]", // Teal to medical blue
    "from-[#0A4D8C] via-[#00A9A5] to-[#3B63F6]", // Blue to teal to vibrant blue
    "from-[#00A9A5] to-[#3B63F6]", // Teal to vibrant blue
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative">
      {/* Glassmorphism Card */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
        {/* Gradient Glow on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

        {/* Decorative Corner Border */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-100/50 rounded-bl-3xl opacity-50"></div>

        {/* Icon Container with Gradient */}
        <div className="relative mb-4 sm:mb-6">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#0A4D8C]/10 to-[#00A9A5]/10 flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out shadow-lg group-hover:shadow-[0_10px_30px_rgba(10,77,140,0.4),0_5px_15px_rgba(0,169,165,0.3)]">
            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#0A4D8C]/5 group-hover:to-[#00A9A5]/5 transition-all duration-700">
              <IconComponent className="w-9 h-9 sm:w-10 sm:h-10 text-[#0A4D8C] group-hover:text-[#00A9A5] transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-6" />
            </div>
          </div>
        </div>

        {/* Animated Counter */}
        <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
          {prefix}
          {formatNumber(animatedValue)}
          {suffix}
        </div>

        {/* Label */}
        <div className="text-sm sm:text-base font-bold text-gray-700 mb-2 uppercase tracking-wide">{stat.label}</div>

        {/* Description */}
        <div className="text-xs sm:text-sm text-gray-600 leading-relaxed hidden sm:block">{stat.description}</div>

        {/* Subtle Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A4D8C] to-[#00A9A5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out rounded-b-2xl"></div>
      </div>

      {/* External Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10"></div>
    </motion.div>
  );
};

// Counter hook for animated numbers
const useCounter = (end: number, duration: number = 2000, shouldStart: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;
    const hasDecimals = end % 1 !== 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = startValue + (end - startValue) * easeOutQuart;

      // If the end value has decimals, preserve them during animation
      if (hasDecimals) {
        setCount(parseFloat(currentValue.toFixed(1)));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};
