import { useLocation, useNavigate, Link } from 'react-router-dom';
function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="navbar bg-base-100 w-[95%] ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/cv-evaluation">
                Đánh giá CV
              </Link>
            </li>
            <li>
              <Link to="/chat">
                Trò chuyện
              </Link>
            </li>
            <li>
              <Link to="/faq">
                Câu hỏi phỏng vấn
              </Link>
            </li>
            <li>
              <Link to="/issue">
                Báo lỗi/ Góp ý
              </Link>
            </li>
          </ul>
        </div>
        <a onClick={() => navigate("/")} className="btn btn-ghost normal-case font-extrabold text-xl bg-[linear-gradient(90deg,#E50087_0%,#ff4593_50%,#ff6ba5_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1280px]:!tracking-normal">
          TD Consulting Chatbot
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold ">
          <li className='p-1'>
            <button onClick={() => navigate("/")} className={location.pathname == "/" ? "btn btn-outline text-[#E50087] border-[#E50087] hover:bg-[#E50087] hover:border-[#E50087]" : ""}>Trang chủ</button>
          </li>
          <li className='p-1'>
            <button onClick={() => navigate("/cv-evaluation")} className={location.pathname == "/cv-evaluation" ? "btn btn-outline text-[#E50087] border-[#E50087] hover:bg-[#E50087] hover:border-[#E50087]" : ""}>Đánh giá CV</button>
          </li>
          <li className='p-1'>
            <button onClick={() => navigate("/chat")} className={location.pathname == "/chat" ? "btn btn-outline text-[#E50087] border-[#E50087] hover:bg-[#E50087] hover:border-[#E50087]" : ""}>Trò chuyện</button>
          </li>
          <li className='p-1'>
            <button onClick={() => navigate("/faq")} className={location.pathname == "/faq" ? "btn btn-outline text-[#E50087] border-[#E50087] hover:bg-[#E50087] hover:border-[#E50087]" : ""}>Câu hỏi phỏng vấn</button>
          </li>
          <li className='p-1'>
            <button onClick={() => navigate("/issue")} className={location.pathname == "/issue" ? "btn btn-outline text-[#E50087] border-[#E50087] hover:bg-[#E50087] hover:border-[#E50087]" : ""}>Báo lỗi/ Góp ý</button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
}
export default NavBar;
