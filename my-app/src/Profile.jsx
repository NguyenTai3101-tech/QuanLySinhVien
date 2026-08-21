import { useState } from "react";
export default function Profile({ inFo }) {

  return (
    <>
      <div>
        <h1>Thông tin sinh viên</h1>
        <p>Họ và tên{inFo?.name || ""}</p>
        <p> Mã sinh viên{inFo?.studentID || ""}</p>
        <p>Trường{inFo?.school || ""}</p>
      </div>
    </>
  );
}
