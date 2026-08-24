import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FillProfile() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [school, setSchool] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (studentId.trim() === "" || name.trim() === "" || school.trim() === "") {
      alert("Không được để thông tin trống");
      return;
    }
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8080/api/students/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, school, studentId }),
        },
      );
      const message = await response.text();
      if (response.ok) {
        alert(message);
        navigate("/login");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Đang lỗi", error);
    }
  };
  return (
    <>
      <div>
        <h2>Thông tin cá nhân</h2>
        <input
          type="text"
          placeholder="StudentId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <div>
          <button onClick={() => handleSave()}>Tạo tài khoản</button>
        </div>
      </div>
    </>
  );
}
