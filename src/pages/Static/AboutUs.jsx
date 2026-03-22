import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

const STATS = [
  { value: "50L+",  label: "Lives Insured" },
  { value: "30+",   label: "Insurer Partners" },
  { value: "99.3%", label: "Claim Settlement Ratio" },
  { value: "2019",  label: "Founded" },
];

const TEAM = [
  { name: "Arjun Kapoor",  role: "Co-Founder & CEO",     initials: "AK" },
  { name: "Sneha Iyer",    role: "Co-Founder & CTO",     initials: "SI" },
  { name: "Rohan Desai",   role: "Head of Products",      initials: "RD" },
  { name: "Priya Nair",    role: "Head of Claims",        initials: "PN" },
];

const VALUES = [
  {
    icon: "🔒",
    title: "Trust First",
    description: "We never recommend a plan because it pays us more. Your best interest always comes first.",
  },
  {
    icon: "⚡",
    title: "Simplicity",
    description: "Insurance shouldn't require a law degree. We strip away the jargon so you can decide with confidence.",
  },
  {
    icon: "🤝",
    title: "Always There",
    description: "From choosing a plan to settling a claim, our team is with you at every step — 24×7.",
  },
];

/**
 * About Us page.
 * Covers mission, stats, team, and values.
 */
export default function AboutUs() {
  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-white to-[#e8f6fd] section-spacing">
        <Container>
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-5">
            <span className="inline-block bg-[#f0faff] text-[#019de3] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
              Our Story
            </span>
            <h1 className="type-h1 font-bold text-gray-800">
              Insurance that works{" "}
              <span className="text-[#019de3]">for you</span>
            </h1>
            <p className="type-body text-gray-500 leading-relaxed">
              EasyBeema was founded with one simple belief — buying insurance should be as easy as buying anything
              else online. No agents. No confusion. No hidden charges. Just the right plan, at the right price, in minutes.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="w-full section-spacing bg-[#019de3]">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-black">{s.value}</span>
                <span className="text-sm opacity-80">{s.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="w-full section-spacing">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <img
                src="/images/img_insurancemarket_494x396.png"
                alt="Our mission"
                className="w-full max-w-md mx-auto object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-5">
              <span className="text-xs font-semibold text-[#019de3] uppercase tracking-widest">Our Mission</span>
              <h2 className="type-h2 font-bold text-gray-800">
                Making India's families financially secure
              </h2>
              <p className="type-body text-gray-500 leading-relaxed">
                Over 90% of Indians are underinsured. We started EasyBeema to close that gap — by giving
                every family access to unbiased advice and affordable coverage from India's best insurers.
              </p>
              <p className="type-body text-gray-500 leading-relaxed">
                We are a licensed insurance broker (IRDAI License No. DEMO-2019-001) and a completely
                independent platform. We don't manufacture insurance — we help you choose it wisely.
              </p>
              <Link to="/policy/1">
                <Button text="Explore Plans" variant="primary" size="medium" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="w-full section-spacing bg-[#f8fbff]">
        <Container>
          <div className="text-center mb-10">
            <h2 className="type-h2 font-bold text-gray-800">
              What we <span className="text-[#019de3]">stand for</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="text-base font-semibold text-gray-800">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="w-full section-spacing">
        <Container>
          <div className="text-center mb-10">
            <h2 className="type-h2 font-bold text-gray-800">
              Meet the <span className="text-[#019de3]">Team</span>
            </h2>
            <p className="type-body text-gray-500 mt-3">The people building India's simplest insurance experience.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col items-center gap-3 text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#019de3] flex items-center justify-center text-white text-xl font-bold">
                  {member.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="w-full section-spacing bg-gradient-to-r from-[#019de3] to-[#005f9b]">
        <Container>
          <div className="text-center text-white flex flex-col gap-5 items-center">
            <h2 className="type-h2 font-bold">Ready to get covered?</h2>
            <p className="type-body opacity-80 max-w-md">
              Join over 50 lakh Indians who trust EasyBeema for their insurance needs.
            </p>
            <Link to="/policy/1">
              <Button text="Get Started →" variant="secondary" size="large" className="bg-white text-[#019de3] border-white hover:bg-gray-50" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
