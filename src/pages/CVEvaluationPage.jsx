import { useState, useEffect } from "react";
import CVUploader from "../components/CVUploader";

const CVEvaluationPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  
  // Add useEffect to initialize animations immediately
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      element.classList.add('animate-fade-in');
    });
  }, []);
  
  return (
    <div className="pt-20 pb-20 bg-gradient-light min-h-screen">
      <div className="container-custom">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll animate-fade-in">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
            AI-Powered CV Evaluation
          </span>
          <h1 className="text-gradient mb-6">Unlock Your CV's Potential</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our advanced AI technology analyzes your CV to provide detailed feedback, identify improvement areas, and help you stand out to employers.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="max-w-5xl mx-auto mb-8 animate-on-scroll animate-fade-in">
          <div className="flex justify-center p-1 bg-white rounded-full shadow-md">
            <TabButton 
              active={activeTab === 'upload'} 
              onClick={() => setActiveTab('upload')}
              icon={
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              }
              label="Upload CV"
            />
            <TabButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              icon={
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Previous Evaluations"
            />
            <TabButton 
              active={activeTab === 'tips'} 
              onClick={() => setActiveTab('tips')}
              icon={
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="CV Tips"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto animate-on-scroll animate-fade-in bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeTab === 'upload' && (
            <div className="p-8">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Your CV</h2>
                <p className="text-gray-600">
                  Upload your CV to receive a detailed analysis and personalized recommendations to improve your chances of getting noticed by recruiters.
                </p>
              </div>
              
              <CVUploader />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="p-8 text-center">
              <div className="py-12">
                <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-600">No previous evaluations found</h3>
                <p className="text-gray-500 mt-2">Once you analyze a CV, your results will appear here</p>
                <button 
                  onClick={() => setActiveTab('upload')}
                  className="btn-primary mt-6"
                >
                  Upload Your First CV
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'tips' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">CV Writing Tips</h2>
              
              <div className="space-y-6">
                <TipCard 
                  title="Tailor Your CV to the Job" 
                  description="Customize your CV for each job application by highlighting relevant skills and experiences that match the job description."
                />
                
                <TipCard 
                  title="Quantify Your Achievements" 
                  description="Use numbers and metrics to demonstrate your impact, such as 'Increased sales by 25%' or 'Managed a team of 12 people'."
                />
                
                <TipCard 
                  title="Keep It Concise" 
                  description="Aim for a 1-2 page CV that focuses on your most relevant and recent experiences."
                />
                
                <TipCard 
                  title="Use Keywords" 
                  description="Include industry-specific keywords to help your CV pass through Applicant Tracking Systems (ATS)."
                />
                
                <TipCard 
                  title="Proofread Carefully" 
                  description="Eliminate spelling and grammar errors that could create a negative impression with employers."
                />
              </div>
            </div>
          )}
        </div>
        
        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mt-20 animate-on-scroll animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-gradient mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered CV analysis process is simple, fast, and provides valuable insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard 
              number="01"
              title="Upload Your CV"
              description="Upload your CV in PDF or DOC format. Optionally, include a job description for compatibility analysis."
            />
            
            <ProcessCard 
              number="02"
              title="AI Analysis"
              description="Our advanced AI algorithm analyzes your CV's content, structure, and alignment with job requirements."
            />
            
            <ProcessCard 
              number="03"
              title="Get Detailed Feedback"
              description="Receive a comprehensive report with actionable recommendations to improve your CV and increase your chances."
            />
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
};

const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
          : 'hover:bg-gray-100 text-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

const TipCard = ({ title, description }) => {
  return (
    <div className="p-5 border border-gray-100 rounded-xl hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ProcessCard = ({ number, title, description }) => {
  return (
    <div className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
        {number}
      </div>
      <div className="pt-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CVEvaluationPage; 