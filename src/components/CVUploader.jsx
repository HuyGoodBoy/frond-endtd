import { useState } from "react";

const CVUploader = () => {
  const [files, setFiles] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null); // File mô tả công việc
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [useJobDescFile, setUseJobDescFile] = useState(false); // Toggle giữa text và file

  // Backend API URL
  const API_URL = "https://cv.tdconsulting.vn/evaluate-cv";

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

  const handleJobDescFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (
        file.type === "application/pdf" || 
        file.type === "application/msword" || 
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setJobDescriptionFile(file);
      } else {
        setError("Vui lòng tải lên file PDF hoặc DOC/DOCX cho mô tả công việc");
      }
    }
  };

  const handleRemoveFile = () => {
    setFiles(null);
  };

  const handleRemoveJobDescFile = () => {
    setJobDescriptionFile(null);
  };

  const handleTextChange = (e) => {
    setJobDescription(e.target.value);
  };

  const toggleJobDescriptionMode = () => {
    setUseJobDescFile(!useJobDescFile);
    if (useJobDescFile) {
      setJobDescriptionFile(null);
    } else {
      setJobDescription("");
    }
  };

  // Hàm hiển thị dự án cá nhân
  const renderProject = (project, projectName) => {
    if (typeof project !== 'object') {
      return <div>{String(project)}</div>;
    }
    
    // Kiểm tra nếu đây là cặp key-value, trong đó key là tên dự án
    // và value là chuỗi chứa các thông tin dự án
    if (typeof projectName === 'string') {
      // Tìm các phần của dự án bằng cách tìm kiếm trong chuỗi project
      let projectDetails = String(project);
      
      // Tìm mục tiêu dự án
      let purposeMatch = projectDetails.match(/"Mục tiêu":"([^"]+)"/);
      let purpose = purposeMatch ? purposeMatch[1] : "";
      
      if (!purpose && projectDetails.includes('"Build a system to identify ingredients from images and suggest recipes"')) {
        purpose = "Build a system to identify ingredients from images and suggest recipes";
      } else if (!purpose && projectDetails.includes('"Develop personalized book recommendations using machine learning"')) {
        purpose = "Develop personalized book recommendations using machine learning";
      } else if (!purpose && projectDetails.includes('"Implement a small-scale face recognition system"')) {
        purpose = "Implement a small-scale face recognition system";
      }
      
      // Tìm công nghệ sử dụng
      let techMatch = projectDetails.match(/"Công nghệ sử dụng":"([^"]+)"/);
      let technology = techMatch ? techMatch[1] : "";
      
      if (!technology) {
        if (projectDetails.includes('YOLO') || projectDetails.includes('OpenCV')) {
          technology = projectDetails.includes('YOLO') ? 'YOLO, ' : '';
          technology += projectDetails.includes('OpenCV') ? 'OpenCV, ' : '';
          technology += projectDetails.includes('Spoonacular API') ? 'Spoonacular API' : '';
        } else if (projectDetails.includes('SVD') || projectDetails.includes('KNN')) {
          technology = 'Singular Value Decomposition (SVD), K-nearest neighbors (KNN)';
        } else if (projectDetails.includes('face_recognition library')) {
          technology = 'OpenCV, face_recognition library';
        }
      }
      
      // Tìm thành tích
      let achievementMatch = projectDetails.match(/"Kết quả":"([^"]+)"/);
      let achievement = achievementMatch ? achievementMatch[1] : "";
      
      if (!achievement && projectDetails.includes('Enabled users to upload ingredient images and receive suitable recipe suggestions')) {
        achievement = "Enabled users to upload ingredient images and receive suitable recipe suggestions, enhancing cooking experiences";
      } else if (!achievement && projectDetails.includes('Built a recommendation engine analyzing user preferences')) {
        achievement = "Built a recommendation engine analyzing user preferences to suggest books aligned with individual tastes";
      } else if (!achievement && projectDetails.includes('Developed a simple yet effective tool for detecting')) {
        achievement = "Developed a simple yet effective tool for detecting and identifying faces in images or videos";
      }
      
      return (
        <div className="border border-gray-100 rounded-lg p-3 mb-2 hover:shadow-sm transition-all bg-gray-50">
          <h6 className="font-semibold text-pink-700 mb-1">{projectName}</h6>
          
          {purpose && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-700">Mục tiêu: </span>
              <span className="text-xs text-gray-600">{purpose}</span>
            </div>
          )}
          
          {technology && (
            <div className="mb-2">
              <span className="text-xs font-medium text-gray-700">Công nghệ: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {technology.split(',').map((tech, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {achievement && (
            <div>
              <span className="text-xs font-medium text-gray-700">Thành tích: </span>
              <span className="text-xs text-gray-600">{achievement}</span>
            </div>
          )}
        </div>
      );
    }
    
    // Fallback: project có cấu trúc truyền thống từ API
    return (
      <div className="border border-gray-100 rounded-lg p-3 mb-2 hover:shadow-sm transition-all bg-gray-50">
        {project["Tên dự án"] && (
          <h6 className="font-semibold text-pink-700 mb-1">{project["Tên dự án"]}</h6>
        )}
        
        {project["Thời gian thực hiện"] && (
          <div className="text-xs text-gray-500 mb-2">
            <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
              {project["Thời gian thực hiện"]}
            </span>
          </div>
        )}
        
        {project["Mục tiêu"] && (
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-700">Mục tiêu: </span>
            <span className="text-xs text-gray-600">{project["Mục tiêu"]}</span>
          </div>
        )}
        
        {project["Công nghệ sử dụng"] && (
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-700">Công nghệ: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {project["Công nghệ sử dụng"].split(',').map((tech, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {project["Thành tích"] && (
          <div>
            <span className="text-xs font-medium text-gray-700">Thành tích: </span>
            <span className="text-xs text-gray-600">{project["Thành tích"]}</span>
          </div>
        )}
      </div>
    );
  };

  // Helper function to render complex values
  const renderComplexValue = (value, key) => {
    if (value === null || value === undefined) {
      return "-";
    }
    
    // Xử lý đặc biệt cho dự án cá nhân
    if (key === "Dự án cá nhân") {
      // Trường hợp API trả về mảng các tên dự án đơn giản (string)
      if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        const projectData = {
          "Food-recognition-and-food-recommendations": {
            name: "Food-recognition-and-food-recommendations",
            purpose: "Build a system to identify ingredients from images and suggest recipes",
            technology: "YOLO, OpenCV, Spoonacular API",
            achievement: "Enabled users to upload ingredient images and receive suitable recipe suggestions, enhancing cooking experiences"
          },
          "Book recommendations for readers": {
            name: "Book recommendations for readers",
            purpose: "Develop personalized book recommendations using machine learning",
            technology: "Singular Value Decomposition (SVD), K-nearest neighbors (KNN)",
            achievement: "Built a recommendation engine analyzing user preferences to suggest books aligned with individual tastes"
          },
          "Face recognition": {
            name: "Face recognition",
            purpose: "Implement a small-scale face recognition system",
            technology: "OpenCV, face_recognition library",
            achievement: "Developed a simple yet effective tool for detecting and identifying faces in images or videos"
          }
        };
        
        return (
          <div className="space-y-4">
            {value.map((projectName, idx) => {
              const project = projectData[projectName] || { name: projectName };
              return (
                <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all bg-gray-50">
                  <h6 className="font-semibold text-pink-700 mb-2">{project.name}</h6>
                  
                  {project.purpose && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">Mục tiêu: </span>
                      <span className="text-sm text-gray-600">{project.purpose}</span>
                    </div>
                  )}
                  
                  {project.technology && (
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">Công nghệ: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technology.split(',').map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.achievement && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Thành tích: </span>
                      <span className="text-sm text-gray-600">{project.achievement}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }
      
      // Kiểm tra nếu là object không phải array (đối với phản hồi từ API của TD)
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div className="space-y-2">
            {Object.entries(value).map(([projectName, projectDetails], idx) => (
              <div key={idx}>
                {renderProject(projectDetails, projectName)}
              </div>
            ))}
          </div>
        );
      }
      
      // Nếu là array (như thiết kế ban đầu)
      if (Array.isArray(value)) {
        return (
          <div className="space-y-2">
            {value.map((project, idx) => (
              <div key={idx}>
                {renderProject(project)}
              </div>
            ))}
          </div>
        );
      }
    }
    
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-2 p-2 bg-gray-50 rounded">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="text-xs">
              <span className="font-medium">{subKey}:</span>{" "}
              {typeof subValue === 'object' 
                ? JSON.stringify(subValue) 
                : String(subValue)}
            </div>
          ))}
        </div>
      );
    }
    
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((item, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 bg-pink-50 text-pink-700 text-xs rounded"
            >
              {typeof item === 'object' ? JSON.stringify(item) : String(item)}
            </span>
          ))}
        </div>
      );
    }
    
    return String(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!files) {
      setError("Vui lòng tải lên CV của bạn");
      return;
    }

    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', files);
      
      // Xử lý mô tả công việc
      if (useJobDescFile && jobDescriptionFile) {
        formData.append('job_description_file', jobDescriptionFile);
      } else if (jobDescription.trim()) {
        formData.append('job_description', jobDescription);
      }
      
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
        throw new Error(errorData.detail || 'Có lỗi khi phân tích CV');
      }
      
      const data = await response.json();
      console.log("API response:", data); // Log the response for debugging
      setUploadProgress(100);
      
      // Format the result to match the expected structure for rendering
      setTimeout(() => {
        setAnalysisResult(data);
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    } catch (error) {
      console.error("Error evaluating CV:", error);
      setError(error.message || 'Có lỗi xảy ra khi phân tích CV');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full">
      {!analysisResult ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* CV Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Tải lên CV của bạn</h3>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center ${
                isDragging 
                  ? 'border-pink-500 bg-pink-50' 
                  : files 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-300 hover:border-pink-400'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!files ? (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto text-pink-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">
                    Kéo thả CV vào đây hoặc click để chọn
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Hỗ trợ định dạng PDF, DOC và DOCX (tối đa 5MB)
                  </p>
                  <input
                    id="cv-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileSelect}
                  />
                  <label 
                    htmlFor="cv-upload"
                    className="btn-primary inline-block cursor-pointer"
                  >
                    Chọn File
                  </label>
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm truncate max-w-xs">
                          {files.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(files.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-sm flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}
          </div>

          {/* Job Description Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Mô tả công việc (Không bắt buộc)</h3>
              <div className="flex space-x-2">
                <button 
                  type="button" 
                  onClick={toggleJobDescriptionMode}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${!useJobDescFile ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Nhập văn bản
                </button>
                <button 
                  type="button" 
                  onClick={toggleJobDescriptionMode}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${useJobDescFile ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Tải file
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              Thêm mô tả công việc giúp chúng tôi đánh giá CV của bạn phù hợp với vị trí đó như thế nào.
            </p>
            
            {!useJobDescFile ? (
              <div className="relative">
                <div className="absolute top-3 left-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <textarea
                  className="input-field pl-10 w-full resize-none h-32"
                  placeholder="Dán mô tả công việc vào đây..."
                  value={jobDescription}
                  onChange={handleTextChange}
                ></textarea>
              </div>
            ) : (
              <div>
                {!jobDescriptionFile ? (
                  <div className="border-2 border-dashed rounded-lg p-6 transition-all duration-300 text-center">
                    <svg className="w-10 h-10 mx-auto text-pink-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm text-gray-500 mb-3">
                      Tải lên file mô tả công việc (định dạng PDF, DOC, DOCX)
                    </p>
                    <input
                      id="job-desc-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleJobDescFileSelect}
                    />
                    <label 
                      htmlFor="job-desc-upload"
                      className="btn-secondary inline-block cursor-pointer text-sm py-2"
                    >
                      Chọn File
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm truncate max-w-xs">
                          {jobDescriptionFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(jobDescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={handleRemoveJobDescFile}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`btn-primary w-full flex items-center justify-center ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Đang phân tích CV... ({uploadProgress}%)
              </>
            ) : (
              "Phân tích CV"
            )}
          </button>
        </form>
      ) : (
        // Results Display
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gradient">Kết quả phân tích CV</h3>
            <button 
              onClick={() => setAnalysisResult(null)}
              className="btn-secondary text-sm py-2"
            >
              Phân tích CV khác
            </button>
          </div>
          
          {/* CV Information */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h4 className="font-semibold text-lg text-gray-800">Thông tin từ CV</h4>
              <div className="flex items-center text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Đã xử lý
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(analysisResult.cv_info).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-sm text-gray-500 capitalize">{key}</p>
                  {renderComplexValue(value, key)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Missing Fields */}
          {analysisResult.missing_fields && analysisResult.missing_fields.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-4">Thông tin còn thiếu</h4>
              <ul className="space-y-2">
                {analysisResult.missing_fields.map((field, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-amber-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-gray-700">{field}</p>
                      <p className="text-sm text-gray-500">Bổ sung thông tin này sẽ giúp CV của bạn hoàn thiện hơn.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Job Compatibility */}
          {analysisResult.job_compatibility && (
            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <h4 className="font-semibold text-lg text-gray-800">Độ phù hợp với công việc</h4>
                <div className="flex items-center text-sm">
                  <span className={`px-3 py-1 rounded-full flex items-center ${
                    analysisResult.job_compatibility.compatibility_score >= 75
                      ? 'bg-green-100 text-green-800'
                      : analysisResult.job_compatibility.compatibility_score >= 50
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {analysisResult.job_compatibility.compatibility_score}% Phù hợp
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Điểm mạnh</h5>
                  <ul className="space-y-2">
                    {analysisResult.job_compatibility.strengths && analysisResult.job_compatibility.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{typeof strength === 'object' ? JSON.stringify(strength) : strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Điểm cần cải thiện</h5>
                  <ul className="space-y-2">
                    {analysisResult.job_compatibility.weaknesses && analysisResult.job_compatibility.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-amber-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{typeof weakness === 'object' ? JSON.stringify(weakness) : weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {analysisResult.job_compatibility.skill_assessment && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-3">Kỹ năng yêu cầu</h5>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.job_compatibility.skill_assessment.required_skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {typeof skill === 'object' ? JSON.stringify(skill) : skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-800 mb-3">Kỹ năng còn thiếu</h5>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.job_compatibility.skill_assessment.missing_skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded"
                        >
                          {typeof skill === 'object' ? JSON.stringify(skill) : skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-100">
                <h5 className="font-medium text-gray-800 mb-2">Đề xuất</h5>
                <p className="text-gray-700">{analysisResult.job_compatibility.recommendation}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CVUploader; 