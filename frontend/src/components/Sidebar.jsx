function Sidebar(){
    return(
        <aside style={styles.sidebar}>

            <h1 style={{
  background: "linear-gradient(90deg, #0284c7, #16a34a)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
 margin: 0,
  padding: 0,
  lineHeight: "1.2",
  whiteSpace: "nowrap"
}}>
  Queue Cure
</h1>

            <p>
                Smart Clinic Management
            </p>

            <div style={styles.menu}>
                Dashboard
            </div>


            <div style={styles.menu}>
                Patients
            </div>
            <div style={styles.menu}>
                Analytics
            </div>
        </aside>

)

}
        const styles={

sidebar: {
  width: "240px",
  flexShrink: 0,
  height: "100vh",
  position: "sticky",
  top: 0

},


main: {
  flex: 1,
  minWidth: "300px",
  padding: "40px",
  overflowX: "auto"
},




menu:{
    marginTop:"20px",
    padding:"12px",
    background:"#1e293b",
    borderRadius:"10px"
}

}


export default Sidebar;
