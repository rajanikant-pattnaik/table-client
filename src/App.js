import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [Name, setName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Hobbies, setHobbies] = useState("");
  const [data, setData] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ Name, PhoneNo, Email, Hobbies });
      const data = { Name, PhoneNo, Email, Hobbies };
      const res = await axios.post("/add", data);
      console.log(res);
      setName("");
      setEmail("");
      setHobbies("");
      setPhoneNo("");
    } catch (error) {
      console.log(error);
    }
  };
  const getAllValue=async()=>{
    const res=await axios.get('/getAll');
    setData(res.data.allData);
  }
  useEffect(() => {
    getAllValue();
  }, [])
  console.log(data);
  return (
    <div>
      <form>
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          name="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="PhoneNo">PhoneNo</label>
        <input
          type="text"
          name="PhoneNo"
          value={PhoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          name="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Hobbies">Hobbies</label>
        <input
          type="text"
          name="Hobbies"
          value={Hobbies}
          onChange={(e) => setHobbies(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default App;
