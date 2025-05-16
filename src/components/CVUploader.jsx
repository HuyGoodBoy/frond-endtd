import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

const CVUploader = ({ initialAnalysis }) => {
  const [files, setFiles] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null); // File mô tả công việc
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(initialAnalysis);
  const [error, setError] = useState(null);
  const [useJobDescFile, setUseJobDescFile] = useState(false); // Toggle giữa text và file

  // Backend API URL
  const API_URL = "http://localhost:8000/evaluate-cv";

  // Cập nhật kết quả khi initialAnalysis thay đổi
  useEffect(() => {
    setAnalysisResult(initialAnalysis);
  }, [initialAnalysis]);

  // Hàm lưu kết quả phân tích vào localStorage
  const saveAnalysisToHistory = (result, fileName) => {
    try {
      const history = JSON.parse(localStorage.getItem('cvAnalysisHistory') || '[]');
      const newAnalysis = {
        id: Date.now(),
        date: new Date().toISOString(),
        fileName: fileName,
        result: result
      };
      
      // Giới hạn lịch sử lưu trữ 10 kết quả gần nhất
      if (history.length >= 10) {
        history.pop(); // Xóa kết quả cũ nhất
      }
      
      history.unshift(newAnalysis); // Thêm kết quả mới nhất vào đầu
      localStorage.setItem('cvAnalysisHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving analysis to history:', error);
    }
  };

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

  // Hàm xử lý và định dạng dự án cá nhân
  const formatPersonalProjects = (projects) => {
    if (!projects) return [];
    
    // Nếu là chuỗi, tách thành các dự án riêng biệt
    if (typeof projects === 'string') {
      const projectsStr = projects.replace(/\\"/g, '"');
      const projectsList = [];
      
      // Tách các dự án dựa trên pattern
      const projectMatches = projectsStr.match(/([^:]+):\s*([^.]+)\./g);
      
      if (projectMatches) {
        projectMatches.forEach(match => {
          const [name, description] = match.split(':').map(s => s.trim());
          projectsList.push({
            ten_du_an: name.replace(/\.$/, ''),
            mo_ta: description.replace(/\.$/, '')
          });
        });
      }
      
      return projectsList;
    }
    
    // Nếu là mảng, giữ nguyên cấu trúc
    if (Array.isArray(projects)) {
      return projects;
    }
    
    // Nếu là object, chuyển thành mảng
    if (typeof projects === 'object') {
      return Object.values(projects);
    }
    
    return [];
  };

  // Hàm render dự án cá nhân
  const renderPersonalProjects = (projectsData) => {
    const projects = formatPersonalProjects(projectsData);
    
    if (!projects.length) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
        <div className="border-b border-gray-100">
          <div className="px-6 py-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Dự Án Cá Nhân
            </h4>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all">
                <h5 className="font-semibold text-indigo-700 mb-3">
                  {project.ten_du_an || project.name || "Dự án không xác định"}
                </h5>
                <div className="space-y-3">
                  {(project.mo_ta || project.description) && (
                    <div className="flex items-start">
                      <span className="text-sm font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded mr-2 whitespace-nowrap">
                        Mô tả
                      </span>
                      <span className="text-gray-700">{project.mo_ta || project.description}</span>
                    </div>
                  )}
                  {(project.cong_nghe || project.technologies) && (
                    <div>
                      <span className="text-sm font-medium bg-green-50 text-green-700 px-2 py-1 rounded mr-2">
                        Công nghệ sử dụng
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(project.cong_nghe || project.technologies).split(',').map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {(project.ket_qua || project.results) && (
                    <div className="flex items-start">
                      <span className="text-sm font-medium bg-purple-50 text-purple-700 px-2 py-1 rounded mr-2 whitespace-nowrap">
                        Kết quả
                      </span>
                      <span className="text-gray-700">{project.ket_qua || project.results}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Helper function để format key thành label dễ đọc
  const formatFieldKey = (key) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Hàm render giá trị phức tạp
  const renderComplexValue = (value, key) => {
    if (!value || value === 'undefined' || value === 'null' || value === 'Không có thông tin') {
      return <span className="text-gray-400 italic">Chưa có thông tin</span>;
    }

    // Xử lý object
    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div className="space-y-3">
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="flex items-start">
              <span className="text-sm font-medium bg-pink-50 text-pink-700 px-2 py-1 rounded mr-2 whitespace-nowrap">
                {formatFieldKey(subKey)}
              </span>
              <span className="text-gray-700">
                {typeof subValue === 'object' ? renderComplexValue(subValue, subKey) : String(subValue)}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Xử lý array
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, idx) => {
            const colors = [
              'bg-pink-50 text-pink-700',
              'bg-blue-50 text-blue-700', 
              'bg-green-50 text-green-700',
              'bg-purple-50 text-purple-700',
              'bg-yellow-50 text-yellow-700',
              'bg-indigo-50 text-indigo-700'
            ];
            const colorClass = colors[idx % colors.length];
            return (
              <span key={idx} className={`px-3 py-1 rounded-lg text-sm ${colorClass}`}>
                {typeof item === 'object' ? renderComplexValue(item) : String(item)}
              </span>
            );
          })}
        </div>
      );
    }

    return <span className="text-gray-700">{String(value)}</span>;
  };

  // Cấu trúc hiển thị thông tin CV
  const CV_INFO_STRUCTURE = {
    thong_tin_ca_nhan: {
      label: "Thông Tin Cá Nhân",
      fields: {
        ho_va_ten: "Họ và Tên",
        nam_sinh: "Năm Sinh",
        noi_o: "Nơi Ở",
        sdt: "Số Điện Thoại",
        email: "Email"
      }
    },
    hoc_van: {
      label: "Học Vấn",
      fields: {
        bang_cap: "Bằng Cấp",
        chuyen_nganh: "Chuyên Ngành",
        truong: "Trường",
        thoi_gian_hoc: "Thời Gian Học",
        diem_gpa: "Điểm GPA",
        trinh_do_tieng_anh: "Trình Độ Tiếng Anh",
        chung_chi_chuyen_mon: "Chứng Chỉ Chuyên Môn"
      }
    },
    kinh_nghiem: {
      label: "Kinh Nghiệm Làm Việc",
      fields: {
        ten_cong_ty: "Tên Công Ty",
        thoi_gian_lam_viec: "Thời Gian Làm Việc",
        vi_tri_dam_nhan: "Vị Trí Đảm Nhận",
        mo_ta_cong_viec: "Mô Tả Công Việc",
        thanh_tich: "Thành Tích",
        ly_do_nghi_viec: "Lý Do Nghỉ Việc"
      }
    },
    ky_nang: {
      label: "Kỹ Năng",
      fields: {
        ky_nang_chuyen_mon: "Kỹ Năng Chuyên Môn",
        ky_nang_mem: "Kỹ Năng Mềm",
        cong_nghe: "Công Nghệ Thành Thạo"
      }
    },
    du_an: {
      label: "Dự Án Cá Nhân",
      fields: {
        ten_du_an: "Tên Dự Án",
        mo_ta: "Mô Tả",
        cong_nghe: "Công Nghệ Sử Dụng",
        ket_qua: "Kết Quả Đạt Được"
      }
    },
    thong_tin_khac: {
      label: "Thông Tin Khác",
      fields: {
        muc_luong_hien_tai: "Mức Lương Hiện Tại",
        muc_luong_mong_muon: "Mức Lương Mong Muốn",
        dinh_huong_muc_tieu: "Định Hướng/Mục Tiêu",
        ngay_co_the_di_lam: "Ngày Có Thể Đi Làm",
        diem_manh_chinh: "Điểm Mạnh Chính"
      }
    }
  };

  // Hàm render section CV
  const renderCVSection = (sectionKey, data) => {
    const sectionConfig = CV_INFO_STRUCTURE[sectionKey];
    if (!sectionConfig || !data) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="px-6 py-4">
            <h4 className="text-lg font-semibold text-gray-800">
              {sectionConfig.label}
            </h4>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Object.entries(sectionConfig.fields).map(([fieldKey, label]) => (
            <div key={fieldKey} className="space-y-2">
              <div className="flex items-center">
                <h5 className="text-gray-700 font-medium">{label}</h5>
              </div>
              <div className="pl-4 border-l-2 border-pink-100">
                {renderComplexValue(data[fieldKey])}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Hàm render kinh nghiệm làm việc
  const renderExperience = (experiences) => {
    if (!experiences || !Array.isArray(experiences)) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="px-6 py-4">
            <h4 className="text-lg font-semibold text-gray-800">Kinh Nghiệm Làm Việc</h4>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-4 border-l-2 border-pink-100">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-pink-100 border-2 border-pink-500"></div>
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-800">{exp.ten_cong_ty || "Không xác định"}</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Thời gian làm việc</div>
                    <div>{exp.thoi_gian_lam_viec || "Không xác định"}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Vị trí đảm nhận</div>
                    <div>{exp.vi_tri_dam_nhan || "Không xác định"}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Mô tả công việc</div>
                  <div className="text-gray-700">{exp.mo_ta_cong_viec || "Không có mô tả"}</div>
                </div>
                {exp.thanh_tich && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Thành tích</div>
                    <div className="text-gray-700">{exp.thanh_tich}</div>
                  </div>
                )}
                {exp.ly_do_nghi_viec && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Lý do nghỉ việc</div>
                    <div className="text-gray-700">{exp.ly_do_nghi_viec}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Hàm render độ tương thích với công việc
  const renderJobCompatibility = (compatibility) => {
    if (!compatibility) return null;

    // Hàm chọn màu dựa trên điểm phần trăm
    const getScoreColor = (score) => {
      if (score >= 80) return 'text-green-600 bg-green-50';
      if (score >= 60) return 'text-yellow-600 bg-yellow-50';
      return 'text-red-600 bg-red-50';
    };

    // Hàm render thanh tiến trình
    const renderProgressBar = (score) => {
      const percentage = Math.min(Math.max(score, 0), 100); // Đảm bảo giá trị từ 0-100
      const barColor = 
        percentage >= 80 ? 'bg-green-500' :
        percentage >= 60 ? 'bg-yellow-500' :
        'bg-red-500';

      return (
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${barColor} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      );
    };

    // Hàm render danh sách kỹ năng
    const renderSkillsList = (skills, label, colorClass) => {
      if (!skills || !skills.length) return null;
      return (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">{label}</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className={`px-3 py-1 rounded-lg text-sm ${colorClass}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="px-6 py-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Độ Tương Thích Với Công Việc
            </h4>
          </div>
        </div>
        <div className="p-6 space-y-6">
          {/* Điểm tương thích */}
          {compatibility.compatibility_score && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Độ tương thích:</div>
                <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(compatibility.compatibility_score)}`}>
                  {compatibility.compatibility_score}%
                </div>
              </div>
              {renderProgressBar(compatibility.compatibility_score)}
              <div className="text-sm text-gray-500 mt-1">
                {compatibility.compatibility_score >= 80 ? 'Rất phù hợp với vị trí' :
                 compatibility.compatibility_score >= 60 ? 'Tương đối phù hợp với vị trí' :
                 'Chưa thực sự phù hợp với vị trí'}
              </div>
            </div>
          )}

          {/* Điểm mạnh */}
          {compatibility.strengths && (
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Điểm mạnh</h5>
              <div className="pl-4 border-l-2 border-green-200">
                {Array.isArray(compatibility.strengths) ? (
                  <ul className="space-y-2">
                    {compatibility.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-700">{compatibility.strengths}</div>
                )}
              </div>
            </div>
          )}

          {/* Điểm yếu */}
          {compatibility.weaknesses && (
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Điểm yếu</h5>
              <div className="pl-4 border-l-2 border-red-200">
                {Array.isArray(compatibility.weaknesses) ? (
                  <ul className="space-y-2">
                    {compatibility.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-700">{compatibility.weaknesses}</div>
                )}
              </div>
            </div>
          )}

          {/* Đánh giá kỹ năng */}
          {compatibility.skill_assessment && (
            <div className="space-y-4">
              <h5 className="font-medium text-gray-800">Đánh Giá Kỹ Năng</h5>
              <div className="space-y-4">
                {/* Kỹ năng yêu cầu */}
                {renderSkillsList(
                  compatibility.skill_assessment.required_skills,
                  "Kỹ năng yêu cầu",
                  "bg-blue-50 text-blue-700"
                )}
                {/* Kỹ năng phù hợp */}
                {renderSkillsList(
                  compatibility.skill_assessment.matching_skills,
                  "Kỹ năng phù hợp",
                  "bg-green-50 text-green-700"
                )}
                {/* Kỹ năng còn thiếu */}
                {renderSkillsList(
                  compatibility.skill_assessment.missing_skills,
                  "Kỹ năng còn thiếu",
                  "bg-red-50 text-red-700"
                )}
              </div>
            </div>
          )}

          {/* Khuyến nghị */}
          {compatibility.recommendation && (
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">Khuyến nghị</h5>
              <div className={`p-4 rounded-lg ${
                compatibility.recommendation === 'Từ chối' ? 'bg-red-50' : 
                compatibility.recommendation === 'Cân nhắc' ? 'bg-yellow-50' : 'bg-green-50'
              }`}>
                <div className="flex items-center">
                  <svg className={`w-5 h-5 mr-2 ${
                    compatibility.recommendation === 'Từ chối' ? 'text-red-500' :
                    compatibility.recommendation === 'Cân nhắc' ? 'text-yellow-500' : 'text-green-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {compatibility.recommendation === 'Từ chối' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : compatibility.recommendation === 'Cân nhắc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    )}
                  </svg>
                  <span className={`font-medium ${
                    compatibility.recommendation === 'Từ chối' ? 'text-red-700' :
                    compatibility.recommendation === 'Cân nhắc' ? 'text-yellow-700' : 'text-green-700'
                  }`}>
                    {compatibility.recommendation}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
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
      console.log("API response:", data);
      
      setUploadProgress(100);
      
      // Format the result to match the expected structure for rendering
      setTimeout(() => {
        setAnalysisResult(data);
        // Lưu kết quả vào lịch sử
        saveAnalysisToHistory(data, files.name);
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

  const exportToExcel = () => {
    if (!analysisResult || !analysisResult.cv_info) return;

    // Định nghĩa các trường thông tin chuẩn
    const standardFields = {
      thong_tin_ca_nhan: [
        { key: 'ho_va_ten', label: 'Họ và tên' },
        { key: 'nam_sinh', label: 'Năm sinh' },
        { key: 'noi_o', label: 'Nơi ở' },
        { key: 'sdt', label: 'Số điện thoại' },
        { key: 'email', label: 'Email' }
      ],
      hoc_van: [
        { key: 'bang_cap', label: 'Bằng cấp' },
        { key: 'chuyen_nganh', label: 'Chuyên ngành' },
        { key: 'truong', label: 'Trường' },
        { key: 'thoi_gian_hoc', label: 'Thời gian học' },
        { key: 'diem_gpa', label: 'Điểm GPA' },
        { key: 'trinh_do_tieng_anh', label: 'Trình độ tiếng Anh' },
        { key: 'chung_chi_chuyen_mon', label: 'Chứng chỉ chuyên môn' }
      ],
      kinh_nghiem: [
        { key: 'ten_cong_ty', label: 'Tên công ty' },
        { key: 'thoi_gian_lam_viec', label: 'Thời gian làm việc' },
        { key: 'vi_tri_dam_nhan', label: 'Vị trí đảm nhận' },
        { key: 'mo_ta_cong_viec', label: 'Mô tả công việc' },
        { key: 'thanh_tich', label: 'Thành tích' },
        { key: 'ly_do_nghi_viec', label: 'Lý do nghỉ việc' }
      ],
      ky_nang: [
        { key: 'ky_nang_chuyen_mon', label: 'Kỹ năng chuyên môn' },
        { key: 'ky_nang_mem', label: 'Kỹ năng mềm' },
        { key: 'cong_nghe', label: 'Công nghệ thành thạo' }
      ],
      thong_tin_khac: [
        { key: 'muc_luong_hien_tai', label: 'Mức lương hiện tại' },
        { key: 'muc_luong_mong_muon', label: 'Mức lương mong muốn' },
        { key: 'dinh_huong_muc_tieu', label: 'Định hướng/mục tiêu' },
        { key: 'ngay_co_the_di_lam', label: 'Ngày có thể đi làm' },
        { key: 'diem_manh_chinh', label: 'Điểm mạnh chính trong công việc' }
      ]
    };

    // Chuẩn bị dữ liệu cho Excel
    const data = [];
    
    // Thêm tiêu đề
    data.push({ "Trường thông tin": "THÔNG TIN CV", "Giá trị": "" });

    // Thêm thông tin cá nhân
    data.push({ "Trường thông tin": "THÔNG TIN CÁ NHÂN", "Giá trị": "" });
    standardFields.thong_tin_ca_nhan.forEach(field => {
      data.push({
        "Trường thông tin": field.label,
        "Giá trị": analysisResult.cv_info.thong_tin_ca_nhan?.[field.key] || ""
      });
    });

    // Thêm học vấn
    data.push({ "Trường thông tin": "HỌC VẤN", "Giá trị": "" });
    standardFields.hoc_van.forEach(field => {
      data.push({
        "Trường thông tin": field.label,
        "Giá trị": analysisResult.cv_info.hoc_van?.[field.key] || ""
      });
    });

    // Thêm kinh nghiệm làm việc
    data.push({ "Trường thông tin": "KINH NGHIỆM LÀM VIỆC", "Giá trị": "" });
    if (analysisResult.cv_info.kinh_nghiem && Array.isArray(analysisResult.cv_info.kinh_nghiem)) {
      analysisResult.cv_info.kinh_nghiem.forEach((exp, index) => {
        data.push({ "Trường thông tin": `Công ty ${index + 1}`, "Giá trị": "" });
        standardFields.kinh_nghiem.forEach(field => {
          data.push({
            "Trường thông tin": field.label,
            "Giá trị": exp[field.key] || ""
          });
        });
      });
    }

    // Thêm kỹ năng
    data.push({ "Trường thông tin": "KỸ NĂNG", "Giá trị": "" });
    standardFields.ky_nang.forEach(field => {
      data.push({
        "Trường thông tin": field.label,
        "Giá trị": analysisResult.cv_info.ky_nang?.[field.key] || ""
      });
    });

    // Thêm thông tin khác
    data.push({ "Trường thông tin": "THÔNG TIN KHÁC", "Giá trị": "" });
    standardFields.thong_tin_khac.forEach(field => {
      let value = analysisResult.cv_info.thong_tin_khac?.[field.key];
      // Xử lý đặc biệt cho các trường có thể là object hoặc array
      if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value);
      }
      data.push({
        "Trường thông tin": field.label,
        "Giá trị": value || ""
      });
    });

    // Thêm dự án cá nhân nếu có
    if (analysisResult.cv_info.du_an_ca_nhan) {
      data.push({ "Trường thông tin": "DỰ ÁN CÁ NHÂN", "Giá trị": "" });
      const projects = Array.isArray(analysisResult.cv_info.du_an_ca_nhan) 
        ? analysisResult.cv_info.du_an_ca_nhan 
        : [analysisResult.cv_info.du_an_ca_nhan];
      
      projects.forEach((project, index) => {
        data.push({ "Trường thông tin": `Dự án ${index + 1}`, "Giá trị": "" });
        if (typeof project === 'object') {
          Object.entries(project).forEach(([key, value]) => {
            data.push({
              "Trường thông tin": formatFieldKey(key),
              "Giá trị": typeof value === 'object' ? JSON.stringify(value) : String(value)
            });
          });
        } else {
          data.push({
            "Trường thông tin": "Thông tin dự án",
            "Giá trị": String(project)
          });
        }
      });
    }

    // Thêm đánh giá độ phù hợp nếu có
    if (analysisResult.job_compatibility) {
      data.push({ "Trường thông tin": "ĐÁNH GIÁ ĐỘ PHÙ HỢP", "Giá trị": "" });
      if (typeof analysisResult.job_compatibility === 'object') {
        Object.entries(analysisResult.job_compatibility).forEach(([key, value]) => {
          data.push({
            "Trường thông tin": formatFieldKey(key),
            "Giá trị": typeof value === 'object' ? JSON.stringify(value) : String(value)
          });
        });
      } else {
        data.push({
          "Trường thông tin": "Đánh giá",
          "Giá trị": String(analysisResult.job_compatibility)
        });
      }
    }

    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Thông tin CV");

    // Tự động điều chỉnh độ rộng cột
    const maxWidth = data.reduce((w, r) => Math.max(w, r["Giá trị"].toString().length), 10);
    ws["!cols"] = [
      { wch: 30 },  // Độ rộng cột Trường thông tin
      { wch: Math.min(maxWidth, 100) }  // Độ rộng cột Giá trị, tối đa 100 ký tự
    ];

    // Xuất file
    const fileName = `CV_${analysisResult.cv_info.thong_tin_ca_nhan?.ho_va_ten || 'Unnamed'}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
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
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Kết Quả Phân Tích CV
              </h3>
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Xuất Excel
            </button>
          </div>

          {/* CV Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Thông tin cá nhân */}
            {renderCVSection('thong_tin_ca_nhan', analysisResult.cv_info?.thong_tin_ca_nhan)}

            {/* Học vấn */}
            {renderCVSection('hoc_van', analysisResult.cv_info?.hoc_van)}

            {/* Kinh nghiệm làm việc */}
            <div className="lg:col-span-2">
              {renderExperience(analysisResult.cv_info?.kinh_nghiem)}
            </div>

            {/* Kỹ năng */}
            {renderCVSection('ky_nang', analysisResult.cv_info?.ky_nang)}

            {/* Dự án cá nhân */}
            {analysisResult.cv_info?.du_an_ca_nhan && (
              <div className="lg:col-span-2">
                {renderPersonalProjects(analysisResult.cv_info.du_an_ca_nhan)}
              </div>
            )}

            {/* Thông tin khác */}
            <div className="lg:col-span-2">
              {renderCVSection('thong_tin_khac', analysisResult.cv_info?.thong_tin_khac)}
            </div>
          </div>

          {/* Độ tương thích với công việc */}
          {analysisResult.job_compatibility && renderJobCompatibility(analysisResult.job_compatibility)}
        </div>
      )}
    </div>
  );
};

export default CVUploader; 