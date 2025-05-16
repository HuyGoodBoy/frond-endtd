import { useState, useEffect } from 'react';

// Interview questions in English (translated from Vietnamese)
const interviewQuestions = [
  {
    category: "Câu Hỏi Chung",
    questions: [
      {
        question: "Hãy giới thiệu về bản thân",
        answer: "Khi trả lời câu hỏi này, bạn nên:\n\n" +
          "✅ Tóm tắt về học vấn và kinh nghiệm làm việc liên quan\n" +
          "✅ Nhấn mạnh thành tích và kỹ năng phù hợp với vị trí\n" +
          "✅ Thể hiện động lực và đam mê trong lĩnh vực\n" +
          "✅ Kết thúc bằng lý do bạn quan tâm đến vị trí và công ty này\n\n" +
          "❌ Tránh đi sâu vào thông tin cá nhân không liên quan\n" +
          "❌ Không kể lại toàn bộ CV\n" +
          "❌ Không đề cập đến những trải nghiệm tiêu cực"
      },
      {
        question: "Điểm mạnh và điểm yếu của bạn là gì?",
        answer: "Về điểm mạnh:\n" +
          "✅ Chọn 2-3 điểm mạnh liên quan đến vị trí\n" +
          "✅ Đưa ra ví dụ cụ thể minh họa cho từng điểm mạnh\n" +
          "✅ Kết nối điểm mạnh với yêu cầu công việc\n\n" +
          "Về điểm yếu:\n" +
          "✅ Chọn điểm yếu không quá quan trọng với công việc\n" +
          "✅ Thể hiện sự tự nhận thức và đang cải thiện\n" +
          "✅ Nêu các hành động cụ thể bạn đang thực hiện để khắc phục\n\n" +
          "❌ Tránh câu trả lời sáo rỗng như \"Tôi là người hoàn hảo\"\n" +
          "❌ Không đề cập điểm yếu nghiêm trọng ảnh hưởng đến hiệu suất công việc"
      },
      {
        question: "Tại sao bạn muốn làm việc tại công ty chúng tôi?",
        answer: "Cách trả lời hiệu quả:\n\n" +
          "✅ Thể hiện đã tìm hiểu về công ty: sứ mệnh, giá trị, sản phẩm/dịch vụ\n" +
          "✅ Kết nối giá trị công ty với giá trị cá nhân của bạn\n" +
          "✅ Nhấn mạnh cơ hội phát triển và cách bạn có thể đóng góp\n" +
          "✅ Bày tỏ sự quan tâm đến văn hóa và môi trường làm việc\n\n" +
          "❌ Tránh đề cập lương thưởng là động lực chính\n" +
          "❌ Không đưa ra câu trả lời chung chung, thiếu cụ thể\n" +
          "❌ Không so sánh tiêu cực với các công ty khác"
      }
    ]
  },
  {
    category: "Kinh Nghiệm & Thử Thách",
    questions: [
      {
        question: "Kể về một lần bạn thất bại. Bạn đã học được gì?",
        answer: "Tôi từng không đạt được kỳ vọng trong một dự án do lập kế hoạch kém. Sau đó, tôi đã học cách chuẩn bị kỹ lưỡng hơn, đặt mục tiêu rõ ràng và dự đoán rủi ro để tránh lặp lại sai lầm. Trải nghiệm này dạy tôi tầm quan trọng của việc lập kế hoạch chi tiết và tham khảo ý kiến từ đồng nghiệp có kinh nghiệm ngay từ đầu."
      },
      {
        question: "Bạn xử lý công việc chưa từng làm như thế nào?",
        answer: "Khi đối mặt với công việc mới, tôi chủ động nghiên cứu yêu cầu, tham khảo tài liệu và tìm kiếm lời khuyên từ đồng nghiệp có kinh nghiệm. Tôi xem đây là cơ hội để mở rộng kỹ năng và thể hiện khả năng thích nghi. Tôi chia nhỏ công việc mới thành các phần có thể quản lý được và giải quyết chúng một cách có hệ thống."
      },
      {
        question: "Mô tả một tình huống khó khăn và cách bạn giải quyết",
        answer: "Trong vai trò trước đây, chúng tôi đối mặt với thời hạn gấp cùng các vấn đề kỹ thuật bất ngờ. Tôi đã tổ chức cuộc họp khẩn cấp, xác định các vấn đề quan trọng, phân công nhiệm vụ dựa trên điểm mạnh của từng thành viên và thiết lập kế hoạch liên lạc rõ ràng. Chúng tôi ưu tiên các chức năng cốt lõi và làm thêm giờ khi cần thiết. Kết quả là hoàn thành đúng hạn và sau đó cải thiện quy trình để ngăn chặn tình huống tương tự."
      }
    ]
  },
  {
    category: "Thực Tế & Kỹ Thuật",
    questions: [
      {
        question: "Tại sao chúng tôi nên tuyển bạn?",
        answer: "Tôi tin rằng sự kết hợp giữa kỹ năng, kinh nghiệm và niềm đam mê của tôi làm tôi trở thành ứng viên lý tưởng. Nền tảng của tôi trong [lĩnh vực cụ thể] đã chuẩn bị cho tôi đối mặt với những thách thức của vị trí này. Tôi cam kết không ngừng cải thiện và có thể đóng góp góc nhìn mới đồng thời thích nghi nhanh với quy trình hiện có. Thành tích của tôi cho thấy kết quả nhất quán và đạo đức làm việc mạnh mẽ."
      },
      {
        question: "Mức lương bạn mong muốn là bao nhiêu?",
        answer: "Dựa trên nghiên cứu thị trường cho vị trí này và xem xét kinh nghiệm cùng kỹ năng của tôi, tôi đang tìm kiếm mức lương trong khoảng [phạm vi phù hợp]. Tuy nhiên, tôi sẵn sàng thảo luận về gói đãi ngộ tổng thể bao gồm phúc lợi và cơ hội phát triển tại công ty."
      },
      {
        question: "Bạn có câu hỏi nào cho chúng tôi không?",
        answer: "Vâng, tôi muốn biết thêm về cơ hội phát triển chuyên môn và đào tạo tại công ty. Tôi cũng quan tâm đến văn hóa làm việc và cách công ty hỗ trợ nhân viên nâng cao kỹ năng và chuyên môn của họ."
      }
    ]
  }
];

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  // Animation on scroll effect
  useEffect(() => {
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

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gradient-light">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium mb-4">
            Chuẩn Bị Phỏng Vấn
          </span>
          <h1 className="text-gradient mb-6">Chinh Phục Buổi Phỏng Vấn Tiếp Theo</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Chuẩn bị cho các buổi phỏng vấn với những câu hỏi phổ biến và lời khuyên chuyên gia về cách trả lời ấn tượng
          </p>
        </div>

        {/* Question Categories */}
        <div className="max-w-5xl mx-auto mb-10 animate-on-scroll">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {interviewQuestions.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-gradient-to-r from-pink-600 to-pink-700 text-white shadow-md'
                    : 'bg-white hover:bg-gray-100 text-gray-700 shadow-sm'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Questions and Answers */}
        <div className="max-w-3xl mx-auto animate-on-scroll">
          <div className="space-y-4">
            {interviewQuestions[activeCategory].questions.map((item, qIndex) => {
              const isExpanded = expandedQuestions[`${activeCategory}-${qIndex}`];
              
              return (
                <div 
                  key={qIndex} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'shadow-lg' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(activeCategory, qIndex)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-lg">{item.question}</span>
                    <span className={`text-pink-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-6 py-4 bg-gradient-to-r from-pink-50 to-pink-100 border-t border-gray-100">
                      <p className="text-gray-700 whitespace-pre-line">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interview Tips */}
        <div className="max-w-4xl mx-auto mt-16 animate-on-scroll">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-pink-600 to-pink-700">
              <h2 className="text-2xl font-bold text-white">Bí Quyết Phỏng Vấn Thành Công</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InterviewTip 
                  title="Trước Phỏng Vấn"
                  tips={[
                    "Nghiên cứu kỹ về công ty",
                    "Luyện tập trả lời câu hỏi thường gặp",
                    "Chuẩn bị câu hỏi để hỏi nhà tuyển dụng",
                    "Chuẩn bị trang phục và lộ trình từ hôm trước",
                    "Ngủ đủ giấc"
                  ]}
                />
                
                <InterviewTip 
                  title="Trong Buổi Phỏng Vấn"
                  tips={[
                    "Đến sớm 10-15 phút",
                    "Tạo ấn tượng đầu tiên tốt với cái bắt tay chắc chắn",
                    "Duy trì giao tiếp bằng mắt và tư thế tốt",
                    "Sử dụng phương pháp STAR cho câu hỏi tình huống",
                    "Thể hiện sự nhiệt tình và năng lượng tích cực"
                  ]}
                />
                
                <InterviewTip 
                  title="Chiến Lược Trả Lời"
                  tips={[
                    "Trả lời ngắn gọn và đi thẳng vào vấn đề",
                    "Đưa ra ví dụ cụ thể từ kinh nghiệm",
                    "Lượng hóa thành tích khi có thể",
                    "Trung thực về kinh nghiệm và kỹ năng",
                    "Tập trung vào lợi ích bạn mang lại cho công ty"
                  ]}
                />
                
                <InterviewTip 
                  title="Sau Phỏng Vấn"
                  tips={[
                    "Gửi email cảm ơn trong vòng 24 giờ",
                    "Nhắc lại các điểm chính trong cuộc trò chuyện",
                    "Nhấn mạnh lại sự quan tâm đến vị trí",
                    "Theo dõi nếu chưa nhận được phản hồi trong thời gian đã hẹn",
                    "Rút kinh nghiệm cho các buổi phỏng vấn sau"
                  ]}
                />
              </div>
              
              <div className="mt-8 p-4 bg-gradient-light rounded-xl">
                <p className="text-center text-gray-700">
                  <span className="font-semibold">Lời khuyên:</span> Ghi âm lại các bài luyện tập trả lời để xác định những điểm cần cải thiện trong cách trình bày và ngôn ngữ cơ thể.
                </p>
              </div>
            </div>
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
}

function InterviewTip({ title, tips }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gradient">{title}</h3>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-pink-600 to-pink-700 flex items-center justify-center text-white text-xs mr-3 mt-0.5">
              {index + 1}
            </span>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQPage;
