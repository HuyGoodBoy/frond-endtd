import robot_img from "../assets/robot_image.png";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="flex items-center justify-center hero h-[85vh] w-full bg-gradient-to-r from-pink-50 to-white">
      <div className="hero-content text-center min-w-[200px] ">
        <div className="max-w-md flex-1">
          <img
            className="block w-[200px] h-auto mx-auto"
            src={robot_img}
          ></img>
          <h1 className="text-2xl lg:text-5xl font-bold text-gray-800">Xin chào! Mình là</h1>
          <h1 className="text-3xl lg:text-5xl font-bold bg-[linear-gradient(90deg,#E50087_0%,#ff4593_50%,#ff6ba5_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)]">
            TD Consulting Chatbot
          </h1>
          <p className="py-6 font-semibold lg:text-lg text-sm text-gray-700">
            Giúp bạn chuẩn bị phỏng vấn, đánh giá CV và tư vấn về tuyển dụng một cách chuyên nghiệp!
          </p>
          <Link to="/cv-evaluation">
            <button className="btn bg-[#E50087] hover:bg-[#d10079] text-white border-none">Bắt đầu ngay</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
