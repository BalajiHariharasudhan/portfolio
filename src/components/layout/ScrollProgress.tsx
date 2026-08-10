import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight > 0) {
        const scrolled = (window.scrollY / documentHeight) * 100;
        setScrollPercentage(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-900/40">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
