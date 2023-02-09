import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Example from "../DirectionsPage/TestPage";

const ViewJumps = (props) => {    
  const [jumps, setJumps] = useState([]);  
  const [user, token] = useAuth();
  
  useEffect(() => {
    fetchJumps();
  }, []);


  async function fetchJumps() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    console.log("response from axios", response.data);
    setJumps(response.data);
  }

  return (  
        <div className="background-img">
        <h1 className="font-link title" style={{marginLeft: "7em"}}>{user.username}'s Logged Jumps</h1>
        <div className="searched-chart" style={{margin: "1rem", marginBottom: "0rem"}}>
          <table className="table table-striped" style={{marginBottom: "2rem"}}>
            <thead>
              <tr>
                <th className="font-link">Jump Number</th>
                <th className="font-link">Date</th>
                <th className="font-link">DropZone</th>
                <th className="font-link">Aircraft</th>
                <th className="font-link">Equipment</th>
                <th className="font-link">Altitude</th>
                <th className="font-link">Freefall</th>
                <th className="font-link">Jump Description</th>            
                <th className="font-link">Jump Weather </th>                    
              </tr>
            </thead>
            <tbody>
              {jumps
                .slice(0)
                .reverse()
                .map((el) => {
                  return (
                    <tr key={el.user}>                   
                      <td>{el.jumpnum}</td>
                      <td>{el.date}</td>
                      <td>{el.place}</td>
                      <td>{el.aircraft}</td>
                      <td>{el.equipment}</td>
                      <td>{el.altitude}</td>
                      <td>{el.freefall}</td>
                      <td>{el.description}</td>               
                      <Example weather={el.weather}/>        
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>    
  );
};

export default ViewJumps;