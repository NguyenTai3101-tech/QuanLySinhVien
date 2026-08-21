import { useState } from "react";
import Profile from "./Profile";
export default function FixProfile() {
  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [school, setSchool] = useState("");
  const [isFix,setIsFix] = useState(false);
  const [saveInfo, setSaveInfo] = useState(null);
  const handleSave = () => {    
    setSaveInfo({studentID, name, school});
    setIsFix(true);
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
        <Profile inFo = {saveInfo} />
      </div>
    </>
  );
}
