import Patient from "../models/Patient.js";
import{io} from "../server.js";

export const addPatient = async(req, res)=>{

    try{

        const count = await Patient.countDocuments();

        const patient = await Patient.create({
            ...req.body,

            tokenNumber: count + 101
        
        });

        io.emit("queueUpdated")

        res.status(201).json(patient);

    }
    catch(err){

        console.log("PATIENT ERROR:", err);

        res.status(500).json({

        message:err.message
    });

    }
};

//get
export const getQueue = async(req, res) =>{

    try{

        const waiting = await Patient.find({
            status:"waiting"
        }).sort({
            joinedAt:1
        });

        const serving = await Patient.findOne({
            status:"serving"
        });


const completed = await Patient.find({ status: "completed" });

res.json({
  waiting,
  serving,
  completed
});

    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

//call
export const callNext = async(req, res) =>{

    try{

        const nextPatient = await Patient.findOne({
            status:"waiting"
        }).sort({
            joinedAt:1
        });

        if(!nextPatient){
            return res.status(404).json({
                message:"No patients waiting"
            });

        }

        nextPatient.status="serving";
        nextPatient.calledAt=new Date();

        await nextPatient.save();

        io.emit("queueUpdated")

        res.json(nextPatient);

    }catch(err){

        res.status(500).json({
            message:err.message
        });
    }
};

export const completePatient = async (req, res) => {
  try {

    console.log(" COMPLETE API HIT");

    const patient = await Patient.findOne({
      status: "serving"
    });

    if (!patient) {
      return res.status(404).json({
        message: "No serving patient"
      });
    }

    patient.status = "completed";
    patient.completeAt = new Date();

    await patient.save();

    io.emit("queueUpdated");

   await Patient.save();
io.emit("queueUpdated");
res.json({ success: true });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};