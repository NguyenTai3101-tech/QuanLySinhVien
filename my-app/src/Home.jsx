import { useState } from "react";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        <h2>CaroIT</h2>
        <button onClick={() =>setIsOpen(!isOpen)}>Profile ▼</button>
        {isOpen && (
          <ul>
            <li>
              <button onClick={() => alert("Đã vào trang thông tin")}>
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
              <button onClick={() => alert("Đã đăng xuất")}>Đăng xuất</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
