function StatCard({icon, title, value, color="#0284c7"}){

    return(
        <div style={styles.card}>

          <div style={{
            ...styles.iconBox,
            background:color+ "18",
        color:color}}>{icon}</div>  
            
           <div>
            <p style={styles.title}>{title}</p>
            <h2 style={{...styles.value, color:color}}>{value}</h2>
           </div>


        </div>
    );
}

const styles = {
  card: {
    background: "white",
    padding: "22px 20px",
    borderRadius: "16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    border: "1px solid #f1f5f9",
  },
  iconBox: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: "12px",
    color: "#64748b",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "4px",
  },
  value: {
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: 1,
    margin: 0,
  },
};

export default StatCard;