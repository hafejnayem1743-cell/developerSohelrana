import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flame,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Wallet,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { data } = useApp();
  const { courses, bundle } = data;
  const navigate = useNavigate();

  const isBundle = courseSlug === 'bundle';
  const course = isBundle
    ? null
    : courses.find((c) => c.slug === courseSlug);

  if (!isBundle && !course) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-['Outfit'] text-white font-bold mb-4">
          Course Not Found
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          The requested course track does not exist or has been updated.
        </p>
        <Link
          to="/courses"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
        >
          Return to All Courses
        </Link>
      </div>
    );
  }

  // Define unified data fields whether bundle or individual course
  const title = isBundle ? bundle.title : course!.title;
  const price = isBundle ? bundle.finalPrice : course!.price;
  const regularPrice = isBundle ? bundle.regularTotal : course!.regularPrice;
  const description = isBundle ? bundle.description : course!.description;
  const technologies = isBundle
    ? ['Full Stack Web', 'Python & Django', 'Android & Kotlin', 'RESTful APIs', 'Databases', 'Git']
    : course!.technologies;
  const whatYouLearn = isBundle
    ? [
        'Complete end-to-end full-stack web application development with React & Node.js',
        'Object-Oriented Python engineering, Django REST Framework, and PostgreSQL databases',
        'Native Android mobile application architecture using Java, Kotlin, and Firebase',
        'Defensive web security best practices, JWT tokens, and OWASP mitigation',
        'Production cloud deployment, Git version control, and CI/CD pipelines',
      ]
    : course!.whatYouLearn;
  const modules = isBundle ? bundle.modules : course!.modules;
  const requirements = isBundle
    ? [
        'A working computer (Windows, macOS, or Linux) with internet access',
        'No prior advanced software development experience is required',
        'Enthusiasm for hands-on, project-based engineering',
      ]
    : course!.requirements;
  const benefits = isBundle
    ? [
        'All 3 comprehensive course tracks included in one enrollment',
        'Full source code access for all course repositories',
        'One bundle covering all three course tracks',
        'A single package price for the three included tracks',
      ]
    : course!.benefits;
  const faq = isBundle ? bundle.faq : course!.faq;

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL COURSES</span>
        </Link>

        {/* Hero Banner Card */}
        <div className="rounded-3xl bg-[#090D1A]/90 border border-cyan-500/30 p-6 sm:p-10 backdrop-blur-2xl mb-12 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              {isBundle ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>ALL-IN-ONE DEVELOPER CAREER BUNDLE (SAVE {bundle.savings})</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{course?.packageNumber || 'PROFESSIONAL TRACK'}</span>
                </div>
              )}

              <h1 className="font-['Outfit'] font-black text-3xl sm:text-4xl lg:text-5xl text-white">
                {title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base font-['Plus_Jakarta_Sans'] leading-relaxed">
                {description}
              </p>

              {/* Technology Badges */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                  Core Technologies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing & Buy Button Box */}
            <div className="lg:w-80 p-6 rounded-2xl bg-slate-950/90 border border-white/10 flex flex-col items-center text-center space-y-4 shrink-0">
              <span className="text-xs font-mono uppercase text-slate-400">
                Enrollment Investment
              </span>

              <div className="flex items-baseline gap-2">
                <span className="font-['Outfit'] font-black text-5xl text-white">
                  ${price}
                </span>
                {regularPrice && (
                  <span className="text-sm font-mono text-slate-500 line-through">
                    ${regularPrice}
                  </span>
                )}
              </div>

              {isBundle && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                  Discount: {bundle.discount} OFF
                </span>
              )}

              {/* MOST IMPORTANT CTA: BUY COURSE */}
              <Link
                to={`/payment?course=${courseSlug}`}
                id="buy-course-primary-btn"
                className="w-full py-4 px-6 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BUY COURSE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 pt-1">
                <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                <span>USDT TRC20 / BEP20 Accepted</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Content: Syllabus & What You Learn */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: What You Will Learn & Modules */}
          <div className="lg:col-span-8 space-y-10">
            {/* What You Will Learn */}
            <div className="p-7 rounded-3xl bg-[#090D1A]/70 border border-white/[0.08] backdrop-blur-xl">
              <h2 className="font-['Outfit'] font-bold text-2xl text-white mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>What You Will Learn</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {whatYouLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-['Plus_Jakarta_Sans'] text-slate-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Modules */}
            <div className="p-7 rounded-3xl bg-[#090D1A]/70 border border-white/[0.08] backdrop-blur-xl">
              <h2 className="font-['Outfit'] font-bold text-2xl text-white mb-5 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Detailed Syllabus & Modules</span>
              </h2>

              <div className="space-y-4">
                {modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-2"
                  >
                    <div className="font-mono text-sm text-cyan-300 font-bold">
                      {mod.title}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {mod.topics.map((topic, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-xs font-mono text-slate-300"
                        >
                          • {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequently Asked Questions */}
            {faq.length > 0 && (
              <div className="p-7 rounded-3xl bg-[#090D1A]/70 border border-white/[0.08] backdrop-blur-xl">
                <h2 className="font-['Outfit'] font-bold text-2xl text-white mb-5 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div className="space-y-4">
                  {faq.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950/50 border border-white/[0.06]"
                    >
                      <h4 className="font-mono font-bold text-sm text-white mb-1.5">
                        {f.question}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm font-['Plus_Jakarta_Sans'] leading-relaxed">
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Requirements, Benefits, Purchase Instructions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Purchase Instructions */}
            <div className="p-6 rounded-3xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-xl space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                // PURCHASE INSTRUCTIONS
              </h3>
              <ol className="space-y-3 text-xs font-mono text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>Click BUY COURSE to proceed to the secure payment portal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>Select USDT TRC20 or BEP20 and transfer the exact fee.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>Submit your Transaction ID (TXID) & receipt screenshot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 text-[10px]">
                    4
                  </span>
                  <span>Payment requests are reviewed manually. Course access instructions should only be provided after the payment is independently reviewed.</span>
                </li>
              </ol>

              <Link
                to={`/payment?course=${courseSlug}`}
                className="w-full py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Course Benefits */}
            <div className="p-6 rounded-3xl bg-[#090D1A]/70 border border-white/[0.08] backdrop-blur-xl">
              <h3 className="font-['Outfit'] font-bold text-lg text-white mb-4">
                Course Inclusions
              </h3>
              <ul className="space-y-3">
                {benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="p-6 rounded-3xl bg-[#090D1A]/70 border border-white/[0.08] backdrop-blur-xl">
              <h3 className="font-['Outfit'] font-bold text-lg text-white mb-4">
                Prerequisites & Tools
              </h3>
              <ul className="space-y-2.5">
                {requirements.map((req, idx) => (
                  <li key={idx} className="text-xs font-['Plus_Jakarta_Sans'] text-slate-400 leading-relaxed">
                    • {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
