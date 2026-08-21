import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
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
    if (password.length <= 8) {
      alert("Mật khẩu quá ngắn");
      return;
    }
    const listUser = JSON.parse(localStorage.getItem("listUser")) || [];
    const isExist = listUser.some((user) => user.email === email);
    if (isExist) {
      alert("Tài khoản đã tồn tại");
      return;
    }
    listUser.push({ email, password });
    localStorage.setItem("listUser", JSON.stringify(listUser));

    alert("Đã tạo thành công tài khoản");
    navigate("/login");
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
        <button onClick={handleRegister}>Tạo tài khoản</button>
      </div>
      <div>
        <button onClick={() => navigate("/login")}>
          Quay lại trang đăng nhập
        </button>
      </div>
    </>
  );
}
