const dataInterviewQuestions = [
  ["Tại sao bạn muốn ứng tuyển vào vị trí này?", 
   "Em thấy vị trí này phù hợp với kỹ năng và định hướng phát triển của em. Em mong muốn có cơ hội học hỏi, đóng góp và phát triển lâu dài cùng công ty."],
  
  ["Bạn đã từng thất bại chưa? Bạn học được gì từ thất bại đó?", 
   "Em từng không đạt kỳ vọng trong một dự án vì chủ quan trong lập kế hoạch. Sau đó, em học cách chuẩn bị kỹ hơn, đặt mục tiêu rõ ràng và lường trước rủi ro để tránh lặp lại sai lầm."],
  
  ["Nếu sếp giao cho bạn một việc mà bạn chưa từng làm, bạn sẽ xử lý thế nào?", 
   "Em sẽ chủ động tìm hiểu yêu cầu công việc, tham khảo tài liệu hoặc hỏi người có kinh nghiệm. Em xem đây là cơ hội để học hỏi và chứng minh khả năng thích nghi của bản thân."],
  
  ["Hãy kể về điểm mạnh và điểm yếu của bạn?", 
   "Điểm mạnh của em là khả năng giải quyết vấn đề, học hỏi nhanh và làm việc hiệu quả dưới áp lực. Điểm yếu là đôi khi em quá chi tiết, dành nhiều thời gian hoàn thiện công việc. Em đang cải thiện bằng cách đặt ưu tiên và quản lý thời gian tốt hơn."],
  
  ["Bạn thấy mình ở đâu trong 5 năm tới?", 
   "Trong 5 năm tới, em mong muốn trở thành chuyên gia trong lĩnh vực này, có khả năng dẫn dắt dự án và đóng góp nhiều hơn cho sự phát triển của công ty. Em cũng muốn không ngừng học hỏi để cập nhật kiến thức và kỹ năng mới."],
  
  ["Bạn có câu hỏi gì cho chúng tôi không?", 
   "Em muốn biết thêm về cơ hội phát triển và đào tạo tại công ty. Ngoài ra, em cũng quan tâm đến văn hóa làm việc và cách công ty hỗ trợ nhân viên phát triển chuyên môn."],
  
  ["Tại sao chúng tôi nên tuyển bạn?", 
   "Em tin rằng với kiến thức, kỹ năng và nhiệt huyết của mình, em có thể đóng góp hiệu quả vào công việc và mục tiêu của công ty. Em sẵn sàng học hỏi, thích nghi nhanh và luôn nỗ lực hoàn thành tốt nhiệm vụ được giao."],
  
  ["Bạn mong đợi mức lương như thế nào?", 
   "Em đã tìm hiểu mức lương thị trường cho vị trí này và dựa trên kinh nghiệm cùng kỹ năng của mình, em mong muốn mức lương phù hợp trong khoảng X đến Y. Tuy nhiên, em cũng rất cởi mở để thảo luận thêm dựa trên các yếu tố khác như phúc lợi và cơ hội phát triển tại công ty."]
]

function FAQPage() {
  return (
    <div className="flex justify-center min-h-[85vh] h-auto bg-gradient-to-r from-pink-50 to-white">
      <div className="md:w-[60%] p-4">
        <h1 className="text-3xl text-center font-bold p-5 text-[#E50087]">
          Những câu hỏi phỏng vấn thường gặp
        </h1>
        
        <p className="text-center text-gray-600 mb-6">
          Chuẩn bị tốt cho buổi phỏng vấn với những câu hỏi thường gặp và gợi ý câu trả lời
        </p>
        
        {
          dataInterviewQuestions.map((item, i) => (
            <div key={i} className="mt-3 collapse collapse-plus shadow-md rounded-xl bg-white hover:shadow-lg transition-all border border-pink-100">
              <input type="checkbox" />
              <div className="collapse-title text-base font-medium text-[#E50087]">
                {i+1}. {item[0]}
              </div>
              <div className="collapse-content bg-pink-50">
                <p className="py-2 px-1">{item[1]}</p>
              </div>
            </div>
          ))
        }
        
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md border border-pink-100">
          <h3 className="text-lg font-bold mb-2 text-[#E50087]">Lưu ý khi trả lời phỏng vấn:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Trả lời ngắn gọn, rõ ràng và đi thẳng vào vấn đề</li>
            <li>Đưa ra ví dụ cụ thể từ kinh nghiệm thực tế của bạn</li>
            <li>Thể hiện sự tự tin nhưng không tỏ ra kiêu ngạo</li>
            <li>Thành thật về kinh nghiệm và kỹ năng của bản thân</li>
            <li>Đừng quên cảm ơn nhà tuyển dụng vào cuối buổi phỏng vấn</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
