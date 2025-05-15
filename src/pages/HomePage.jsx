import { useEffect } from 'react';
import { Link } from "react-router-dom";

function HomePage() {
  // Add scroll reveal animation effect
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-light">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Hero Content */}
            <div className="max-w-2xl animate-on-scroll">
              <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
                AI-Powered Career Development
              </span>
              
              <h1 className="mb-6">
                Boost your career with <span className="text-gradient">AI-driven</span> insights
              </h1>
              
              <p className="text-lg text-gray-700 mb-8">
                Our advanced AI analyzes your CV, prepares you for interviews, and offers personalized career advice to help you stand out in the job market.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/cv-evaluation">
                  <button className="btn-primary">
                    Analyze Your CV
                  </button>
                </Link>
                
                <Link to="/chat">
                  <button className="btn-secondary">
                    Get Career Advice
                  </button>
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                {['AI Accuracy', 'Data Security', 'Personalized'].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 rounded-full blur-3xl"></div>
              <div className="relative animate-float">
                <svg className="w-96 h-96" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#8b5cf6" d="M40.8,-56.1C51.4,-47.4,57.7,-32.8,62.2,-17.3C66.7,-1.8,69.3,14.7,64.1,28.8C58.9,42.9,46,54.6,31.2,62.1C16.4,69.6,-0.3,72.8,-17.4,69.8C-34.5,66.9,-51.9,57.7,-62.9,43.3C-74,28.8,-78.6,9.1,-74.5,-8.2C-70.4,-25.5,-57.5,-40.5,-42.9,-48.7C-28.3,-56.9,-12.1,-58.5,2,-61.1C16.1,-63.6,30.3,-64.9,40.8,-56.1Z" transform="translate(100 100)" />
                </svg>
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-2xl shadow-xl p-4 rotate-6">
                  <div className="h-full flex flex-col">
                    <div className="h-4 w-24 bg-purple-200 rounded mb-3"></div>
                    <div className="h-2 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-36 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-28 bg-gray-200 rounded mb-6"></div>
                    <div className="h-24 w-full bg-indigo-100 rounded-lg mb-3"></div>
                    <div className="h-6 w-16 bg-purple-500 rounded-lg ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-gradient mb-4">Unlock Your Career Potential</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers powerful tools to help you every step of the way in your career journey
            </p>
          </div>
          
          <div className="card-grid animate-on-scroll">
            {/* CV Analysis */}
            <FeatureCard 
              title="CV Analysis"
              description="Get detailed feedback on your CV with AI-powered analysis identifying strengths and improvement areas."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              link="/cv-evaluation"
              linkText="Analyze Your CV"
            />
            
            {/* Career Assistant */}
            <FeatureCard 
              title="Career Assistant"
              description="Chat with our AI assistant for personalized career advice and job search guidance."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              }
              link="/chat"
              linkText="Get Career Advice"
            />
            
            {/* Interview Prep */}
            <FeatureCard 
              title="Interview Preparation"
              description="Practice with common interview questions and get expert feedback to improve your responses."
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              }
              link="/faq"
              linkText="Practice Interviews"
            />
          </div>
        </div>
      </section>

      {/* Add CSS for animations */}
      <style jsx="true">{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }
        
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ title, description, icon, link, linkText }) {
  return (
    <div className="card p-6">
      <div className="w-14 h-14 rounded-xl bg-gradient-light flex items-center justify-center mb-4 text-purple-600">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <Link to={link} className="text-purple-600 font-medium hover:text-purple-800 inline-flex items-center transition-colors">
        {linkText}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

export default HomePage;
