import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication

  const [user, token] = useAuth();
  const [jumps, setJumps] = useState([]);

  useEffect(() => {
    fetchJumps();
  }, [token]);

  const fetchJumps = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/skydiver/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setJumps(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="background-img2">
      <div className="container">
        <h1 style={{color:"navy"}}>{user.username}'s Skydiving Log!</h1>
        {jumps && jumps.map((jump) => <p key={jump.id} style={{color:"navy"}}>{jump.year}</p>)}
      </div>
    </div>
  );
};

export default HomePage;
