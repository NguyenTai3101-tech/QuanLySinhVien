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
              listStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.school}</td>
                  <td>
                    <input
                      type="number"
                      step="0.1"
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
                      type="text"
                      step="0.1"
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
                      type="text"
                      step="0.1"
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
                </tr>
              ))
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
