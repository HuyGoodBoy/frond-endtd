import CVUploader from "../components/CVUploader";

const CVEvaluationPage = () => {
  return (
    <div className="container mx-auto py-10 bg-gradient-to-r from-pink-50 to-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#E50087]">Đánh giá CV</h1>
        <p className="text-gray-600">
          Tải lên CV của bạn để nhận phản hồi và đánh giá chi tiết từ AI
        </p>
        <p className="text-gray-600 mt-2">
          Bạn có thể cung cấp mô tả công việc (tải file hoặc nhập văn bản) để hệ thống đánh giá độ phù hợp của CV với vị trí
        </p>
      </div>
      
      <CVUploader />
      
      <div className="mt-12 max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 text-[#E50087]">Cách thức hoạt động</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-pink-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="font-bold text-lg mb-2 text-[#E50087]">1. Tải lên</div>
            <p>Tải lên CV và cung cấp mô tả công việc (nếu có)</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="font-bold text-lg mb-2 text-[#E50087]">2. Phân tích</div>
            <p>AI phân tích nội dung CV và mô tả công việc</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="font-bold text-lg mb-2 text-[#E50087]">3. Kết quả</div>
            <p>Nhận đánh giá CV chi tiết và mức độ phù hợp với công việc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVEvaluationPage; 