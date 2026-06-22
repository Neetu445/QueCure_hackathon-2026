function QueueTable({queue}){

    return(
        <div style={styles.panel}>

            <h2>
                Live Queue
            </h2>

            <table style={styles.table}>
                <thead>

                    <tr>

                        <th>Token</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        queue.map((p)=>(

                            <tr key ={p.id}>

                               <td>
                                    #{p.tokenNumber}
                                </td> 

                               <td>
                                    {p.name}
                                </td> 


                               <td>
                                  <span styles={styles.badge}>
                                    Waiting
                                  </span>
                                </td> 
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}

const styles={


panel:{
background:"white",
padding:"25px",
borderRadius:"16px"
},


table:{
width:"100%"
},


badge:{
background:"#dcfce7",
padding:"6px 12px",
borderRadius:"20px"
}


}



export default QueueTable;