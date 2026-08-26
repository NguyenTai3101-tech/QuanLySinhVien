import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [infoStudent, setInfoStudent] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      const studentId = id || localStorage.getItem("userId");
      if (!studentId) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/students/${studentId}`,
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
  }, [id]);
  if (!infoStudent) return;
  <div>Đang tải thông tin sinh viên ...</div>;

  return (
    <>
      <div>
        <h1>Thông tin sinh viên</h1>
        <p>Họ và tên : {infoStudent?.name || ""}</p>
        <p> Mã sinh viên : {infoStudent?.studentId || ""}</p>
        <p>Trường : {infoStudent?.school || ""}</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
        <button onClick={() => navigate("/fix-profile")}>
          Chỉnh sửa thông tin
        </button>
      </div>
    </>
  );
}
