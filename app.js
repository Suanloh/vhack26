import React from "react";
import FraudShield from "./components/FraudShield";

function App() {
  return (
    <div style={styles.page}>
      {/* 1. HERO SECTION */}
      <header style={styles.hero}>
        <h1 style={styles.title}>Digital Trust</h1>
        <p style={styles.subtitle}>Real-Time Fraud Shield for the Unbanked</p>
        <div style={styles.badge}>Machine Learning • Anomaly Detection</div>
      </header>

      <main style={styles.content}>
        {/* 2. THE PROBLEM STATEMENT */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>The Problem</h2>
          <p style={styles.text}>
            Conventional rule-based fraud detection systems are often inadequate
            in identifying sophisticated or evolving fraud patterns. For the
            unbanked, this leads to
            <strong> False Declines</strong>—blocking legitimate users who don't
            have traditional banking histories.
          </p>
        </section>

        {/* 3. THE LIVE COMPONENT (Your code integrated here) */}
        <section style={styles.shieldWrapper}>
          <FraudShield />
        </section>

        {/* 4. TECHNICAL SUB-TASKS */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Technical Pillars</h2>
          <div style={styles.grid}>
            <div style={styles.card}>
              <h4>Behavioral Profiling</h4>
              <p>
                Analyzing frequency, amount, and location to build a baseline of
                "normal" for unbanked users.
              </p>
            </div>
            <div style={styles.card}>
              <h4>Anomaly Scoring</h4>
              <p>
                Developing a sub-200ms model to Approve, Flag, or Block
                transactions instantly.
              </p>
            </div>
            <div style={styles.card}>
              <h4>Imbalanced Handling</h4>
              <p>
                Using SMOTE and Focal Loss to train on datasets where fraud is
                rare.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        Digital Trust Case Study &copy; 2026 | Built with React & ML
      </footer>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    color: "#e0e0e0",
    minHeight: "100vh",
    fontFamily: '"Inter", sans-serif',
  },
  hero: { textAlign: "center", padding: "80px 20px", backgroundColor: "#111" },
  title: {
    fontSize: "3rem",
    margin: "0",
    color: "#fff",
    letterSpacing: "-1px",
  },
  subtitle: { fontSize: "1.2rem", color: "#888", marginTop: "10px" },
  badge: {
    display: "inline-block",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    padding: "5px 15px",
    borderRadius: "20px",
    marginTop: "20px",
    fontSize: "0.8rem",
  },
  content: { maxWidth: "900px", margin: "0 auto", padding: "40px 20px" },
  section: { marginBottom: "60px" },
  sectionTitle: {
    borderBottom: "1px solid #333",
    paddingBottom: "10px",
    marginBottom: "20px",
    color: "#fff",
  },
  text: { lineHeight: "1.6", fontSize: "1.1rem", color: "#bbb" },
  shieldWrapper: { margin: "40px 0" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "20px",
    backgroundColor: "#161616",
    borderRadius: "8px",
    border: "1px solid #222",
  },
  footer: {
    textAlign: "center",
    padding: "40px",
    color: "#444",
    fontSize: "0.8rem",
    borderTop: "1px solid #111",
  },
};

export default App;
