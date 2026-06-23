function QueueTable({ queue }) {
  return (
    <div style={styles.panel}>

      
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Live Queue</h2>
          <p style={styles.subtitle}>{queue.length} patients waiting</p>
        </div>
        <span style={styles.liveBadge}>
          <span style={styles.liveDot} />
          LIVE
        </span>
      </div>

      
      {queue.length === 0 ? (
        <div style={styles.empty}>
          <p style={{ fontSize: "40px" }}>🎉</p>
          <p style={styles.emptyText}>Queue is empty!</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Token</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((p, index) => (
                <tr key={p._id} style={styles.row}>

                  <td style={styles.td}>
                    <span style={styles.indexBadge}>{index + 1}</span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.token}>#{p.tokenNumber}</span>
                  </td>

                  <td style={{
                    ...styles.td,
                    fontWeight: "600",
                    color: "#0f172a"
                  }}>
                    {p.name}
                  </td>

                  <td style={styles.td}>
                    <span style={{
                      ...styles.badge,
                      background: p.priority === "urgent"
                        ? "#fef2f2" : "#f0fdf4",
                      color: p.priority === "urgent"
                        ? "#dc2626" : "#16a34a",
                      border: `1px solid ${p.priority === "urgent"
                        ? "#fecaca" : "#bbf7d0"}`,
                    }}>
                      {p.priority === "urgent" ? " Urgent" : " Normal"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.waitingBadge}>⏳ Waiting</span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  panel: {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    border: "1px solid #f1f5f9",
    overflow: "hidden",
    marginTop: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "22px 24px",
    borderBottom: "1px solid #f1f5f9",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "2px",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#fef2f2",
    color: "#dc2626",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    border: "1px solid #fecaca",
  },
  liveDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#dc2626",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "12px 24px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "700",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  row: {
    borderTop: "1px solid #f1f5f9",
  },
  td: {
    padding: "14px 24px",
    fontSize: "14px",
    color: "#334155",
  },
  indexBadge: {
    width: "26px",
    height: "26px",
    borderRadius: "8px",
    background: "#f1f5f9",
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  token: {
    fontWeight: "700",
    color: "#0284c7",
    fontSize: "15px",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },
  waitingBadge: {
    background: "#fffbeb",
    color: "#d97706",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    border: "1px solid #fde68a",
  },
  empty: {
    padding: "60px",
    textAlign: "center",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default QueueTable;