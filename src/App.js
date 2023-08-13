import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [Name, setName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Hobbies, setHobbies] = useState("");
  const [data, setData] = useState([]);
  const [handle, setHandle] = useState("add");
  const [_id, set_id] = useState("");
  const addData = async () => {
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
  const updateData = async () => {
    try {
      console.log({ _id, Name, PhoneNo, Email, Hobbies });
      const data = { _id, Name, PhoneNo, Email, Hobbies };
      const res = await axios.post("/update", data);
      console.log(res);
      setName("");
      setEmail("");
      setHobbies("");
      setPhoneNo("");
      set_id("");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async () => {
    try {
      const res = await axios.post("/delete", { _id });
      console.log(res);
      setName("");
      setEmail("");
      setHobbies("");
      setPhoneNo("");
      set_id("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleType = (Name, PhoneNo, Email, Hobbies, type, _id) => {
    setHandle(type);
    setName(Name);
    setEmail(Email);
    setHobbies(Hobbies);
    setPhoneNo(PhoneNo);
    set_id(_id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handle === "add") {
      addData();
    } else if (handle === "update") {
      updateData();
    } else if (handle === "delete") {
      deleteData();
    }
    setHandle("add");
  };
  const getAllValue = async () => {
    const res = await axios.get("/getAll");
    setData(res.data.allData);
  };
  useEffect(() => {
    getAllValue();
  }, []);
  return (
    <div>
      <form
        style={{
          width: "25rem",
          justifyContent: "center",
          "margin-left": "20rem",
        }}
      >
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="PhoneNo" className="form-label">
            PhoneNo
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="PhoneNo"
            value={PhoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Hobbies" className="form-label">
            Hobbies
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="Hobbies"
            value={Hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          {handle}
        </button>
      </form>
      <table style={{ marginLeft: "20rem" }}>
        <tr style={{ marginBottom: "5rem" }}>
          <th>select</th>
          <th>serial No</th>
          <th>Name</th>
          <th>PhoneNo</th>
          <th>Email</th>
          <th>Hobbies</th>
          <th>Upadate</th>
          <th>Delete</th>
        </tr>
        <tbody>
          {data.map((currData, index) => {
            const { _id, Name, PhoneNo, Email, Hobbies } = currData;

            return (
              <tr key={index} style={{ marginBottom: "5rem" }}>
                <td>
                  <input type="checkbox" />
                </td>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td>{Name}</td>
                <td>{PhoneNo}</td>
                <td>{Email}</td>
                <td>{Hobbies}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleType(Name, PhoneNo, Email, Hobbies, "update", _id);
                    }}
                    className="btn btn-primary"
                  >
                    update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleType(Name, PhoneNo, Email, Hobbies, "delete", _id);
                    }}
                    className="btn btn-primary"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
