import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (email == "" || password == "" || confirmPassword == "") {
      alert("Tạo tài khoản không thành công chỉ thành phượng");
      return;
    }
    if (confirmPassword != password) {
      alert("Mật khẩu không khớp");
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      alert("Tài khoản không có dạng @gmail.com");
      return;
    }
    if (password.length < 8) {
      alert("Mật khẩu quá ngắn");
      return;
    }
    try {
      const reponse = await fetch(
        "http://localhost:8080/api/students/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      if (reponse.ok) {
        const createrUser = await reponse.json();
        localStorage.setItem("userId", createrUser.id);
        alert("Tạo tài khoản thành công chuyển sang nhập thông tin");
        navigate("/fill-profile");
      } else {
        const message = await reponse.text();
        alert(message);
      }
    } catch (error) {
      console.error("Đang lỗi",error);
    }
  };

  return (
    <>
      <div>
        <h1>Tạo tài khoản</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type=""
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type=""
          placeholder="ConfirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleRegister}>Tiếp tục</button>
      </div>
      <div>
        <button onClick={() => navigate("/login")}>
          Quay lại trang đăng nhập
        </button>
      </div>
    </>
  );
}
