import emailjs from "@emailjs/browser";
import { useRef } from "react";
function IssuePage() {

  let templateParams = {
    from_name: "James",
    message: "Check this out!",
  };
  function sendMail() {
    emailjs
      .send(
        "<>",
        "template_azmnoyw",
        templateParams,
        "<>"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }

  return (
    <div className="flex justify-center h-[85vh] bg-gradient-to-r from-pink-50 to-white">
      {/* The button to open modal */}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Gửi thành công 🥳</h3>
          <p className="py-4">
            Cảm ơn bạn đã gửi góp ý / báo lỗi 🤗. Chúng tôi sẽ xem xét những ý
            kiến của người dùng để ngày càng hoàn thiện sản phẩm hơn nhé!
          </p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn bg-[#E50087] hover:bg-[#d10079] text-white border-none">
              Đóng
            </label>
          </div>
        </div>
      </div>
      <div className="md:w-[50%]">
        <h1 className="text-3xl text-center font-bold p-5 text-[#E50087]">
          Báo lỗi hoặc góp ý
        </h1>
        <p className="text-justify font-semibold text-sm pr-2 pl-2">
          Sự đóng góp ý kiến từ các bạn sẽ là sự hỗ trợ đắc lực giúp chúng tôi
          ngày càng tốt hoàn thiện sản phẩm hơn.
        </p>

        <textarea
          placeholder="Nhập phản hồi của bạn tại đây!"
          className="mt-5 mb-3 h-[30%] textarea textarea-bordered textarea-md w-full focus:border-[#E50087] focus:ring-1 focus:ring-[#E50087]"
        ></textarea>
        <input 
          type="text" 
          placeholder="Email của bạn" 
          className="input w-full max-w-xs focus:border-[#E50087] focus:ring-1 focus:ring-[#E50087]" 
        />
        <label
          htmlFor="my-modal"
          // onClick={()=>sendMail()}
          className="mt-5 w-full btn bg-[#E50087] hover:bg-[#d10079] text-white border-none"
        >
          Gửi ý kiến
        </label>
      </div>
    </div>
  );
}
export default IssuePage;
