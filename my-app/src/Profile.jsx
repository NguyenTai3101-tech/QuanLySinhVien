import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const [infoStudent, setInfoStudent] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/students/${userId}`,
        );
        if (response.ok) {
          const data = await response.json();
          setInfoStudent(data);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <div>
        <h1>Thông tin sinh viên</h1>
        <p>Họ và tên : {infoStudent?.name || ""}</p>
        <p> Mã sinh viên : {infoStudent?.studentId || ""}</p>
        <p>Trường : {infoStudent?.school || ""}</p>
        <button onClick={() => navigate("/fix-profile")}>
          Chỉnh sửa thông tin
        </button>
      </div>
    </>
  );
}
