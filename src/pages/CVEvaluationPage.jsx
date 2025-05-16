import { useState, useEffect } from "react";
import CVUploader from "../components/CVUploader";
import DailyStats from "../components/DailyStats";

const CVEvaluationPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  
  // Load lịch sử đánh giá từ localStorage
  useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem('cvAnalysisHistory') || '[]');
      setAnalysisHistory(history);
    } catch (error) {
      console.error('Error loading analysis history:', error);
      setAnalysisHistory([]);
    }
  }, [activeTab]); // Reload khi chuyển tab

  // Add useEffect to initialize animations immediately
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
      element.classList.add('animate-fade-in');
    });
  }, []);

  // Format date string
  const formatDate = (dateString) => {
    try {
      if (!dateString) return 'Không có thời gian';
      
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Thời gian không hợp lệ';

      return new Intl.DateTimeFormat('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Lỗi định dạng thời gian';
    }
  };

  // Xóa một kết quả phân tích khỏi lịch sử
  const deleteAnalysis = (id) => {
    try {
      const history = JSON.parse(localStorage.getItem('cvAnalysisHistory') || '[]');
      const updatedHistory = history.filter(item => item.id !== id);
      localStorage.setItem('cvAnalysisHistory', JSON.stringify(updatedHistory));
      setAnalysisHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting analysis:', error);
    }
  };

  // Xóa toàn bộ lịch sử
  const clearAllHistory = () => {
    try {
      localStorage.removeItem('cvAnalysisHistory');
      setAnalysisHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  // Xem lại kết quả phân tích
  const viewAnalysis = (analysis) => {
    // Chuyển đổi dữ liệu để phù hợp với format mong đợi
    const formattedResult = {
      cv_info: analysis.result.cv_info,
      job_compatibility: analysis.result.job_compatibility,
      missing_fields: analysis.result.missing_fields
    };
    setSelectedAnalysis(formattedResult);
    setActiveTab('upload');
  };
  
  return (
    <div className="min-h-screen bg-gradient-light pt-20 pb-8">
      <div className="container-custom">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-gradient mb-3">Khám Phá Tiềm Năng CV Của Bạn</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Công nghệ AI tiên tiến của chúng tôi phân tích CV để cung cấp phản hồi chi tiết, xác định các lĩnh vực cần cải thiện và giúp bạn nổi bật với nhà tuyển dụng.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <DailyStats type="cv" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b border-gray-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex-1 px-6 py-4 text-center transition-colors duration-200 ${
                  activeTab === "upload"
                    ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white"
                    : "text-gray-600 hover:text-pink-600"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Tải CV Lên</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 px-6 py-4 text-center transition-colors duration-200 ${
                  activeTab === "history"
                    ? "bg-gradient-to-r from-pink-600 to-pink-700 text-white"
                    : "text-gray-600 hover:text-pink-600"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Lịch Sử Đánh Giá</span>
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "upload" ? (
              <CVUploader selectedAnalysis={selectedAnalysis} />
            ) : (
              <div className="space-y-4">
                {analysisHistory.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>Chưa có lịch sử đánh giá nào</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end mb-4">
                      <button
                        onClick={clearAllHistory}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                      >
                        Xóa Tất Cả Lịch Sử
                      </button>
                    </div>
                    {analysisHistory.map((analysis) => (
                      <div key={analysis.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-800">{analysis.fileName}</h3>
                            <p className="text-sm text-gray-500">{formatDate(analysis.timestamp)}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => viewAnalysis(analysis)}
                              className="text-pink-600 hover:text-pink-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => deleteAnalysis(analysis.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {analysis.result && (
                          <div className="mt-3">
                            <div className="text-sm text-gray-600">
                              <p><strong>Điểm phù hợp:</strong> {analysis.result.compatibility_score}%</p>
                              {analysis.result.job_compatibility && (
                                <p><strong>Đề xuất:</strong> {analysis.result.job_compatibility.recommendation}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
        active 
          ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-md' 
          : 'hover:bg-gray-100 text-gray-700 shadow-sm'
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
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
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
      <div className="absolute -top-5 -left-5 w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-pink-700 flex items-center justify-center text-white font-bold text-lg">
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