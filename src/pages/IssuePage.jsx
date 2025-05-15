import emailjs from "@emailjs/browser";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faCheckCircle, faExclamationTriangle, faLightbulb } from "@fortawesome/free-solid-svg-icons";

function IssuePage() {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

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

  const validateForm = () => {
    const errors = {};
    
    if (!feedback.trim()) {
      errors.feedback = "Please enter your feedback";
    }
    
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
      
      // Reset form
      setFeedback("");
      setEmail("");
      setFeedbackType("suggestion");
    }, 1500);
    
    // The actual email sending logic would be here
    // Uncomment to use actual emailjs send
    /*
    let templateParams = {
      from_name: email || "Anonymous User",
      message: feedback,
      feedback_type: feedbackType
    };
    
    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        function (response) {
          setIsSubmitting(false);
          setShowModal(true);
          
          // Reset form
          setFeedback("");
          setEmail("");
          setFeedbackType("suggestion");
        },
        function (error) {
          setIsSubmitting(false);
          console.log("FAILED...", error);
          // Handle error
        }
      );
    */
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-light">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            We Value Your Feedback
          </span>
          <h1 className="text-gradient mb-6">Help Us Improve</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your feedback helps us enhance our platform and provide better services. Share your thoughts, report issues, or suggest new features.
          </p>
        </div>
        
        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto animate-on-scroll">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Feedback Type Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Feedback Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <FeedbackTypeButton 
                      type="suggestion"
                      icon={faLightbulb}
                      label="Suggestion"
                      active={feedbackType === "suggestion"}
                      onClick={() => setFeedbackType("suggestion")}
                    />
                    <FeedbackTypeButton 
                      type="issue"
                      icon={faExclamationTriangle}
                      label="Report Issue"
                      active={feedbackType === "issue"}
                      onClick={() => setFeedbackType("issue")}
                    />
                    <FeedbackTypeButton 
                      type="praise"
                      icon={faCheckCircle}
                      label="Praise"
                      active={feedbackType === "praise"}
                      onClick={() => setFeedbackType("praise")}
                    />
                  </div>
                </div>
                
                {/* Feedback Text */}
                <div className="mb-6">
                  <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={5}
                    placeholder={feedbackType === "suggestion" 
                      ? "Share your ideas on how we can improve..." 
                      : feedbackType === "issue" 
                        ? "Please describe the issue you encountered in detail..." 
                        : "Tell us what you liked about our platform..."}
                    className={`input-field w-full ${formErrors.feedback ? 'border-red-500 focus:ring-red-200' : ''}`}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  ></textarea>
                  {formErrors.feedback && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.feedback}</p>
                  )}
                </div>
                
                {/* Email */}
                <div className="mb-8">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email@example.com"
                    className={`input-field w-full ${formErrors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    We'll only use this to contact you if we need more information.
                  </p>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex items-center justify-center ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-gradient font-semibold text-lg mb-3">How We Use Your Feedback</h3>
              <p className="text-gray-700">
                We carefully review all feedback to improve our platform. Your suggestions help shape our future updates and enhancements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-gradient font-semibold text-lg mb-3">Response Time</h3>
              <p className="text-gray-700">
                If you've provided your email, we aim to respond to critical issues within 48 hours. General feedback is collected and reviewed periodically.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-bounce-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You for Your Feedback!</h3>
              <p className="text-gray-600 mb-6">
                We appreciate your input and will use it to improve our platform. Your feedback helps us create a better experience for everyone.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="btn-primary w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
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
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

function FeedbackTypeButton({ type, icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-3 rounded-lg border-2 flex flex-col items-center transition-all duration-300 ${
        active 
          ? 'border-purple-500 bg-purple-50 text-purple-700'
          : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-600 hover:text-purple-600'
      }`}
    >
      <FontAwesomeIcon icon={icon} className={`text-xl mb-2 ${active ? 'text-purple-600' : 'text-gray-400'}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

export default IssuePage;
