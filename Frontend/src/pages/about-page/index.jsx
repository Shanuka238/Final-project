import React from 'react';

const features = [
  {
    icon: (
      <svg className="w-10 h-10 text-primary animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10"/></svg>
    ),
    title: 'Our Journey',
    desc: 'Started as a small team in 2020, we have grown into a leading event platform trusted by hundreds of clients and professionals.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-accent animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: 'What We Offer',
    desc: 'All-in-one event planning: catering, decor, music, photography, and more. Modern tools for seamless booking and management.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-green-500 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10"/></svg>
    ),
    title: 'Our Promise',
    desc: 'Transparency, quality, and support. We help you create memorable events, every step of the way.'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-blue-400 animate-wiggle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10"/></svg>
    ),
    title: 'Looking Forward',
    desc: 'Join us as we continue to innovate and make event planning even more magical for everyone.'
  },
];

const style = `
@keyframes wiggle {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
}
.animate-wiggle { animation: wiggle 1.2s infinite; }
.animate-spin-slow { animation: spin 2.5s linear infinite; }
`;

const AboutUs = () => (
  <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col items-center justify-center py-12 px-4">
    <style>{style}</style>
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 animate-fade-in">About <span className="text-accent">Us</span></h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-200">
        Making event planning magical, modern, and effortless. Discover our story and what drives us to deliver the best experiences for you.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full animate-fade-in delay-400">
      {features.map((f, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 group">
          <div className="mb-4">{f.icon}</div>
          <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-200">{f.title}</h2>
          <p className="text-gray-600 text-center">{f.desc}</p>
        </div>
      ))}
    </div>
    <div className="mt-12 text-sm text-gray-500 animate-fade-in delay-700">
      &copy; {new Date().getFullYear()} Party Nest. All rights reserved.
    </div>
    <style>{`
      @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      .animate-fade-in { animation: fade-in 1s both; }
      .delay-200 { animation-delay: 0.2s; }
      .delay-400 { animation-delay: 0.4s; }
      .delay-700 { animation-delay: 0.7s; }
    `}</style>
  </div>
);

export default AboutUs;
