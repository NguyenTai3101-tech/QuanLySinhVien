import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isValidScore = (score) => {
  if (score === null || score === "" || score === undefined) return false;
  const num = Number(score);
  return !isNaN(num) && num >= 0 && num <= 10;
};

const getRank = (avgScore) => {
  if (avgScore === "" || avgScore === null || avgScore === undefined) return "";
  if (avgScore >= 9.0 && avgScore <= 10) return "Xuất sắc";
  if (avgScore >= 8.0 && avgScore < 9.0) return "Giỏi";
  if (avgScore >= 6.5 && avgScore < 8.0) return "Khá";
  if (avgScore < 6.5) return "Yếu";
};

export default function Teacher() {
  const [listStudents, setListStudents] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("All");
  const navigate = useNavigate();

  // Tách hàm fetchStudent ra ngoài để tái sử dụng khi cần khôi phục dữ liệu
  const fetchStudent = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/students");
      if (response.ok) {
        const data = await response.json();
        setListStudents(data);
      }
    } catch (error) {
      console.error("Hiện đang có lỗi", error);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const handleInputChange = (id, subject, value) => {
    setListStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, [subject]: value } : student,
      ),
    );
  };

  const handleSaveScoreOnBlur = async (id, subject, scoreValue) => {
    const score = Number(scoreValue);
    if (!isValidScore(scoreValue)) {
      toast.error("Nhập điểm không hợp lệ!!! Vui lòng nhập từ 0 đến 10");
      fetchStudent();
      return;
    }

    // 1. Nếu nhập sai quy định (âm hoặc > 10)
    if (score < 0 || score > 10) {
      toast.error("Nhập điểm không hợp lệ!!! Vui lòng nhập từ 0 đến 10");
      fetchStudent(); // Tải lại dữ liệu gốc từ Server để xóa số sai trên màn hình
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/students/${id}/score`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [subject]: Number(scoreValue) }),
        },
      );

      if (response.ok) {
        setListStudents((prev) =>
          prev.map((student) =>
            student.id === id ? { ...student, [subject]: scoreValue } : student,
          ),
        );
      } else {
        toast.error("Lưu điểm thất bại!");
        fetchStudent(); // Nếu Server lưu thất bại, reset về điểm cũ từ Server
      }
    } catch (error) {
      console.error("Lỗi", error);
      fetchStudent(); // Lỗi mạng cũng reset về điểm cũ
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/students/${id}`, {
        method: "DELETE",
      });
      const message = await response.text();
      if (response.ok) {
        alert(message);
        setListStudents((prev) => prev.filter((student) => student.id !== id));
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Lỗi xảy ra ", error);
    }
  };

  const filteredStudent = listStudents.filter((student) => {
    const matchesName = (student.name || "")
      .toLowerCase()
      .includes(searchStudent.toLowerCase());
    const matchesSchool =
      selectedSchool === "All" || student.school === selectedSchool;
    return matchesName && matchesSchool;
  });

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm sinh viên ..."
          value={searchStudent}
          onChange={(e) => setSearchStudent(e.target.value)}
        />
      </div>

      <div>
        <table border="1">
          <thead>
            <tr>
              <th rowSpan="2">Mã sinh viên</th>
              <th rowSpan="2">Họ và tên</th>
              <th rowSpan="2" style={{ padding: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <span>Trường</span>
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <select
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      style={{
                        opacity: 0, // Ẩn phần khung thô của select
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <option value="All">Tất cả sinh viên</option>
                      <option value="Đại học Công Nghệ">
                        Đại học Công Nghệ
                      </option>
                      <option value="Đại học Illinois">Đại học Illinois</option>
                    </select>
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "12px",
                        color: selectedSchool !== "All" ? "#1890ff" : "#666",
                      }}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </th>
              <th colSpan="4">Điểm số</th>
              <th rowSpan="2">Điểm trung bình</th>
              <th rowSpan="2">Đánh giá</th>
              <th rowSpan="2">Chỉnh sửa</th>
              <th rowSpan="2">Xem thông tin</th>
            </tr>

            <tr>
              <th>Toán</th>
              <th>Lý</th>
              <th>Hóa</th>
              <th>Văn</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudent.length > 0 ? (
              filteredStudent.map((student) => {
                const mathsScore = Number(student.maths) || 0;
                const physicsScore = Number(student.physics) || 0;
                const chemistryScore = Number(student.chemistry) || 0;
                const literatureScore = Number(student.literature) || 0;
                const isFull = [
                  student.maths,
                  student.physics,
                  student.chemistry,
                  student.literature,
                ].every(isValidScore);
                const avg = isFull
                  ? (
                      (mathsScore +
                        physicsScore +
                        chemistryScore +
                        literatureScore) /
                      4
                    ).toFixed(2)
                  : "";

                return (
                  <tr key={student.id}>
                    <td>{student.studentId}</td>
                    <td>{student.name}</td>
                    <td>{student.school}</td>

                    {/* TOÁN */}
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={student.maths ?? ""}
                        onChange={(e) =>
                          handleInputChange(student.id, "maths", e.target.value)
                        }
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "maths",
                            e.target.value,
                          )
                        }
                      />
                    </td>

                    {/* LÝ */}
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={student.physics ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            student.id,
                            "physics",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "physics",
                            e.target.value,
                          )
                        }
                      />
                    </td>

                    {/* HÓA */}
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={student.chemistry ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            student.id,
                            "chemistry",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "chemistry",
                            e.target.value,
                          )
                        }
                      />
                    </td>

                    {/* VĂN */}
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={student.literature ?? ""}
                        onChange={(e) =>
                          handleInputChange(
                            student.id,
                            "literature",
                            e.target.value,
                          )
                        }
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "literature",
                            e.target.value,
                          )
                        }
                      />
                    </td>

                    <td>{avg}</td>
                    <td>{getRank(avg)}</td>
                    <td>
                      <button onClick={() => handleDelete(student.id)}>
                        Xóa
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/detail-student/${student.id}`)
                        }
                      >
                        Xem thông tin
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="11">Chưa có sinh viên nào hoặc đang tải...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
