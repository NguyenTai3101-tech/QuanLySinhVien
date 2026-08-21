import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function FixProfile() {
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [school, setSchool] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    const studentData = { studentID, name, school };
    if (studentID.trim() === "" || name.trim() === "" || school.trim() === "") {
      alert("Không được để thông tin trống");
      return;
    }
    localStorage.setItem("inFoStudent", JSON.stringify(studentData));
    alert("Chỉnh sửa thông tin thành công");
    navigate("/profile");
  };
  return (
    <>
      <div>
        <h2>Chỉnh sửa thông tin cá nhân</h2>
        <input
          type="text"
          placeholder="StudentID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
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
          <button onClick={() => handleSave()}>Lưu thông tin</button>
        </div>
      </div>
    </>
  );
}
