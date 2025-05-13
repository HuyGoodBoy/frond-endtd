// import avatar from "../assets/avatar.jpg";
import robot_img from "../assets/robot_image.png";
import { useState, useRef, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

// API endpoint configuration
const API_BASE_URL = "https://cv.tdconsulting.vn";

function ChatBot(props) {
  const messagesEndRef = useRef(null);
  const [timeOfRequest, SetTimeOfRequest] = useState(0);
  const [promptInput, SetPromptInput] = useState("");
  const [chatHistory, SetChatHistory] = useState([]);
  const [isLoading, SetIsLoad] = useState(false);
  const [isGen, SetIsGen] = useState(false);
  const [dataChat, SetDataChat] = useState([
    [
      "start",
      [
        "Chào bạn! Mình là trợ lý ảo của TD Consulting. Mình có thể giúp bạn chuẩn bị phỏng vấn, đánh giá CV hoặc trả lời các câu hỏi liên quan đến tuyển dụng và việc làm.",
        null,
      ],
    ],
  ]);

  // Common interview questions in Vietnamese
  const commonQuestions = [
    "Hãy giới thiệu về bản thân bạn?",
    "Điểm mạnh và điểm yếu của bạn là gì?",
    "Tại sao bạn muốn làm việc tại công ty chúng tôi?",
    "Bạn có thể làm việc dưới áp lực không?",
    "Mục tiêu nghề nghiệp của bạn trong 5 năm tới là gì?",
    "Bạn đã giải quyết xung đột trong công việc như thế nào?",
    "Bạn có câu hỏi nào cho chúng tôi không?",
  ];

  // Pre-defined question-answer pairs
  const questionAnswers = {
    "Hãy giới thiệu về bản thân bạn?": 
      "Khi trả lời câu hỏi này, bạn nên:\n\n" +
      "✅ Trình bày ngắn gọn về học vấn, kinh nghiệm làm việc liên quan\n" +
      "✅ Nhấn mạnh những thành tựu và kỹ năng phù hợp với vị trí ứng tuyển\n" +
      "✅ Thể hiện động lực và niềm đam mê với ngành nghề\n" +
      "✅ Kết thúc bằng lý do bạn quan tâm đến vị trí và công ty này\n\n" +
      "❌ Tránh kể lể dài dòng về thông tin cá nhân không liên quan\n" +
      "❌ Không nhắc lại toàn bộ CV\n" +
      "❌ Không đề cập đến những kinh nghiệm tiêu cực",
    
    "Điểm mạnh và điểm yếu của bạn là gì?": 
      "Khi trả lời về điểm mạnh:\n" +
      "✅ Chọn 2-3 điểm mạnh phù hợp với vị trí ứng tuyển\n" +
      "✅ Đưa ra ví dụ cụ thể minh họa cho những điểm mạnh\n" +
      "✅ Liên kết những điểm mạnh với yêu cầu công việc\n\n" +
      "Khi trả lời về điểm yếu:\n" +
      "✅ Chọn điểm yếu không phải là yêu cầu thiết yếu của công việc\n" +
      "✅ Thể hiện bạn đã nhận thức được điểm yếu và đang cải thiện\n" +
      "✅ Đưa ra các biện pháp cụ thể bạn đang thực hiện để khắc phục\n\n" +
      "❌ Tránh những câu trả lời mang tính cliché như \"tôi là người làm việc quá chăm chỉ\"\n" +
      "❌ Không đề cập những điểm yếu nghiêm trọng có thể ảnh hưởng đến công việc",
    
    "Tại sao bạn muốn làm việc tại công ty chúng tôi?":
      "Cách trả lời hiệu quả:\n\n" +
      "✅ Thể hiện bạn đã nghiên cứu kỹ về công ty: sứ mệnh, giá trị, sản phẩm/dịch vụ\n" +
      "✅ Liên kết giữa giá trị của công ty với giá trị cá nhân của bạn\n" +
      "✅ Nhấn mạnh cơ hội phát triển và đóng góp tại công ty\n" +
      "✅ Bày tỏ sự quan tâm đến văn hóa công ty và môi trường làm việc\n\n" +
      "❌ Tránh nhắc đến yếu tố lương thưởng là lý do chính\n" +
      "❌ Không đưa ra câu trả lời chung chung, thiếu cụ thể\n" +
      "❌ Không so sánh tiêu cực với công ty khác",
    
    // ... other predefined QA pairs can be added here
  };

  // Thêm nhiều câu hỏi và câu trả lời phỏng vấn thường gặp
  const additionalQAs = {
    "Điểm mạnh của bạn là gì?": "Điểm mạnh của em là khả năng học hỏi nhanh, làm việc có tổ chức và tinh thần trách nhiệm cao. Em luôn hoàn thành công việc đúng hạn và chủ động tìm giải pháp cho vấn đề phát sinh.",
    
    "Điểm yếu của bạn là gì?": "Em có xu hướng quá hoàn hảo trong công việc, đôi khi dành quá nhiều thời gian cho chi tiết. Tuy nhiên, em đang học cách cân bằng giữa chất lượng và tiến độ bằng cách lập kế hoạch tốt hơn và xác định ưu tiên rõ ràng.",
    
    "Bạn mong muốn mức lương như thế nào?": "Em đã tìm hiểu mức lương trung bình cho vị trí này trong ngành và với kinh nghiệm của em. Em mong muốn mức lương phù hợp với năng lực và đóng góp của mình, đồng thời cũng cởi mở trong việc thảo luận để đi đến thỏa thuận hợp lý cho cả hai bên.",
    
    "Bạn thấy mình ở đâu trong 5 năm tới?": "Trong 5 năm tới, em mong muốn phát triển chuyên môn sâu hơn trong lĩnh vực này, đảm nhận vị trí có nhiều trách nhiệm hơn và đóng góp vào sự phát triển của công ty. Em cũng mong muốn được dẫn dắt một nhóm nhỏ và chia sẻ kinh nghiệm với đồng nghiệp mới.",
    
    "Tại sao bạn rời vị trí công việc trước đây?": "Em rời vị trí trước để tìm kiếm cơ hội phát triển chuyên môn và thách thức mới. Công việc cũ đã giúp em xây dựng nền tảng tốt, nhưng em cảm thấy đã đến lúc bản thân cần môi trường mới để phát triển kỹ năng và kiến thức chuyên sâu hơn.",
    
    "Bạn xử lý áp lực công việc như thế nào?": "Em xử lý áp lực bằng cách ưu tiên công việc, phân chia nhiệm vụ lớn thành các bước nhỏ hơn, và lập kế hoạch rõ ràng. Em cũng dành thời gian thư giãn hợp lý để duy trì hiệu suất. Trong tình huống khẩn cấp, em tập trung vào giải pháp thay vì lo lắng về vấn đề.",
    
    "Kể về một dự án bạn tự hào nhất": "Em tự hào về dự án X, trong đó em đã [mô tả thành tựu cụ thể]. Dự án gặp nhiều thách thức như [liệt kê thách thức], nhưng em đã [giải pháp em đã thực hiện]. Kết quả là [kết quả đạt được], và em học được [bài học quan trọng].",
    
    "Làm thế nào để bạn xử lý mâu thuẫn trong nhóm?": "Khi có mâu thuẫn, em luôn lắng nghe quan điểm của tất cả các bên, tìm hiểu nguyên nhân cốt lõi của vấn đề. Em tập trung vào mục tiêu chung, đề xuất giải pháp thỏa hiệp và duy trì giao tiếp cởi mở. Em tin rằng mâu thuẫn được xử lý đúng cách có thể dẫn đến kết quả tốt hơn."
  };

  // Gộp tất cả câu hỏi và câu trả lời
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

  // Hàm phân tích nội dung câu hỏi để xác định có liên quan đến công việc/tuyển dụng không
  const analyzeQuery = (query) => {
    query = query.toLowerCase();
    
    // Chủ đề liên quan đến công việc và tuyển dụng
    const workTopics = [
      { 
        category: "CV và hồ sơ ứng tuyển", 
        terms: ["cv", "resume", "hồ sơ", "sơ yếu lý lịch", "portfolio"]
      },
      { 
        category: "Phỏng vấn", 
        terms: ["phỏng vấn", "interview", "trả lời", "câu hỏi", "tuyển dụng"]
      },
      { 
        category: "Kỹ năng công việc", 
        terms: ["kỹ năng", "skill", "kinh nghiệm", "năng lực", "chuyên môn"]
      },
      { 
        category: "Môi trường làm việc", 
        terms: ["môi trường", "công ty", "văn hóa", "đồng nghiệp", "sếp", "nhân viên"]
      },
      { 
        category: "Lương và phúc lợi", 
        terms: ["lương", "salary", "đãi ngộ", "phúc lợi", "benefit", "thưởng"]
      },
      { 
        category: "Tìm việc", 
        terms: ["tìm việc", "ứng tuyển", "apply", "job", "việc làm", "nghề nghiệp", "career"]
      },
      { 
        category: "Thăng tiến", 
        terms: ["thăng tiến", "promotion", "sự nghiệp", "phát triển", "học hỏi"]
      }
    ];
    
    // Kiểm tra xem câu hỏi có chứa bất kỳ từ khóa nào trong các chủ đề
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
    
    // Phân tích ngữ cảnh của câu hỏi
    if (
      query.includes("làm thế nào") || 
      query.includes("làm sao") || 
      query.includes("như thế nào") ||
      query.includes("cách") ||
      query.includes("nên") ||
      query.includes("hãy") ||
      query.includes("giúp")
    ) {
      // Nếu có chứa từ hỏi cách thức, xem xét ngữ cảnh rộng hơn
      if (
        query.includes("công việc") || 
        query.includes("làm việc") || 
        query.includes("tìm việc") ||
        query.includes("ứng tuyển") ||
        query.includes("xin việc") ||
        query.includes("nhà tuyển dụng") ||
        query.includes("nhà tuyển dụng") ||
        query.includes("tuyển") ||
        query.includes("nghề")
      ) {
        return {
          isRelevant: true,
          category: "Tư vấn tìm việc"
        };
      }
    }
    
    // Mặc định
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
    if (analysis.category === "CV và hồ sơ ứng tuyển") {
      return "CV là tài liệu quan trọng trong quá trình tìm việc. Một CV tốt cần ngắn gọn (1-2 trang), nêu bật thành tích và kỹ năng phù hợp với vị trí, sử dụng động từ hành động, và không có lỗi chính tả. Bạn nên cá nhân hóa CV cho từng vị trí ứng tuyển và bao gồm thông tin liên hệ, học vấn, kinh nghiệm làm việc, kỹ năng và thành tích.";
    }

    if (analysis.category === "Phỏng vấn") {
      return "Để chuẩn bị cho phỏng vấn, bạn nên: nghiên cứu về công ty và vị trí ứng tuyển, xem lại CV của mình, chuẩn bị câu trả lời cho các câu hỏi phổ biến, chuẩn bị câu hỏi để hỏi nhà tuyển dụng, và tập phỏng vấn. Trong buổi phỏng vấn, hãy ăn mặc phù hợp, đến sớm 10-15 phút, giao tiếp rõ ràng, duy trì giao tiếp bằng mắt, và thể hiện sự nhiệt tình.";
    }

    if (analysis.category === "Lương và phúc lợi") {
      return "Khi thảo luận về lương, bạn nên nghiên cứu mức lương thị trường cho vị trí tương tự, cân nhắc kinh nghiệm và kỹ năng của bạn, và xác định mức lương mong muốn cùng mức tối thiểu có thể chấp nhận. Trong cuộc phỏng vấn, tốt nhất là để nhà tuyển dụng đề cập đến vấn đề lương trước, thể hiện sự linh hoạt, và nhấn mạnh giá trị bạn mang lại.";
    }

    if (analysis.category === "Kỹ năng công việc") {
      return "Kỹ năng quan trọng trong công việc bao gồm kỹ năng chuyên môn (hard skills) và kỹ năng mềm (soft skills). Kỹ năng chuyên môn là những kiến thức và khả năng cụ thể liên quan đến công việc, trong khi kỹ năng mềm bao gồm giao tiếp, làm việc nhóm, giải quyết vấn đề, và quản lý thời gian. Để phát triển kỹ năng, bạn nên tham gia các khóa học, dự án thực tế, và không ngừng cập nhật kiến thức trong lĩnh vực của mình.";
    }

    if (analysis.category === "Tìm việc") {
      return "Để tìm việc hiệu quả, bạn nên: cập nhật CV và LinkedIn profile, sử dụng các trang tuyển dụng uy tín, mạng lưới cá nhân, tham gia các sự kiện networking, và theo dõi các công ty mà bạn quan tâm. Khi ứng tuyển, hãy điều chỉnh CV và cover letter cho phù hợp với từng vị trí, và chuẩn bị kỹ lưỡng cho các cuộc phỏng vấn.";
    }

    // Mặc định trả lời chung nếu là câu hỏi liên quan đến việc làm/tuyển dụng
    return `Cảm ơn câu hỏi của bạn về chủ đề ${analysis.category.toLowerCase()}. Tôi là trợ lý ảo từ TD Consulting, chuyên hỗ trợ thông tin về phỏng vấn, đánh giá CV và tư vấn nghề nghiệp. Bạn có thể hỏi cụ thể hơn về cách chuẩn bị CV, kỹ năng phỏng vấn, hoặc các vấn đề liên quan đến quá trình tuyển dụng để tôi có thể giúp đỡ chi tiết hơn.`;
  };

  const SendMessageChat = async () => {
    if (promptInput === "") return;
    SetIsGen(true);
    SetIsLoad(true);
    SetTimeOfRequest(0);
    SetDataChat([...dataChat, ["user", [promptInput, null]]]);
    const userQuestion = promptInput;
    SetPromptInput("");

    try {
      // Kiểm tra xem có câu trả lời sẵn cho câu hỏi này không
      if (questionAnswers[userQuestion]) {
        // Nếu có, sử dụng câu trả lời đã chuẩn bị
        setTimeout(() => {
          SetDataChat([...dataChat, ["user", [userQuestion, null]], ["bot", [questionAnswers[userQuestion], null]]]);
          SetIsLoad(false);
        }, 1000);
      } else {
        // Gọi API backend thay vì xử lý cục bộ
        const response = await fetch(`${API_BASE_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: userQuestion }),
        });

        if (!response.ok) {
          throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        SetDataChat([...dataChat, ["user", [userQuestion, null]], ["bot", [result.answer, null]]]);
        SetIsLoad(false);
      }
    } catch (error) {
      console.error("Error:", error);
      SetDataChat([
        ...dataChat,
        ["user", [userQuestion, null]],
        ["bot", ["Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.", null]],
      ]);
      SetIsLoad(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      SendMessageChat();
    }
  };
  
  let [reference, SetReference] = useState({
    title: "",
    source: "",
    url: "",
    text: ``,
  });
  
  return (
    <div className="bg-gradient-to-r from-pink-50 to-white h-[85vh]">
      <div className="hidden lg:block drawer-side absolute w-64 h-[20vh] left-3 mt-2 drop-shadow-md">
      </div>
      <div className="hidden lg:block drawer-side absolute w-64 h-[20vh] mt-2 right-3 drop-shadow-md">
        <div
          className="menu p-4 w-full min-h-full bg-white text-base-content 
        rounded-2xl mt-3 overflow-auto scroll-y-auto max-h-[80vh]
        scrollbar-thin scrollbar-thumb-gray-300 
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full
          border border-pink-100 shadow-md
        "
        >
          {/* Sidebar content here */}
          <ul className="menu text-sm">
            <h2 className="font-bold mb-2 text-[#E50087]">
              Những câu hỏi phỏng vấn thường gặp
            </h2>

            {commonQuestions.map((mess, i) => (
              <li key={i} onClick={() => SetPromptInput(mess)}>
                <p className="max-w-64 hover:text-[#E50087]">
                  <FontAwesomeIcon icon={faMessage} className="text-[#E50087]" />
                  {mess}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={"flex justify-center h-[80vh]"}>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{reference.title}</h3>{" "}
            <p className="font-normal text-sm">Nguồn: {reference.source}</p>
            <p className="py-4 text-sm">
              {reference.text.slice(0, 700) + "..."}
            </p>
            <p className="link link-primary truncate">
              <a href={reference.url} target="_blank">
                {reference.url}
              </a>
            </p>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn bg-[#E50087] hover:bg-[#d10079] text-white">
                ĐÓNG
              </label>
            </div>
          </div>
        </div>

        <div
          id="chat-area"
          className="
          mt-5 text-sm 
          scrollbar-thin scrollbar-thumb-gray-300 bg-white  
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full
          rounded-3xl border border-pink-100 md:w-[50%] md:p-3 p-1 w-full overflow-auto scroll-y-auto h-[90%] shadow-lg"
        >
          {dataChat.map((dataMessages, i) =>
            dataMessages[0] === "start" || dataMessages[0] === "bot" ? (
              <div className="chat chat-start drop-shadow-md" key={i}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full border-2 border-[#E50087]">
                    <img className="scale-150" src={robot_img} />
                  </div>
                </div>
                <div className="chat-bubble chat-bubble-info bg-pink-50 text-gray-800">
                  <TypeAnimation
                    style={{ whiteSpace: 'pre-line' }}
                    sequence={[
                      dataMessages[1][0],
                      () => SetIsGen(false),
                    ]}
                    cursor={false}
                    speed={100}
                  />
                </div>
              </div>
            ) : (
              <div className="chat chat-end">
                <div className="chat-bubble shadow-xl bg-[#E50087] text-white">
                  {dataMessages[1][0]}
                </div>
              </div>
            )
          )}
          {isLoading ? (
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full border-2 border-[#E50087]">
                  <img src={robot_img} />
                </div>
              </div>
              <div className="chat-bubble chat-bubble-info bg-pink-50 text-gray-800">
                <ScaleLoader
                  color="#E50087"
                  loading={true}
                  height={10}
                  width={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                {/* <p className="text-xs font-medium">{timeOfRequest + "/60s"}</p> */}
              </div>
            </div>
          ) : (
            ""
          )}
          <div ref={messagesEndRef} />
          <div className="absolute bottom-[0.2rem] md:w-[50%] grid ">
            <input
              type="text"
              placeholder="Nhập câu hỏi tại đây..."
              className="mr-1 shadow-xl border-2 focus:outline-none focus:border-[#E50087] px-2 rounded-2xl col-start-1 md:col-end-12 col-end-11"
              onChange={onChangeHandler}
              onKeyDown={handleKeyDown}
              disabled={isGen}
              value={promptInput}
            />

            <button
              disabled={isGen}
              onClick={() => SendMessageChat()}
              className={
                "drop-shadow-md md:col-start-12 rounded-2xl col-start-11 col-end-12 md:col-end-13 btn bg-[#E50087] hover:bg-[#d10079] text-white"
              }
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                color="white"
                height="15px"
                width="15px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
            <p className="text-xs col-start-1 col-end-12 text-justify p-1">
              <b>Lưu ý: </b>Mô hình có thể đưa ra câu trả lời không chính xác ở
              một số trường hợp, vui lòng kiểm chứng thông tin!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
