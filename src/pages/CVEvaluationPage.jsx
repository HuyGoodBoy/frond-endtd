import { useState, useEffect } from "react";
import CVUploader from "../components/CVUploader";

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
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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

  // Xem lại kết quả phân tích
  const viewAnalysis = (result) => {
    setSelectedAnalysis(result);
    setActiveTab('upload');
  };
  
  return (
    <div className="pt-20 pb-20 bg-gradient-light min-h-screen">
      <div className="container-custom">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll animate-fade-in">
          <span className="inline-block px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4">
            Phân Tích CV Với AI
          </span>
          <h1 className="text-gradient mb-6">Khám Phá Tiềm Năng CV Của Bạn</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Công nghệ AI tiên tiến của chúng tôi phân tích CV để cung cấp phản hồi chi tiết, xác định các lĩnh vực cần cải thiện và giúp bạn nổi bật với nhà tuyển dụng.
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
              label="Tải CV Lên"
            />
            <TabButton 
              active={activeTab === 'history'} 
              onClick={() => setActiveTab('history')}
              icon={
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Lịch Sử Đánh Giá"
            />
            <TabButton 
              active={activeTab === 'tips'} 
              onClick={() => setActiveTab('tips')}
              icon={
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              label="Mẹo Viết CV"
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto animate-on-scroll animate-fade-in bg-white rounded-2xl shadow-lg overflow-hidden">
          {activeTab === 'upload' && (
            <div className="p-8">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {selectedAnalysis ? 'Kết Quả Phân Tích CV' : 'Tải CV Của Bạn'}
                </h2>
                <p className="text-gray-600">
                  {selectedAnalysis 
                    ? 'Dưới đây là kết quả phân tích chi tiết CV của bạn.'
                    : 'Tải CV của bạn lên để nhận phân tích chi tiết và các đề xuất cá nhân hóa để tăng cơ hội được chú ý bởi nhà tuyển dụng.'}
                </p>
              </div>
              
              <CVUploader initialAnalysis={selectedAnalysis} />
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="p-8">
              {analysisHistory.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Lịch Sử Đánh Giá CV</h2>
                    <p className="text-sm text-gray-500">
                      {analysisHistory.length} kết quả gần nhất
                    </p>
                  </div>

                  {analysisHistory.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {item.fileName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Phân tích ngày: {formatDate(item.date)}
                          </p>
                          {item.result.job_compatibility && (
                            <div className="mt-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                                item.result.job_compatibility.compatibility_score >= 75
                                  ? 'bg-green-100 text-green-800'
                                  : item.result.job_compatibility.compatibility_score >= 50
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-red-100 text-red-800'
                              }`}>
                                Độ phù hợp: {item.result.job_compatibility.compatibility_score}%
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => viewAnalysis(item.result)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem chi tiết"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          
                          <button
                            onClick={() => deleteAnalysis(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa kết quả"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-600">Không tìm thấy đánh giá trước đây</h3>
                  <p className="text-gray-500 mt-2">Khi bạn phân tích CV, kết quả sẽ xuất hiện ở đây</p>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="btn-primary mt-6"
                  >
                    Tải CV Đầu Tiên
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'tips' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Mẹo Viết CV</h2>
              
              <div className="space-y-6">
                <TipCard 
                  title="Tùy Chỉnh CV Theo Công Việc" 
                  description="Điều chỉnh CV cho phù hợp với từng vị trí ứng tuyển bằng cách nhấn mạnh các kỹ năng và kinh nghiệm liên quan đến mô tả công việc."
                />
                
                <TipCard 
                  title="Lượng Hóa Thành Tích" 
                  description="Sử dụng số liệu và chỉ số để thể hiện tác động của bạn, ví dụ như 'Tăng doanh số 25%' hoặc 'Quản lý nhóm 12 người'."
                />
                
                <TipCard 
                  title="Giữ Ngắn Gọn" 
                  description="Hướng tới CV dài 1-2 trang tập trung vào kinh nghiệm gần đây và liên quan nhất."
                />
                
                <TipCard 
                  title="Sử Dụng Từ Khóa" 
                  description="Đưa vào các từ khóa chuyên ngành để giúp CV của bạn vượt qua hệ thống Applicant Tracking Systems (ATS)."
                />
                
                <TipCard 
                  title="Kiểm Tra Kỹ Lưỡng" 
                  description="Loại bỏ lỗi chính tả và ngữ pháp có thể tạo ấn tượng không tốt với nhà tuyển dụng."
                />
              </div>
            </div>
          )}
        </div>
        
        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mt-20 animate-on-scroll animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-gradient mb-4">Quy Trình Hoạt Động</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quy trình phân tích CV bằng AI của chúng tôi đơn giản, nhanh chóng và mang lại những thông tin giá trị
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProcessCard 
              number="01"
              title="Tải CV Lên"
              description="Tải CV của bạn dưới định dạng PDF hoặc DOC. Tùy chọn, bạn có thể thêm mô tả công việc để phân tích độ phù hợp."
            />
            
            <ProcessCard 
              number="02"
              title="Phân Tích AI"
              description="Thuật toán AI tiên tiến của chúng tôi phân tích nội dung, cấu trúc và sự phù hợp với yêu cầu công việc của CV."
            />
            
            <ProcessCard 
              number="03"
              title="Nhận Phản Hồi Chi Tiết"
              description="Nhận báo cáo toàn diện với các đề xuất thực tế để cải thiện CV và tăng cơ hội thành công của bạn."
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