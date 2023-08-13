import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import { Modal, Button } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const App = () => {
  const BASE_URL="https://table-mern-backend.onrender.com/api/v1";
  const [Name, setName] = useState("");
  const [PhoneNo, setPhoneNo] = useState("");
  const [Email, setEmail] = useState("");
  const [Hobbies, setHobbies] = useState("");
  const [data, setData] = useState([]);
  const [handle, setHandle] = useState("add");
  const [_id, set_id] = useState("");
  const [mailData, setMailData] = useState([]);
  const [isShow, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!isShow);
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_tvxp0ur",
        "template_8mj129s",
        form.current,
        "N--B1oUv5I0YMOqYK"
      )
      .then(
        (result) => {
          message.success(`data sent to mailid info@redpositive.in`);
          setMailData([]);
          window.location.reload();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const addData = async () => {
    try {
      const data = { Name, PhoneNo, Email, Hobbies };
      const res = await axios.post(`${BASE_URL}/add`, data);
      console.log(res);
      setName("");
      setEmail("");
      setHobbies("");
      setPhoneNo("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToMail = (Name, PhoneNo, Email, Hobbies, _id, bool) => {
    if (bool) {
      setMailData([...mailData, { _id, Name, PhoneNo, Email, Hobbies }]);
    } else {
      setMailData(mailData.filter((element) => element._id !== _id));
    }
  };
  const updateData = async () => {
    try {
      const data = { _id, Name, PhoneNo, Email, Hobbies };
      const res = await axios.post(`${BASE_URL}/update`, data);
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
      await axios.post(`${BASE_URL}/delete`, { _id });
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
    invokeModal(!isShow);
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
    invokeModal(!isShow);
    message.success(`data ${handle}ed`);
    setHandle("add");
    window.location.reload();
  };
  const getAllValue = async () => {
    const res = await axios.get(`${BASE_URL}/getAll`);
    setData(res.data.allData);
  };
  useEffect(() => {
    getAllValue();
  }, []);
  return (
    <div>
      <Button variant="success" onClick={initModal} style={{"marginLeft":"40rem"}}>
        {handle} data
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>{`${handle} form`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            style={{
              width: "25rem",
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
              {handle} data
            </button>
          </form>
        </Modal.Body>
      </Modal>

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
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const bool = e.target.checked;
                      handleAddToMail(Name, PhoneNo, Email, Hobbies, _id, bool);
                    }}
                  />
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
      <div style={{ marginLeft: "20rem" }}>
        {mailData.map((data) => JSON.stringify(data)).toString()}
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        style={{
          width: "25rem",
          justifyContent: "center",
          "margin-left": "20rem",
        }}
      >
        <label className="form-label" style={{ display: "none" }}>
          Name
        </label>
        <input
          type="text"
          name="from-name"
          className="form-control"
          aria-describedby="emailHelp"
          style={{ display: "none" }}
        />
        <label style={{ display: "none" }}>Email</label>
        <input
          type="email"
          name="from-email"
          className="form-control"
          aria-describedby="emailHelp"
          style={{ display: "none" }}
        />
        <label style={{ display: "none" }}>Message</label>
        <input
          name="message"
          className="form-control input-lg"
          aria-describedby="emailHelp"
          value={mailData.map((data) => JSON.stringify(data)).toString()}
          height={100}
          style={{ display: "none" }}
        />
        <input type="submit" value="Send Email" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default App;
