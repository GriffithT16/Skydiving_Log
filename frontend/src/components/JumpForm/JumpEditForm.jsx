import React, {useState} from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth' 
import JumpForm from './JumpForm'

const JumpEditForm =(props)=>{
    const [editJump, setEditJump] = useState(props.elementToEdit)
    const [user,token] = useAuth()
    const [editId, setIdOfEdit] = useState(null);

    
  async function handleEdit(event) {
    event.preventDefault()
    let response = await axios.put(
      `http://127.0.0.1:8000/api/jump/${editJump.id}/`,
      editJump,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      props.fetchJumps();
    }
  }
  async function handleEditJump(id) {
    setIdOfEdit(id);
  }

  return(
      <div className="background-img">
        <form onSubmit={handleEdit}>
          <div
            style={{
              color: "white",
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "black",
              marginTop: "0rem",
              margin: "1em",
              borderRadius: ".75em",
              boxShadow: "10px 5px 5px #764134",
              opacity: "50%",
            }}
          >
            <input
              type="text"
              className="form-control"
              name="jumpnum"
              placeholder="Enter Jump Number"
              value ={editJump.jumpnum}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="date"
              className="form-control"
              name="date"
              placeholder="Enter Date"
              value ={editJump.date}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="place"
              placeholder="Enter Place"
              value ={editJump.place}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="aircraft"
              placeholder="Aircraft..."
              value ={editJump.aircraft}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="equipment"
              placeholder="Equipment..."
              value ={editJump.equipment}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="altitude"
              placeholder="Altitude..."
              value ={editJump.altitude}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="freefall"
              placeholder="Freefall..."
              value ={editJump.freefall}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="description"
              placeholder="Jump Description..."
              value ={editJump.description}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
            <input
              type="text"
              className="form-control"
              name="weather"
              placeholder="Jump Description..."
              value ={editJump.weather}
              onChange={(event) => setEditJump({...editJump, [event.target.name]:event.target.value})}
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ "margin-left": "1em" }}
          >
            Save Edit
          </button>
          {/* <button
            onClick={()=>setIdOfEdit(null)}
            type="submit"
            className="btn btn-dark"
            style={{ "margin-left": "1em" }}
          >
            Close
          </button> */}
         

        </form>
      </div>
    )
}

export default JumpEditForm