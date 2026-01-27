import { motion } from "framer-motion";
import { ShieldCheck, Users, Target, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const AboutPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0A4D8C] via-[#00A9A5] to-[#0A4D8C] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#3B63F6]/10 rounded-full blur-2xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight">
            About HomeHealthHero
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            We help agencies protect compliance, improve accuracy, and move faster with a clinical-first back-office
            partner.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F3F8FC] via-white to-[#EFFAF8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Clinical excellence, built for scale.</h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              Our team of certified clinicians and coders delivers precise chart reviews, documentation QA, and
              reimbursement integrity. We blend healthcare expertise with disciplined processes so your clinicians can
              focus on care, not paperwork.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Whether you are a growing agency or a multi-branch provider, we adapt to your workflow and volume with
              a reliable, audit-ready approach.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: ShieldCheck, title: "Compliance First", desc: "HIPAA-aware processes and audit-ready reviews." },
              { icon: Users, title: "Certified Team", desc: "Experienced clinicians and coders on every chart." },
              { icon: Target, title: "Accuracy Driven", desc: "Consistent QA to reduce denials and rework." },
              { icon: TrendingUp, title: "Operational Lift", desc: "Scalable support for faster turnaround times." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200/70 p-5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A4D8C] to-[#00A9A5] flex items-center justify-center text-white mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

