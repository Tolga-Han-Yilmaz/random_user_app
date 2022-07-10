import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import loadingGif from "./assets/loading.gif";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [isData, setIsData] = useState({});
  const [isShow, setIsShow] = useState(true);
  const [show, setShow] = useState(false);

  // const [info, setInfo] = useState({
  //   title: "",
  //   first: "",
  //   last: "",
  //   email: "",
  //   age: "",
  //   country: "",
  //   cell: "",
  //   gender: "",
  // });

  const getData = async () => {
    try {
      const res = await axios(url);
      const data = await res.data.results[0];
      setIsData(data);
      setIsShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (isShow) {
    return (
      <div>
        <img src={loadingGif} alt="loading" />
      </div>
    );
  }
  console.log(isData);
  const {
    name: { title, first, last },
    email,
    registered: { age },
    location: { country },
    cell,
    gender,
    picture: { thumbnail },
  } = isData;
  console.log(gender);

  const handleName = () => {};

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={isShow ? defaultImage : thumbnail}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value"></p>
          <div className="values-list">
            <button className="icon" data-label="name" onClick={handleName}>
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button">
              new user
            </button>
            <button className="btn" type="button">
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr className="body-tr">
                <td>
                  {title} {first} {last}
                </td>
                <td>{email}</td>
                <td>{cell}</td>
                <td>{age}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
