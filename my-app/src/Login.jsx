import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (email === "" || password === "") {
        alert("Không được để thông tin trống");
        return;
      }
      const response = await fetch(
        "http://localhost:8080/api/students/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const message = await response.text();
      if (response.ok) {
        alert(message);
        navigate("/home");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Đang lỗi",error);
    }
  };
  return (
    <>
      <div>
        <h1>Đăng nhập</h1>
        <div>
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
          <h5>Forget Password</h5>
        </div>
        <div>
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
        <div>
          <button onClick={() => navigate("/register")}>
            Chưa có tài khoản?Đăng ký
          </button>
        </div>
      </div>
    </>
  );
}
