import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigate =(path) =>{
      setIsOpen(false);
      navigate(path);
  }
  return (
    <>
      <div>
        <h2>CaroIT</h2>
        <button onClick={() => setIsOpen(!isOpen)}>Profile ▼</button>
        {isOpen && (
          <ul>
            <li>
              <button onClick={() => handleNavigate("/profile")}>
                Thông tin cá nhân
              </button>
            </li>
            <li>
              <button onClick={() => alert("Đã vào trang cài đặt")}>
                Cài đặt
              </button>
            </li>
            <li>
              <button onClick={() => alert("Đã vào trang hỗ trọ")}>
                Hỗ trợ
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigate("/login")}>Đăng xuất</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
