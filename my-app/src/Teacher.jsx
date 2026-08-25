import { useState, useEffect } from "react";

export default function Teacher() {
  const [listStudents, setListStudents] = useState([]);
  useEffect(() => {
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
    fetchStudent();
  }, []);
  const handleSaveScoreOnBlur = async (id, subject, scoreValue) => {
    try {
      await fetch(`http://localhost:8080/api/students/${id}/score`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [subject]: scoreValue }),
      });
    } catch (error) {
      console.error("Lỗi", error);
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
  const getRank = (avgScore) => {
    if (avgScore === "" || avgScore === null || avgScore === undefined)
      return "";
    if (avgScore >= 9.0) return "Xuất sắc";
    if (avgScore >= 8.0 && avgScore < 9.0) return "Giỏi";
    if (avgScore >= 6.5 && avgScore < 8.0) return "Khá";
    if (avgScore < 6.5) return "Yếu";
  };
  return (
    <>
      <div>
        <table border="1">
          <thead>
            <tr>
              <th rowSpan="2">Mã sinh viên</th>
              <th rowSpan="2">Họ và tên</th>
              <th rowSpan="2">Trường</th>
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
            {listStudents.length > 0 ? (
              listStudents.map((student) => {
                const mathsScore = Number(student.maths) || 0;
                const physicsScore = Number(student.physics) || 0;
                const chemistryScore = Number(student.chemistry) || 0;
                const literatureScore = Number(student.literature) || 0;
                const isFull = [
                  student.maths,
                  student.physics,
                  student.chemistry,
                  student.literature,
                ].every(
                  (score) =>
                    score !== null && score !== "" && score !== undefined,
                );
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
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        defaultValue={student.maths || ""}
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "maths",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        defaultValue={student.physics || ""}
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "physics",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        defaultValue={student.chemistry || ""}
                        onBlur={(e) =>
                          handleSaveScoreOnBlur(
                            student.id,
                            "chemistry",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        defaultValue={student.literature || ""}
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
                    <td></td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">Chưa có sinh viên nào hoặc đang tải...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
