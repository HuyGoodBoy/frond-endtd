import { useState, useEffect } from 'react';
import CompanyUploader from '../components/CompanyUploader';

const CompanyEvaluationPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isLoaded, setIsLoaded] = useState(false);

  // Add scroll reveal animation effect
  useEffect(() => {
    setIsLoaded(true);
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
    <div className={`min-h-screen bg-gradient-light transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container-custom py-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4 hover:bg-pink-200 transition-colors duration-300">
            Phân Tích Doanh Nghiệp Với AI
          </span>
          <h1 className="text-gradient mb-6 animate-slide-up">Đánh Giá Chi Tiết Doanh Nghiệp</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fade-in">
            Sử dụng AI để phân tích thông tin doanh nghiệp, đánh giá mức độ đầy đủ thông tin và đề xuất cải thiện.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto animate-on-scroll bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-slide-up">Tải Thông Tin Doanh Nghiệp</h2>
              <p className="text-gray-600 animate-fade-in">
                Tải lên thông tin doanh nghiệp để nhận phân tích chi tiết và các đề xuất cải thiện.
              </p>
            </div>
            
            <CompanyUploader />
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx="true">{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .text-gradient {
          background: linear-gradient(135deg, #ec4899, #db2777);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .bg-gradient-light {
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
        }
      `}</style>
    </div>
  );
};

export default CompanyEvaluationPage; 