import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile({ inFo }) {
  const navigate = useNavigate();
  const inFoStudent = JSON.parse(localStorage.getItem("inFoStudent")) || [];

  return (
    <>
      <div>
        <h1>Thông tin sinh viên</h1>
        <p>Họ và tên : {inFoStudent?.name || ""}</p>
        <p> Mã sinh viên : {inFoStudent?.studentId || ""}</p>
        <p>Trường : {inFoStudent?.school || ""}</p>
        <button onClick={() => navigate("/fix-profile")}>
          Chỉnh sửa thông tin
        </button>
      </div>
    </>
  );
}
