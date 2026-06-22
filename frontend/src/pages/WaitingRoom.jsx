import{useEffect, useState} from "react";
import{io} from "socket.io-client";
import api from "../services/api";


function WaitingRoom(){

    const[queue, setQueue]=useState([]);

    const loadQueue=async()=>{
        const res=await api.get("/patient");

        setQueue(res.data.waiting);
    };

    useEffect(()=>{
        loadQueue();

        const socket = io("http://localhost:5000");
        socket.on("queueUpdated", ()=>{
        loadQueue();
    });

    return()=>{
        socket.disconnect();
    };

},[]);

return(

     <div style={{
      minHeight:"100vh",
      background:"#f4f7fb",
      padding:"40px"
    }}>

      <h1>Queue Cure</h1>

      <h2>Patient Waiting Room</h2>

      {queue.length > 0 ? (

        <div
          style={{
            background:"white",
            padding:"25px",
            borderRadius:"12px",
            marginTop:"20px"
          }}
        >

          <h1>Now Serving</h1>

          <h1>
            Token #{queue[0].tokenNumber}
          </h1>

          <p>
            Patient: {queue[0].name}
          </p>

          <p>
            Patients Ahead: {queue.length - 1}
          </p>

          <h3>
            Estimated Wait:
            {(queue.length - 1) * 6} mins
          </h3>

        </div>

      ) : (

        <h2>No Patients Waiting</h2>

      )}

    </div>
  );
}

export default WaitingRoom;
