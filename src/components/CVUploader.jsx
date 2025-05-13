import { useState } from "react";

const CVUploader = () => {
  const [file, setFile] = useState(null);
  const [jobDescFile, setJobDescFile] = useState(null);
  const [jobDescText, setJobDescText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // API endpoint configuration
  const API_BASE_URL = "https://cv.tdconsulting.vn";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleJobDescFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setJobDescFile(selectedFile);
      setJobDescText(""); // Clear text input when file is selected
      setResult(null);
      setError(null);
    }
  };

  const clearJobDescFile = () => {
    setJobDescFile(null);
    // Reset the file input by creating a new ref
    const fileInput = document.getElementById('job-desc-file');
    if (fileInput) fileInput.value = '';
  };

  const handleJobDescTextChange = (e) => {
    setJobDescText(e.target.value);
    if (e.target.value.trim() !== "" && jobDescFile) {
      clearJobDescFile(); // Clear file input when text is entered
    }
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Vui lòng chọn file CV trước khi đánh giá");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      
      // Nếu có file mô tả công việc, thêm vào formData
      if (jobDescFile) {
        formData.append("job_description_file", jobDescFile);
      }
      
      // Nếu có text mô tả công việc, thêm vào formData
      if (jobDescText) {
        formData.append("job_description", jobDescText);
      }

      const response = await fetch(`${API_BASE_URL}/evaluate-cv`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || `Lỗi: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error evaluating CV:", err);
      setError(err.message || "Không thể đánh giá CV. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-pink-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#E50087]">Công cụ đánh giá CV</h2>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tải lên CV của bạn (định dạng: .txt, .pdf, .doc, .docx)
            </label>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#E50087] focus:ring-1 focus:ring-[#E50087]"
            />
            <p className="text-xs text-gray-500 mt-1">
              * Lưu ý: Tệp PDF sẽ được chuyển đổi thành văn bản. Định dạng phức tạp có thể bị mất.
            </p>
          </div>
          
          <div className="mb-6 mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-[#E50087]">Mô tả công việc (Tùy chọn)</h3>
            <p className="mb-4 text-sm text-gray-600">Vui lòng chọn <strong>một trong hai</strong> cách để cung cấp mô tả công việc:</p>
            
            <div className="mb-4">
              <label className="flex items-center justify-between text-gray-700 text-sm font-bold mb-2">
                <span>Tùy chọn 1: Tải lên file (định dạng: .pdf)</span>
                {jobDescText && (
                  <span className="text-xs text-orange-500">
                    Đã bị vô hiệu hóa do bạn đã nhập text ở tùy chọn 2
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  id="job-desc-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleJobDescFileChange}
                  disabled={jobDescText !== ""}
                  className={`w-full p-3 border rounded-lg focus:border-[#E50087] focus:ring-1 focus:ring-[#E50087] ${
                    jobDescText !== "" 
                      ? "bg-gray-100 cursor-not-allowed border-gray-200" 
                      : "border-gray-300"
                  }`}
                />
                {jobDescFile && (
                  <button 
                    type="button"
                    onClick={clearJobDescFile}
                    className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              {jobDescFile && (
                <p className="text-xs text-green-600 mt-1">
                  Đã chọn file: {jobDescFile.name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                * Chọn tệp PDF chứa mô tả công việc để đánh giá độ phù hợp
              </p>
            </div>
            
            <div className="mb-4">
              <label className="flex items-center justify-between text-gray-700 text-sm font-bold mb-2">
                <span>Tùy chọn 2: Nhập nội dung</span>
                {jobDescFile && (
                  <span className="text-xs text-orange-500">
                    Đã bị vô hiệu hóa do bạn đã chọn file ở tùy chọn 1
                  </span>
                )}
              </label>
              <textarea
                value={jobDescText}
                onChange={handleJobDescTextChange}
                disabled={jobDescFile !== null}
                placeholder="Nhập mô tả công việc tại đây..."
                className={`w-full p-3 border rounded-lg focus:border-[#E50087] focus:ring-1 focus:ring-[#E50087] h-32 ${
                  jobDescFile !== null 
                    ? "bg-gray-100 cursor-not-allowed border-gray-200" 
                    : "border-gray-300"
                }`}
              />
              <p className="text-xs text-gray-500 mt-1">
                * Nhập nội dung mô tả công việc trực tiếp để đánh giá độ phù hợp
              </p>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E50087] hover:bg-[#d10079] text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-pink-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang đánh giá...
              </span>
            ) : "Đánh giá CV"}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-pink-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#E50087]">Kết quả đánh giá</h3>
            
            {/* Hiển thị thông tin CV */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-[#E50087]">Thông tin CV:</h4>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {result.cv_info && Object.entries(result.cv_info).map(([key, value]) => (
                  <div key={key} className="mb-3 pb-2 border-b border-gray-100">
                    <div className="font-semibold text-[#E50087] mb-1">{key}:</div>
                    {value === null ? (
                      <span className="text-gray-500 italic">Không có thông tin</span>
                    ) : Array.isArray(value) ? (
                      <ul className="list-disc pl-5">
                        {value.map((item, index) => (
                          <li key={index} className="mb-1">
                            {typeof item === 'object' ? (
                              <div className="pl-2">
                                {Object.entries(item).map(([itemKey, itemValue]) => (
                                  <div key={itemKey} className="mb-1">
                                    <span className="font-medium">{itemKey}: </span>
                                    <span>{itemValue}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              item
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : typeof value === 'object' ? (
                      <div className="pl-2">
                        {Object.entries(value).map(([objKey, objValue]) => (
                          <div key={objKey} className="mb-1">
                            <span className="font-medium">{objKey}: </span>
                            <span>{objValue}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hiển thị các trường thiếu */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-[#E50087]">Các trường thông tin thiếu:</h4>
              <ul className="list-disc pl-5 bg-white p-4 rounded-lg shadow-sm">
                {result.missing_fields && result.missing_fields.map((field, index) => (
                  <li key={index} className="text-gray-700 mb-1">{field}</li>
                ))}
              </ul>
            </div>
            
            {/* Hiển thị đánh giá độ phù hợp nếu có */}
            {result.job_compatibility && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-[#E50087]">Đánh giá độ phù hợp với công việc:</h4>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="mb-3">
                    <span className="font-semibold">Điểm số phù hợp: </span>
                    <span className="text-xl font-bold text-[#E50087]">{result.job_compatibility.compatibility_score}%</span>
                  </div>
                  
                  {result.job_compatibility.strengths && (
                    <div className="mb-3">
                      <h5 className="font-semibold mb-1">Điểm mạnh:</h5>
                      <ul className="list-disc pl-5">
                        {result.job_compatibility.strengths.map((item, index) => (
                          <li key={index} className="text-gray-700 mb-1">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.job_compatibility.weaknesses && (
                    <div className="mb-3">
                      <h5 className="font-semibold mb-1">Điểm yếu:</h5>
                      <ul className="list-disc pl-5">
                        {result.job_compatibility.weaknesses.map((item, index) => (
                          <li key={index} className="text-gray-700 mb-1">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.job_compatibility.skill_assessment && (
                    <div className="mb-3">
                      <h5 className="font-semibold mb-1">Đánh giá kỹ năng:</h5>
                      <div className="pl-2">
                        <div className="mb-1">
                          <span className="font-medium">Kỹ năng yêu cầu: </span>
                          <span>{result.job_compatibility.skill_assessment.required_skills.join(", ")}</span>
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">Kỹ năng phù hợp: </span>
                          <span>{result.job_compatibility.skill_assessment.matching_skills.join(", ")}</span>
                        </div>
                        <div className="mb-1">
                          <span className="font-medium">Kỹ năng còn thiếu: </span>
                          <span>{result.job_compatibility.skill_assessment.missing_skills.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {result.job_compatibility.recommendation && (
                    <div>
                      <h5 className="font-semibold mb-1">Đề xuất:</h5>
                      <p className="text-gray-700">{result.job_compatibility.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CVUploader; 