import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import JumpEditForm from "./JumpEditForm";

const JumpForm = (props) => {
  const [id, setId] = useState("");
  const [jumpnum, setJumpnum] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [equipment, setEquipment] = useState("");
  const [altitude, setAltitude] = useState("");
  const [freefall, setFreefall] = useState("");
  const [description, setDescription] = useState("");
  const [jumps, setJumps] = useState([]);
  const [editId, setIdOfEdit] = useState(null);
  const [user, token] = useAuth();

  const weatherForJump = `\nTemp:${props.weather.temperature}\n Wind Speed:${props.weather.windspeed}\n Wind Direction:${props.weather.winddirection}°\n`;

  function handleSubmit(event) {
    event.preventDefault();
    console.log("weather", props.weather);
    setId(props.id);
    let newJump = {
      jumpnum: jumpnum,
      date: date,
      place: place,
      aircraft: aircraft,
      equipment: equipment,
      altitude: altitude,
      freefall: freefall,
      description: description,
      weather: weatherForJump,
      user: user,
    };
    console.log("object we arre trying to post", newJump);
    addNewJump(newJump);
    fetchJumps();
    window.location.reload();
  }

  useEffect(() => {
    fetchJumps();
  }, []);

  async function addNewJump(newJump) {
    await axios.post("http://127.0.0.1:8000/api/jump/", newJump, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("New Jump", newJump);
  }

  async function fetchJumps() {
    let response = await axios.get("http://127.0.0.1:8000/api/jump/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("response from axios", response.data, props.weather, id);
    setJumps(response.data);
  }

  async function handleDelete(id) {
    let response = await axios.delete(`http://127.0.0.1:8000/api/jump/${id}/`);
    if (response.status === 204) {
      fetchJumps();
      return true;
    }
  }

  async function handleEditJump(id) {
    setIdOfEdit(id);
  }

  return (
    <div className="background-img">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            color: "yellow",
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "black",
            marginLeft: "1rem",
            marginRight: "50rem",
            borderRadius: ".75em",
            boxShadow: "10px 5px 5px #764134",
            opacity: "50%",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Jump Number"
            onChange={(event) => setJumpnum(event.target.value)}
          />
          <input
            type="date"
            className="form-control"
            placeholder="Enter Date"
            onChange={(event) => setDate(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Place"
            onChange={(event) => setPlace(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Aircraft..."
            onChange={(event) => setAircraft(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Equipment..."
            onChange={(event) => setEquipment(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Altitude..."
            onChange={(event) => setAltitude(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Freefall..."
            onChange={(event) => setFreefall(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Jump Description..."
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-dark btn-block"
          style={{ margin: "1em", marginBottom: "0rem" }}
        >
          Log Jump
        </button>
        {/* <p>{jumps}</p> */}
      </form>
      {editId ? (
        <div>
        <JumpEditForm
          editId={editId}
          setIdOfEdit={setIdOfEdit}
          fetchJumps={fetchJumps}
          elementToEdit={editId}
        ></JumpEditForm>        
        <button className="btn btn-dark" style={{marginLeft: "1rem"}} onClick={()=>setIdOfEdit(null)}>Close</button>
        </div>

      ) : (null)}
      <div style={{ margin: "1rem" }}>
        <div class="row">
          <div class="searched-chart">
            <table class="table table-bordered">
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
                  <th className="font-link"></th>
                </tr>
              </thead>
              <tbody>
                {jumps
                  .slice(0)
                  .reverse()
                  .map((el) => {
                    return (
                      <tr>
                        <td>{el.jumpnum}</td>
                        <td>{el.date}</td>
                        <td>{el.place}</td>
                        <td>{el.aircraft}</td>
                        <td>{el.equipment}</td>
                        <td>{el.altitude}</td>
                        <td>{el.freefall}</td>
                        <td>{el.description}</td>
                        <td>{el.weather}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => setIdOfEdit(el)}
                          >
                            <i className="fas fa-edit">Edit</i>
                          </button>
                          <button
                            type="button"
                            style={{marginLeft: ".5rem"}}
                            class="btn btn-danger"
                            onClick={() => handleDelete(el.id)}
                          >
                            <i class="far fa-trash-alt">Delete</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default JumpForm;

// {jumps.slice(0).reverse().map(function(el){
//   return <div>
//     <p>{el.jumpnum}</p>
//     <p>{el.date}</p>
//     <p>{el.place}</p>
//     <p>{el.aircraft}</p>
//     <p>{el.equipment}</p>
//     <p>{el.altitude}</p>
//     <p>{el.freefall}</p>
//     <p>{el.description}</p>
//     <br></br>
//     </div>
// })}
