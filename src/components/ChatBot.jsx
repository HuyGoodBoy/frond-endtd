// import avatar from "../assets/avatar.jpg";
import robot_img from "../assets/robot_image.png";
import { useState, useRef, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPaperPlane, faUser, faRobot, faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";

// API endpoint configuration
const API_BASE_URL = "https://cv.tdconsulting.vn";

function ChatBot(props) {
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);
  const [timeOfRequest, SetTimeOfRequest] = useState(0);
  const [promptInput, SetPromptInput] = useState("");
  const [chatHistory, SetChatHistory] = useState([]);
  const [isLoading, SetIsLoad] = useState(false);
  const [isGen, SetIsGen] = useState(false);
  const [dataChat, SetDataChat] = useState([
    [
      "start",
      [
        "Hello! I'm your AI career assistant. I can help you prepare for interviews, give CV advice, and answer questions about job searching and career development.",
        null,
      ],
    ],
  ]);

  // Common interview questions in English
  const commonQuestions = [
    "Tell me about yourself",
    "What are your strengths and weaknesses?",
    "Why do you want to work at our company?",
    "How do you handle pressure or stressful situations?",
    "Where do you see yourself in 5 years?",
    "How did you handle conflict in your previous role?",
    "Do you have any questions for us?",
  ];

  // Pre-defined question-answer pairs
  const questionAnswers = {
    "Tell me about yourself": 
      "When answering this question, you should:\n\n" +
      "✅ Briefly mention your education and relevant work experience\n" +
      "✅ Emphasize achievements and skills relevant to the position\n" +
      "✅ Show your motivation and passion for the field\n" +
      "✅ End with why you're interested in this position and company\n\n" +
      "❌ Avoid lengthy personal information unrelated to the job\n" +
      "❌ Don't recite your entire resume\n" +
      "❌ Don't mention negative experiences",
    
    "What are your strengths and weaknesses?": 
      "For strengths:\n" +
      "✅ Choose 2-3 strengths relevant to the position\n" +
      "✅ Provide specific examples that illustrate each strength\n" +
      "✅ Connect your strengths to job requirements\n\n" +
      "For weaknesses:\n" +
      "✅ Select a weakness that isn't crucial for the job\n" +
      "✅ Show self-awareness and that you're working on improvement\n" +
      "✅ Mention specific actions you're taking to address it\n\n" +
      "❌ Avoid cliché answers like \"I'm a perfectionist\"\n" +
      "❌ Don't mention serious weaknesses that could impact your job performance",
    
    "Why do you want to work at our company?":
      "Effective response approach:\n\n" +
      "✅ Show you've researched the company: mission, values, products/services\n" +
      "✅ Connect the company's values with your personal values\n" +
      "✅ Emphasize growth opportunities and how you can contribute\n" +
      "✅ Express interest in the company culture and work environment\n\n" +
      "❌ Avoid mentioning salary as your primary motivation\n" +
      "❌ Don't give generic, non-specific answers\n" +
      "❌ Don't negatively compare with other companies",
    
    // ... other predefined QA pairs can be added here
  };

  // Additional Q&A pairs
  const additionalQAs = {
    "What are your strengths?": "My strengths include quick learning ability, organized work style, and a high sense of responsibility. I consistently meet deadlines and proactively find solutions to emerging issues.",
    
    "What are your weaknesses?": "I tend to be perfectionist about my work, sometimes spending too much time on details. However, I'm working on better balancing quality and timeliness by improving my planning and setting clear priorities.",
    
    "What salary are you looking for?": "I've researched the average salary for this position in the industry with my level of experience. I'm looking for compensation that reflects my skills and contributions, while being open to discussing a package that works for both parties.",
    
    "Where do you see yourself in 5 years?": "In five years, I hope to have deepened my expertise in this field, taken on more responsibility, and contributed to the company's growth. I'd like to potentially lead a small team and share my experience with newer colleagues.",
    
    "Why did you leave your previous position?": "I left my previous role to seek professional growth and new challenges. My previous job provided a good foundation, but I felt it was time to pursue an environment where I could develop deeper specialized knowledge and skills.",
    
    "How do you handle work pressure?": "I handle pressure by prioritizing tasks, breaking large projects into manageable steps, and maintaining reasonable breaks. In urgent situations, I focus on solutions rather than worrying about the problem. I also practice stress management techniques to maintain performance.",
    
    "Tell me about a project you're proud of": "I'm proud of project X where I [specific achievement]. The project faced challenges like [list challenges], but I [solutions implemented]. The result was [outcomes achieved], and I learned [important lessons].",
    
    "How do you handle conflict in a team?": "When conflicts arise, I listen to all perspectives, understand the root cause, and focus on common goals. I promote open communication, suggest compromises, and maintain professional relationships. I believe properly managed conflicts often lead to better outcomes."
  };

  // Combine all Q&A pairs
  Object.assign(questionAnswers, additionalQAs);

  useEffect(() => {
    ScrollToEndChat();
  }, [dataChat, isLoading]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        SetTimeOfRequest((prev) => {
          if (prev >= 60) {
            clearInterval(interval);
            SetIsLoad(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  function ScrollToEndChat() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const onChangeHandler = (event) => {
    SetPromptInput(event.target.value);
  };

  // Analyze query to check if it's related to jobs/recruitment
  const analyzeQuery = (query) => {
    query = query.toLowerCase();
    
    // Work-related topics
    const workTopics = [
      { 
        category: "CV and Job Applications", 
        terms: ["cv", "resume", "application", "portfolio", "apply"]
      },
      { 
        category: "Interviews", 
        terms: ["interview", "question", "answer", "recruitment", "hiring"]
      },
      { 
        category: "Job Skills", 
        terms: ["skill", "experience", "capability", "expertise", "competency"]
      },
      { 
        category: "Work Environment", 
        terms: ["environment", "company", "culture", "colleague", "boss", "employee"]
      },
      { 
        category: "Salary and Benefits", 
        terms: ["salary", "compensation", "benefit", "bonus", "package"]
      },
      { 
        category: "Job Search", 
        terms: ["job", "search", "career", "position", "opportunity", "work"]
      },
      { 
        category: "Career Development", 
        terms: ["promotion", "advance", "development", "growth", "learn", "progress"]
      }
    ];
    
    // Check if query contains any keywords from the topics
    for (const topic of workTopics) {
      for (const term of topic.terms) {
        if (query.includes(term)) {
          return {
            isRelevant: true,
            category: topic.category
          };
        }
      }
    }
    
    // Analyze query context
    if (
      query.includes("how to") || 
      query.includes("how do") || 
      query.includes("how can") ||
      query.includes("what is") ||
      query.includes("should") ||
      query.includes("please") ||
      query.includes("help")
    ) {
      // If query contains interrogative phrases, check broader context
      if (
        query.includes("job") || 
        query.includes("work") || 
        query.includes("career") ||
        query.includes("apply") ||
        query.includes("hire") ||
        query.includes("employer") ||
        query.includes("recruiter") ||
        query.includes("interview")
      ) {
        return {
          isRelevant: true,
          category: "Career Advice"
        };
      }
    }
    
    // Default
    return {
      isRelevant: false,
      category: null
    };
  };

  // Hàm xử lý chatbot với AI
  const processWithAI = (query) => {
    // Phân tích nội dung câu hỏi
    const analysis = analyzeQuery(query);
    
    // Nếu không liên quan đến công việc/tuyển dụng
    if (!analysis.isRelevant) {
      return "Xin lỗi, tôi chỉ có thể trả lời các câu hỏi liên quan đến tư vấn việc làm, phỏng vấn và tuyển dụng. Vui lòng hỏi về các chủ đề này để tôi có thể hỗ trợ bạn tốt nhất!";
    }

    // Kiểm tra câu hỏi trong danh sách câu trả lời có sẵn
    if (questionAnswers[query]) {
      return questionAnswers[query];
    }

    // Xử lý các câu hỏi dựa vào chủ đề đã phân tích
    if (analysis.category === "CV and Job Applications") {
      return "CV là tài liệu quan trọng trong quá trình tìm việc. Một CV tốt cần ngắn gọn (1-2 trang), nêu bật thành tích và kỹ năng phù hợp với vị trí, sử dụng động từ hành động, và không có lỗi chính tả. Bạn nên cá nhân hóa CV cho từng vị trí ứng tuyển và bao gồm thông tin liên hệ, học vấn, kinh nghiệm làm việc, kỹ năng và thành tích.";
    }

    if (analysis.category === "Interviews") {
      return "Để chuẩn bị cho phỏng vấn, bạn nên: nghiên cứu về công ty và vị trí ứng tuyển, xem lại CV của mình, chuẩn bị câu trả lời cho các câu hỏi phổ biến, chuẩn bị câu hỏi để hỏi nhà tuyển dụng, và tập phỏng vấn. Trong buổi phỏng vấn, hãy ăn mặc phù hợp, đến sớm 10-15 phút, giao tiếp rõ ràng, duy trì giao tiếp bằng mắt, và thể hiện sự nhiệt tình.";
    }

    if (analysis.category === "Salary and Benefits") {
      return "Khi thảo luận về lương, bạn nên nghiên cứu mức lương thị trường cho vị trí tương tự, cân nhắc kinh nghiệm và kỹ năng của bạn, và xác định mức lương mong muốn cùng mức tối thiểu có thể chấp nhận. Trong cuộc phỏng vấn, tốt nhất là để nhà tuyển dụng đề cập đến vấn đề lương trước, thể hiện sự linh hoạt, và nhấn mạnh giá trị bạn mang lại.";
    }

    if (analysis.category === "Job Skills") {
      return "Kỹ năng quan trọng trong công việc bao gồm kỹ năng chuyên môn (hard skills) và kỹ năng mềm (soft skills). Kỹ năng chuyên môn là những kiến thức và khả năng cụ thể liên quan đến công việc, trong khi kỹ năng mềm bao gồm giao tiếp, làm việc nhóm, giải quyết vấn đề, và quản lý thời gian. Để phát triển kỹ năng, bạn nên tham gia các khóa học, dự án thực tế, và không ngừng cập nhật kiến thức trong lĩnh vực của mình.";
    }

    if (analysis.category === "Job Search") {
      return "Để tìm việc hiệu quả, bạn nên: cập nhật CV và LinkedIn profile, sử dụng các trang tuyển dụng uy tín, mạng lưới cá nhân, tham gia các sự kiện networking, và theo dõi các công ty mà bạn quan tâm. Khi ứng tuyển, hãy điều chỉnh CV và cover letter cho phù hợp với từng vị trí, và chuẩn bị kỹ lưỡng cho các cuộc phỏng vấn.";
    }

    // Mặc định trả lời chung nếu là câu hỏi liên quan đến việc làm/tuyển dụng
    return `Cảm ơn câu hỏi của bạn về chủ đề ${analysis.category.toLowerCase()}. Tôi là trợ lý ảo từ TD Consulting, chuyên hỗ trợ thông tin về phỏng vấn, đánh giá CV và tư vấn nghề nghiệp. Bạn có thể hỏi cụ thể hơn về cách chuẩn bị CV, kỹ năng phỏng vấn, hoặc các vấn đề liên quan đến quá trình tuyển dụng để tôi có thể giúp đỡ chi tiết hơn.`;
  };

  const SendMessageChat = async () => {
    if (isLoading) return;
    if (!promptInput.trim()) return;

    try {
      const newUserMessage = promptInput;
      SetPromptInput("");
      SetIsLoad(true);

      // Add user message to chat history
      const updatedChatHistory = [...dataChat, ["user", [newUserMessage, null]]];
      SetDataChat(updatedChatHistory);

      // Check for predefined answers
      if (questionAnswers[newUserMessage]) {
        // If we have a pre-defined answer, use it
        setTimeout(() => {
          SetDataChat([...updatedChatHistory, ["bot", [questionAnswers[newUserMessage], null]]]);
          SetIsLoad(false);
        }, 1500);
        return;
      }

      // Process query through API
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: newUserMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      SetDataChat([...updatedChatHistory, ["bot", [data.answer, null]]]);
    } catch (error) {
      console.error("Error sending message:", error);
      SetDataChat([
        ...dataChat,
        ["user", [promptInput, null]],
        [
          "bot",
          [
            "I'm having trouble connecting to the server. Please try again later or check your internet connection.",
            null,
          ],
        ],
      ]);
    } finally {
      SetIsLoad(false);
      SetPromptInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      SendMessageChat();
    }
  };

  const clearChat = () => {
    SetDataChat([
      [
        "start",
        [
          "Hello! I'm your AI career assistant. I can help you prepare for interviews, give CV advice, and answer questions about job searching and career development.",
          null,
        ],
      ],
    ]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Success notification could be added here
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className="pt-20 pb-8 min-h-screen bg-gradient-light">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-gradient mb-3">Career Assistant</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Get personalized career advice, interview tips, and job search guidance
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
          {/* Chat Controls */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faRobot} />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-gray-800">CareerBoost Assistant</h3>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
            <button 
              onClick={clearChat}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              title="Clear chat history"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 flex-grow overflow-y-auto h-[60vh] custom-scrollbar">
            <div className="space-y-4">
              {dataChat.map((mess, index) => {
                const [sender, [message, metadata]] = mess;
                
                if (sender === "start") {
                  return (
                    <div key={index} className="flex justify-center mb-6">
                      <div className="bg-indigo-50 p-4 rounded-xl max-w-[80%]">
                        <p className="text-gray-700">{message}</p>
                      </div>
                    </div>
                  );
                }

                const isUser = sender === "user";
                
                return (
                  <div 
                    key={index} 
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start max-w-[80%]">
                      {!isUser && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1">
                          <FontAwesomeIcon icon={faRobot} className="text-xs" />
                        </div>
                      )}
                      
                      <div 
                        className={`p-3 rounded-2xl ${
                          isUser 
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" 
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {isGen ? (
                          <TypeAnimation 
                            sequence={[message]} 
                            speed={70} 
                            cursor={false}
                          />
                        ) : (
                          <div className="whitespace-pre-wrap">{message}</div>
                        )}
                        
                        {!isUser && (
                          <button 
                            onClick={() => copyToClipboard(message)}
                            className="ml-2 text-gray-500 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                            title="Copy to clipboard"
                          >
                            <FontAwesomeIcon icon={faCopy} className="text-xs" />
                          </button>
                        )}
                      </div>
                      
                      {isUser && (
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 ml-2 flex-shrink-0 mt-1">
                          <FontAwesomeIcon icon={faUser} className="text-xs" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1">
                      <FontAwesomeIcon icon={faRobot} className="text-xs" />
                    </div>
                    <div className="p-4 bg-gray-100 rounded-2xl">
                      <ScaleLoader
                        color="#6d28d9"
                        height={15}
                        width={2}
                        radius={2}
                        margin={2}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestion Pills */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {commonQuestions.slice(0, 4).map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    SetPromptInput(question);
                    if (chatInputRef.current) chatInputRef.current.focus();
                  }}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors truncate max-w-[200px]"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-300 focus-within:bg-white transition-all">
              <textarea
                ref={chatInputRef}
                className="flex-grow bg-transparent border-none focus:outline-none resize-none py-2 max-h-32"
                placeholder="Type your question here..."
                value={promptInput}
                onChange={onChangeHandler}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                onClick={SendMessageChat}
                disabled={isLoading || !promptInput.trim()}
                className={`ml-2 w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                  isLoading || !promptInput.trim()
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                }`}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Note: This assistant is designed to provide career advice. For personal or non-career related questions, please use a general-purpose assistant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
