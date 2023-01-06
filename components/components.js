import React, { useEffect } from "react";
import axios from "axios";
import { response } from "express";

function myCompo() {
  const [phoneNo, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/getNumber").then((response) => {
      setPhoneNumber(response.data.phoneNumber);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getName", {
        headers: {
          auth: "my-auth-token",
        },
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.Error);
        } else {
          setName(response.data.name);
        }
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error.errcode}</p>
        <p>{error.errormessage}</p>
      </div>
    );
  }

  return <h2>Phone No.: {phoneNo}</h2>;
}

export default myCompo;