import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

const CompanyUploader = ({ initialAnalysis }) => {
  const [files, setFiles] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(initialAnalysis);
  const [error, setError] = useState(null);

  // Backend API URL
  const API_URL = "https://cv.tdconsulting.vn/evaluate-company";

  useEffect(() => {
    setAnalysisResult(initialAnalysis);
  }, [initialAnalysis]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileArray = Array.from(e.dataTransfer.files).filter(
        file => file.type === "application/pdf" || 
                file.type === "application/msword" || 
                file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      
      if (fileArray.length > 0) {
        setFiles(fileArray[0]);
        setError(null);
      } else {
        setError("Vui lòng tải lên file PDF hoặc DOC/DOCX");
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type === "application/pdf" || 
        file.type === "application/msword" || 
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFiles(file);
        setError(null);
      } else {
        setError("Vui lòng tải lên file PDF hoặc DOC/DOCX");
      }
    }
  };

  const handleRemoveFile = () => {
    setFiles(null);
  };

  // Helper function to render complex values
  const renderComplexValue = (value, key) => {
    if (value === null || value === undefined) {
      return "-";
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="flex items-center text-sm">
              <span className="font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded mr-2">
                {subKey}
              </span>
              <span className="text-gray-600">
                {typeof subValue === 'object' ? JSON.stringify(subValue) : String(subValue)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, idx) => {
            const colors = [
              'bg-blue-50 text-blue-700',
              'bg-green-50 text-green-700',
              'bg-purple-50 text-purple-700',
              'bg-yellow-50 text-yellow-700',
              'bg-pink-50 text-pink-700',
              'bg-indigo-50 text-indigo-700'
            ];
            const colorClass = colors[idx % colors.length];
            
            return (
              <span 
                key={idx} 
                className={`px-3 py-1 rounded-full text-sm ${colorClass}`}
              >
                {typeof item === 'object' ? JSON.stringify(item) : String(item)}
              </span>
            );
          })}
        </div>
      );
    }
    
    return (
      <span className="text-gray-700">{String(value)}</span>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files) {
      setError("Vui lòng tải lên mô tả công việc (JD)");
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', files);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return newProgress;
        });
      }, 300);
      
      // Make API call to backend
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Có lỗi khi phân tích mô tả công việc');
      }
      
      const data = await response.json();
      setUploadProgress(100);
      
      setTimeout(() => {
        setAnalysisResult(data);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Error evaluating JD:", error);
      setError(error.message || 'Có lỗi xảy ra khi phân tích mô tả công việc');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const exportToExcel = () => {
    if (!analysisResult || !analysisResult.company_info) return;

    // Chuẩn bị dữ liệu cho Excel
    const data = [];
    
    // Thêm thông tin cơ bản
    if (analysisResult.company_info["thông_tin_cơ_bản"]) {
      Object.entries(analysisResult.company_info["thông_tin_cơ_bản"]).forEach(([key, value]) => {
        data.push({
          "Mục": key === "tên_công_ty" ? "Tên Công Ty" :
                 key === "lĩnh_vực_hoạt_động" ? "Lĩnh Vực Hoạt Động" :
                 key === "quy_mô_nhân_sự" ? "Quy Mô Nhân Sự" :
                 key === "địa_chỉ" ? "Địa Chỉ" :
                 key === "năm_thành_lập" ? "Năm Thành Lập" :
                 key.replace(/_/g, ' '),
          "Giá trị": value || ""
        });
      });
    }

    // Thêm thông tin tài chính
    if (analysisResult.company_info["thông_tin_tài_chính"]) {
      Object.entries(analysisResult.company_info["thông_tin_tài_chính"]).forEach(([key, value]) => {
        data.push({
          "Mục": key === "doanh_thu" ? "Doanh Thu" :
                 key === "vốn_điều_lệ" ? "Vốn Điều Lệ" :
                 key === "tình_hình_tài_chính" ? "Tình Hình Tài Chính" :
                 key.replace(/_/g, ' '),
          "Giá trị": value || ""
        });
      });
    }

    // Thêm văn hóa môi trường
    if (analysisResult.company_info["văn_hóa_môi_trường"]) {
      Object.entries(analysisResult.company_info["văn_hóa_môi_trường"]).forEach(([key, value]) => {
        data.push({
          "Mục": key === "giá_trị_cốt_lõi" ? "Giá Trị Cốt Lõi" :
                 key === "chế_độ_phúc_lợi" ? "Chế Độ Phúc Lợi" :
                 key === "môi_trường_làm_việc" ? "Môi Trường Làm Việc" :
                 key === "cơ_hội_phát_triển" ? "Cơ Hội Phát Triển" :
                 key.replace(/_/g, ' '),
          "Giá trị": value || ""
        });
      });
    }

    // Thêm đánh giá
    if (analysisResult.company_info["đánh_giá"]) {
      Object.entries(analysisResult.company_info["đánh_giá"]).forEach(([key, value]) => {
        data.push({
          "Mục": key === "điểm_mạnh" ? "Điểm Mạnh" :
                 key === "điểm_yếu" ? "Điểm Yếu" :
                 key === "cơ_hội" ? "Cơ Hội" :
                 key === "thách_thức" ? "Thách Thức" :
                 key.replace(/_/g, ' '),
          "Giá trị": Array.isArray(value) ? value.join("\n") : value || ""
        });
      });
    }

    // Thêm đề xuất cải thiện
    if (analysisResult.recommendations) {
      analysisResult.recommendations.forEach((rec, index) => {
        data.push({
          "Mục": `Đề xuất ${index + 1}`,
          "Giá trị": `${rec.category}: ${rec.content}`
        });
      });
    }

    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mô tả công việc");

    // Tự động điều chỉnh độ rộng cột
    const maxWidth = data.reduce((w, r) => Math.max(w, r["Giá trị"].length), 10);
    ws["!cols"] = [
      { wch: 20 },  // Độ rộng cột Mục
      { wch: maxWidth }  // Độ rộng cột Giá trị
    ];

    // Xuất file
    const fileName = `Thong_tin_doanh_nghiep_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="w-full">
      {!analysisResult ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* File Upload Section */}
          <div className="space-y-4">
            <div 
              className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center ${
                isDragging 
                  ? 'border-pink-500 bg-pink-50 scale-[1.02]' 
                  : files 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-pink-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`text-4xl transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                  {files ? '📄' : '📁'}
                </div>
                <div className="text-center">
                  <p className="text-gray-600 mb-2">
                    {files
                      ? `Đã chọn: ${files.name}`
                      : "Kéo thả file hoặc click để tải lên"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Hỗ trợ file PDF, DOC, DOCX
                  </p>
                </div>
                {!files && (
                  <label className="cursor-pointer px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300">
                    Chọn File
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                  </label>
                )}
                {files && (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-600 transition-colors duration-300"
                  >
                    Xóa file
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-center animate-shake">
                {error}
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Đang phân tích... {uploadProgress}%
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!files || isUploading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 transform hover:scale-[1.02] ${
                !files || isUploading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-700 hover:shadow-lg'
              }`}
            >
              {isUploading ? "Đang xử lý..." : "Phân tích JD"}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Kết Quả Phân Tích
                </h3>
                <button
                  onClick={exportToExcel}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center space-x-2"
                >
                  <span>📊</span>
                  <span>Xuất Excel</span>
                </button>
              </div>
              
              {/* Company Info */}
              <div className="space-y-6">
                {Object.entries(analysisResult.company_info).map(([section, data]) => (
                  <div key={section} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">
                      {section === "thông_tin_cơ_bản" ? "Thông Tin Cơ Bản" :
                       section === "thông_tin_tài_chính" ? "Thông Tin Tài Chính" :
                       section === "văn_hóa_môi_trường" ? "Văn Hóa Môi Trường" :
                       section === "đánh_giá" ? "Đánh Giá" :
                       section.replace(/_/g, ' ')}
                    </h4>
                    <div className="grid gap-4">
                      {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="flex flex-col space-y-1">
                          <span className="text-sm font-medium text-gray-600">
                            {key === "tên_công_ty" ? "Tên Công Ty" :
                             key === "lĩnh_vực_hoạt_động" ? "Lĩnh Vực Hoạt Động" :
                             key === "quy_mô_nhân_sự" ? "Quy Mô Nhân Sự" :
                             key === "địa_chỉ" ? "Địa Chỉ" :
                             key === "năm_thành_lập" ? "Năm Thành Lập" :
                             key === "vốn_điều_lệ" ? "Vốn Điều Lệ" :
                             key === "tình_hình_tài_chính" ? "Tình Hình Tài Chính" :
                             key === "giá_trị_cốt_lõi" ? "Giá Trị Cốt Lõi" :
                             key === "chế_độ_phúc_lợi" ? "Chế Độ Phúc Lợi" :
                             key === "môi_trường_làm_việc" ? "Môi Trường Làm Việc" :
                             key === "cơ_hội_phát_triển" ? "Cơ Hội Phát Triển" :
                             key === "điểm_mạnh" ? "Điểm Mạnh" :
                             key === "điểm_yếu" ? "Điểm Yếu" :
                             key === "cơ_hội" ? "Cơ Hội" :
                             key === "thách_thức" ? "Thách Thức" :
                             key.replace(/_/g, ' ')}
                          </span>
                          {renderComplexValue(value, key)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Missing Fields */}
              {analysisResult.missing_fields.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="text-lg font-medium text-yellow-800 mb-3">
                    Thông Tin Cần Bổ Sung
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missing_fields.map((field, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="text-lg font-medium text-green-800 mb-3">
                    Đề Xuất Cải Thiện
                  </h4>
                  <div className="space-y-4">
                    {analysisResult.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {rec.category}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {rec.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => setAnalysisResult(null)}
            className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
          >
            Phân tích JD khác
          </button>
        </div>
      )}

      <style jsx="true">{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CompanyUploader; 