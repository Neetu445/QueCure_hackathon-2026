function StatCard({icon, title, value}){

    return(
        <div style={styles.card}>

            {icon}
            
            <h3>
                {title}
            </h3>

            <h1>{value}</h1>
        </div>
    )
}

const styles={
    card:{
        background:"white",
        padding:"20px",
        borderRadius:"16px",
        boxShadow:"0 4px 15px rgba(0,0,0,0.08)"

    }
}

export default StatCard;