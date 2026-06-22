import {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {Users, Clock, Bell, CheckCircle} from "lucide-react";

import api from "../services/api";
import PatientForm from "../components/PatientForm";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import QueueTable from "../components/QueueTable";


function Receptionist(){

    const [queue,setQueue] = useState([]);

    const[serving,setServing] =useState(null);

    const [completed, setCompleted] = useState([]);

    const [avgTime, setAvgTime]=useState(6);



    const loadQueue = async()=>{

        try{

            const res = await api.get("/patient");

            setQueue(res.data.waiting);
            setServing(res.data.serving);

            setCompleted(res.data.completed || []);

        }catch(err){

            console.log(err);

        }

    };



    useEffect(()=>{


        loadQueue();


        const socket = io("http://localhost:5000");


        socket.on("queueUpdated",()=>{

            loadQueue();

        });



        return()=>{

            socket.disconnect();

        };


    },[]);




    const callNext = async()=>{
        try{

        await api.patch("/patient/next");
        loadQueue();
        }catch(err){

            console.log("CALL NEXT ERROR", err);
        }

    };




    return(

    <div style={styles.app}>


        <Sidebar />

        <main style={styles.main}>


            <h1>
                Receptionist Dashboard
            </h1>


            <div style={styles.cards}>


                <StatCard
                icon={<Users size={30}/>}
                title="Waiting"
                value={queue.length}
                />



                <StatCard
                icon={<Clock size={30}/>}
                title="Avg Wait"
                value={`${queue.length*avgTime} min`}
                />



                <StatCard
                icon={<Bell size={30}/>}
                title="Serving"
                value={serving ? 1:0}
                />



                <StatCard
                icon={<CheckCircle size={30}/>}
                title="Completed"
                value={completed.length}
                />


            </div>

            <div style={styles.panel}>

                <h2>
                    Add Patient
                </h2>

                <PatientForm refresh={loadQueue}/>

                <div>
                    <label>Average Consultation Time(minutes)</label>

                    <input 
                    type="number"
                    value={avgTime}
                    min="1"
                    onChange={(e)=>setAvgTime(Number(e.target.value))}
                    />
                </div>

                <button style={styles.button}
                onClick={callNext}>
                    Call Next Patient
                </button>

                <button
                    style={{
                         marginTop: "10px",
                         padding: "12px 25px",
                         border: "none",
                            borderRadius: "10px",
                         background: "#16a34a",
                         color: "white",
                         cursor: "pointer"
  }}
  onClick={async () => {
    await api.patch("/patient/complete");
  
  }}
>
  Complete Patient
</button>
            </div>

            <QueueTable queue={queue}/>

            </main></div>
    )
}

const styles={
app: {
  display: "flex",
  minHeight: "100vh",
  background: "#f8fafc",
  flexWrap:"wrap"
},
    main: {
  flex: 1,
  padding: "40px",
  minWidth: "300px"
},

    cards:{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
        gap:"20px",
        marginTop:"25px"
    },

    panel:{
        background:"white",
        padding:"25px",
        borderRadius:"16px",
        marginTop:"25px"
    },

    button:{
        marginTop:"20px",
        padding:"12px 25px",
        border:"none",
        borderRadius:"10px",
        background:"#0284c7",
        color:"white",
        cursor:"pointer"
    }
}

export default Receptionist;


