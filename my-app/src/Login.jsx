import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Không được để thông tin trống");
      return;
    }
    const listUser = JSON.parse(localStorage.getItem("listUser")) || [];
    const isSuccess = listUser.some(
      (user) => user.email === email && user.password === password,
    );
    if (isSuccess) {
      alert("Chúc mừng đăng nhập thành công");
      navigate("/profile");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
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
