"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb, Globe, Stars, Target, Rocket, User } from "lucide-react";

export default function About() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Adaora Okoro",
      role: "Digital Artist",
      content:
        "cre8r gave me the platform I needed to showcase my work to a global audience. The community here is incredibly supportive!",
      avatar: <User/>,
    },
    {
      id: 2,
      name: "Adewale Johnson",
      role: "Musician Producer",
      content:
        "The exhibition features and collaboration tools have transformed how I share my music. Highly recommended for any creator.",
      avatar: <User/>,
    },
    {
      id: 3,
      name: "Timileyin Gbenga",
      role: "Writer & Poet",
      content:
        "Finally, a platform that celebrates all forms of creativity equally. cre8r is the future of creator communities.",
      avatar: <User/>,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "What is cre8r?",
      answer:
        "cre8r is a creative platform designed for artists, writers, musicians, and designers to showcase their work, collaborate with others, and build their audience. We believe every creator deserves a space to shine.",
    },
    {
      id: 2,
      question: "How can I start exhibiting my work?",
      answer:
        "Simply create an account, upload your work to your profile, and create or join an exhibit. Our curated collections help your work reach the right audience.",
    },
    {
      id: 3,
      question: "Is cre8r free to use?",
      answer:
        "Yes! cre8r is completely free to create an account and start showcasing your work. We offer premium features for creators who want additional exposure and tools.",
    },
    {
      id: 4,
      question: "How does collaboration work?",
      answer:
        "You can connect with other creators, comment on their work, join group exhibits, and message creators directly to discuss potential collaborations.",
    },
    {
      id: 5,
      question: "How do you protect creator's work?",
      answer:
        "We take intellectual property seriously. All work on cre8r remains the property of the creator. We implement security measures and have clear guidelines against copying.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-5 py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black">
            Empowering Creators
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            A platform where artists, writers, musicians, and designers come together to create, collaborate, and inspire.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-950 transition-all duration-300">
              Explore Community
            </button>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="px-5 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Our Mission & Vision
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="group relative p-8 rounded-2xl border border-black hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4"><Target/></div>
              <h3 className="text-3xl font-bold mb-4 text-black">
                Our Mission
              </h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                To provide a Nigerian-first, inclusive, innovative platform where creators of all backgrounds can showcase their talents, connect with like-minded individuals, and build sustainable careers in the creative industries.
              </p>
            </div>

            {/* Vision */}
            <div className="group relative p-8 text-black rounded-2xl border border-black hover:shadow-xl transition-all duration-300">
              <div className="text-5xl mb-4"><Rocket/></div>
              <h3 className="text-3xl font-bold mb-4">
                Our Vision
              </h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                To become Nigeria's most trusted and vibrant creative ecosystem where talent is recognized, collaboration thrives, and every creator has the opportunity to reach global audiences.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Inclusion",
                description: "We celebrate all forms of creativity",
                icon: <Globe/>,
              },
              {
                title: "Authenticity",
                description: "Real work, real creators, real connections",
                icon: <Stars/>,
              },
              {
                title: "Innovation",
                description: "Continuously improving the creator experience",
                icon: <Lightbulb/>,
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="px-5 py-20 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            What Our Creators Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-5 py-20 bg-white dark:bg-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={` shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 bg-white dark:bg-slate-800 border-t border-gray-300 dark:border-gray-600 animate-fade-in">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-5 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Creating?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of creators already sharing their passion on cre8r.
          </p>
          <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Join Our Community Today
          </button>
        </div>
      </section>
    </main>
  );
}