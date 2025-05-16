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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tải CV Của Bạn</h2>
                <p className="text-gray-600">
                  Tải CV của bạn lên để nhận phân tích chi tiết và các đề xuất cá nhân hóa để tăng cơ hội được chú ý bởi nhà tuyển dụng.
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
                <h3 className="text-xl font-medium text-gray-600">Không tìm thấy đánh giá trước đây</h3>
                <p className="text-gray-500 mt-2">Khi bạn phân tích CV, kết quả sẽ xuất hiện ở đây</p>
                <button 
                  onClick={() => setActiveTab('upload')}
                  className="btn-primary mt-6"
                >
                  Tải CV Đầu Tiên
                </button>
              </div>
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