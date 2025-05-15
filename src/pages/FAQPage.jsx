import { useState, useEffect } from 'react';

// Interview questions in English (translated from Vietnamese)
const interviewQuestions = [
  {
    category: "General Questions",
    questions: [
      {
        question: "Tell me about yourself",
        answer: "Begin with your educational background, then discuss your relevant work experience. Highlight your key skills and accomplishments that align with the position. End with why you're interested in this role and company. Keep it concise and professional, around 2 minutes in length."
      },
      {
        question: "Why do you want this position?",
        answer: "I'm excited about this position because it aligns perfectly with my skills and career goals. I've researched your company and admire its innovative approach and strong values. I believe my experience in [relevant skill] would allow me to contribute effectively while growing professionally in an environment that matches my work ethic."
      },
      {
        question: "What are your strengths and weaknesses?",
        answer: "My strengths include problem-solving abilities, quick learning, and performing well under pressure. For weaknesses, I sometimes focus too much on details, spending extra time perfecting my work. I'm improving this by setting better priorities and developing more efficient time management strategies."
      },
      {
        question: "Where do you see yourself in 5 years?",
        answer: "In five years, I aim to become an expert in this field, capable of leading projects and making significant contributions to the company's growth. I'm committed to continuous learning to stay updated with new knowledge and skills in this rapidly evolving industry."
      }
    ]
  },
  {
    category: "Experience & Challenges",
    questions: [
      {
        question: "Tell me about a time you failed. What did you learn?",
        answer: "I once failed to meet expectations on a project due to poor planning. Afterward, I learned to prepare more thoroughly, set clear objectives, and anticipate risks to avoid similar mistakes. This experience taught me the importance of detailed planning and seeking input from experienced team members early in the process."
      },
      {
        question: "How do you handle tasks you've never done before?",
        answer: "When facing unfamiliar tasks, I proactively research requirements, consult documentation, and seek advice from experienced colleagues. I view these situations as opportunities to expand my skills and demonstrate adaptability. I break down the new task into manageable components and tackle them systematically."
      },
      {
        question: "Describe a challenging situation and how you resolved it",
        answer: "In my previous role, we faced a tight deadline with unexpected technical issues. I organized an emergency team meeting, identified the critical problems, delegated tasks based on team strengths, and established a clear communication plan. We prioritized core functionality and worked extended hours when necessary. We delivered on time and later implemented process improvements to prevent similar situations."
      }
    ]
  },
  {
    category: "Practical & Technical",
    questions: [
      {
        question: "Why should we hire you?",
        answer: "I believe my combination of relevant skills, experience, and passion makes me an ideal candidate. My background in [specific field] has prepared me to tackle the challenges of this role. I'm committed to continuous improvement and can contribute fresh perspectives while adapting quickly to your established processes. My track record demonstrates consistent results and a strong work ethic."
      },
      {
        question: "What salary are you expecting?",
        answer: "Based on industry research for this position and considering my experience and skills, I'm looking for a salary in the range of [appropriate range]. However, I'm open to discussing the complete compensation package including benefits and growth opportunities at your company."
      },
      {
        question: "Do you have any questions for us?",
        answer: "Yes, I'd like to know more about professional development and training opportunities at the company. I'm also interested in learning about the team culture and how the company supports employees in advancing their skills and expertise."
      }
    ]
  }
];

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  // Animation on scroll effect
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

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-light">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            Interview Preparation
          </span>
          <h1 className="text-gradient mb-6">Ace Your Next Interview</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Prepare for your interviews with common questions and expert tips on how to provide impressive answers
          </p>
        </div>

        {/* Question Categories */}
        <div className="max-w-5xl mx-auto mb-10 animate-on-scroll">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {interviewQuestions.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Questions and Answers */}
        <div className="max-w-3xl mx-auto animate-on-scroll">
          <div className="space-y-4">
            {interviewQuestions[activeCategory].questions.map((item, qIndex) => {
              const isExpanded = expandedQuestions[`${activeCategory}-${qIndex}`];
              
              return (
                <div 
                  key={qIndex} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'shadow-lg' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(activeCategory, qIndex)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-lg">{item.question}</span>
                    <span className={`text-purple-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-gray-100">
                      <p className="text-gray-700 whitespace-pre-line">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interview Tips */}
        <div className="max-w-4xl mx-auto mt-16 animate-on-scroll">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600">
              <h2 className="text-2xl font-bold text-white">Interview Success Tips</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InterviewTip 
                  title="Before the Interview"
                  tips={[
                    "Research the company thoroughly",
                    "Practice answers to common questions",
                    "Prepare thoughtful questions to ask",
                    "Plan your outfit and route the day before",
                    "Get a good night's sleep"
                  ]}
                />
                
                <InterviewTip 
                  title="During the Interview"
                  tips={[
                    "Arrive 10-15 minutes early",
                    "Make a strong first impression with a firm handshake",
                    "Maintain good eye contact and posture",
                    "Use the STAR method for behavioral questions",
                    "Show enthusiasm and positive energy"
                  ]}
                />
                
                <InterviewTip 
                  title="Answer Strategies"
                  tips={[
                    "Keep answers concise and directly address the question",
                    "Provide specific examples from your experience",
                    "Quantify your achievements when possible",
                    "Be honest about your experience and skills",
                    "Focus on how you can benefit the company"
                  ]}
                />
                
                <InterviewTip 
                  title="After the Interview"
                  tips={[
                    "Send a thank-you email within 24 hours",
                    "Reference specific conversation points",
                    "Reiterate your interest in the position",
                    "Follow up if you haven't heard back within the timeframe given",
                    "Reflect on the experience for future interviews"
                  ]}
                />
              </div>
              
              <div className="mt-8 p-4 bg-gradient-light rounded-xl">
                <p className="text-center text-gray-700">
                  <span className="font-semibold">Pro Tip:</span> Record yourself answering practice questions to identify areas for improvement in your delivery and body language.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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

function InterviewTip({ title, tips }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gradient">{title}</h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
              {index + 1}
            </span>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQPage;
