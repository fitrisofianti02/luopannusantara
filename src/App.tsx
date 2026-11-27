
import { useState } from "react";

type Tab = "compass" | "bagua" | "about";

const mountains = [
  "N", "N1", "N2", "N3",
  "NE", "NE1", "NE2", "NE3",
  "E", "E1", "E2", "E3",
  "SE", "SE1", "SE2", "SE3",
  "S", "S1", "S2", "S3",
  "SW", "SW1", "SW2", "SW3",
  "W", "W1", "W2", "W3",
  "NW", "NW1", "NW2", "NW3"
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("compass");
  const [bearing, setBearing] = useState(0);
  const [locked, setLocked] = useState(false);
  const [question, setQuestion] = useState("");

  const mountainIndex = Math.round(bearing / 15) % 24;
  const currentMountain = mountains[mountainIndex];

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-symbol">☯</span>
          <span>
            <strong>LUOPAN</strong>
            <small>NUSANTARA</small>
          </span>
        </a>

        <div className="topbar-label">FENG SHUI DIGITAL COMPASS</div>

        <span className="edition">CLASSICAL EDITION</span>
      </header>

      <section className="hero">
        <div className="eyebrow">TRADITIONAL WISDOM · DIGITAL PRECISION</div>
        <h1>Discover the energy<br />of your <em>direction.</em></h1>
        <p>
          Explore the ancient art of Feng Shui through the
          wisdom of the Luopan compass.
        </p>
      </section>

      <nav className="tabs">
        <button
          className={activeTab === "compass" ? "active" : ""}
          onClick={() => setActiveTab("compass")}
        >
          Compass
        </button>
        <button
          className={activeTab === "bagua" ? "active" : ""}
          onClick={() => setActiveTab("bagua")}
        >
          24 Mountains
        </button>
        <button
          className={activeTab === "about" ? "active" : ""}
          onClick={() => setActiveTab("about")}
        >
          About Luopan
        </button>
      </nav>

      {activeTab === "compass" && (
        <section className="workspace">
          <div className="compass-panel">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FIELD READING</span>
                <h2>Direction Compass</h2>
              </div>
              <span className="status">
                <i /> MANUAL MODE
              </span>
            </div>

            <div className="compass-wrap">
              <div className="compass">
                <div className="compass-ring outer-ring">
                  <span className="direction north">N</span>
                  <span className="direction east">E</span>
                  <span className="direction south">S</span>
                  <span className="direction west">W</span>
                </div>

                <div className="compass-ring middle-ring">
                  {mountains.map((mountain, index) => (
                    <span
                      key={mountain}
                      className="mountain-mark"
                      style={{
                        transform: `rotate(${index * 15}deg) translateY(-112px) rotate(-${index * 15}deg)`
                      }}
                    >
                      {mountain}
                    </span>
                  ))}
                </div>

                <div
                  className="needle"
                  style={{ transform: `rotate(${bearing}deg)` }}
                >
                  <div className="needle-top" />
                  <div className="needle-bottom" />
                </div>

                <div className="compass-center">☯</div>
              </div>
            </div>

            <div className="bearing-display">
              <div>
                <span className="eyebrow">CURRENT BEARING</span>
                <div className="bearing-number">
                  {bearing.toString().padStart(3, "0")}
                  <small>°</small>
                </div>
              </div>
              <div className="mountain-result">
                <span className="eyebrow">24 MOUNTAIN</span>
                <strong>{currentMountain}</strong>
              </div>
            </div>

            <div className="manual-control">
              <label htmlFor="bearing">
                MANUAL BEARING ADJUSTMENT
              </label>
              <input
                id="bearing"
                type="range"
                min="0"
                max="359"
                value={bearing}
                onChange={(event) =>
                  setBearing(Number(event.target.value))
                }
              />
              <div className="range-labels">
                <span>0° NORTH</span>
                <span>359°</span>
              </div>
            </div>

            <button
              className={`lock-button ${locked ? "is-locked" : ""}`}
              onClick={() => setLocked(!locked)}
            >
              {locked ? "🔒 Heading Locked" : "Lock Heading"}
            </button>
          </div>

          <aside className="side-panel">
            <div className="info-card">
              <span className="eyebrow">COMPASS READING</span>
              <h3>Earth Yin</h3>
              <p>
                A traditional compass reading interface for
                exploring directional Feng Shui concepts.
              </p>
              <div className="info-divider" />
              <div className="data-row">
                <span>Facing direction</span>
                <strong>{currentMountain}</strong>
              </div>
              <div className="data-row">
                <span>Bearing</span>
                <strong>{bearing}°</strong>
              </div>
              <div className="data-row">
                <span>Reading mode</span>
                <strong>Manual</strong>
              </div>
            </div>

            <div className="info-card ask-card">
              <span className="eyebrow">EXPLORE THE WISDOM</span>
              <h3>Ask a Mountain</h3>
              <p>
                Curious about a direction? Write your question
                to explore its traditional meaning.
              </p>
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about a direction..."
              />
              <button
                className="gold-button"
                onClick={() => {
                  if (question.trim()) {
                    alert("AI interpretation will be available in a future version.");
                  }
                }}
              >
                Explore Question →
              </button>
              <small className="coming-soon">
                AI ASSISTANT · COMING SOON
              </small>
            </div>
          </aside>
        </section>
      )}

      {activeTab === "bagua" && (
        <section className="content-panel">
          <span className="eyebrow">THE 24 MOUNTAINS</span>
          <h2>Explore the Compass Sectors</h2>
          <p>
            The traditional Luopan divides the compass into
            24 directional mountains, each spanning 15 degrees.
          </p>
          <div className="mountain-grid">
            {mountains.map((mountain, index) => (
              <div className="mountain-card" key={mountain}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{mountain}</strong>
                <small>{index * 15}° – {(index * 15 + 15) % 360}°</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "about" && (
        <section className="content-panel about-panel">
          <span className="eyebrow">ABOUT THE TRADITION</span>
          <h2>The wisdom of the Luopan</h2>
          <p>
            The Luopan is a traditional Chinese Feng Shui compass.
            Its concentric rings contain directional information
            used in classical schools of Feng Shui.
          </p>
          <p>
            Luopan Nusantara is a digital learning and exploration
            interface inspired by this rich tradition.
          </p>
          <div className="about-symbol">☯</div>
        </section>
      )}

      <footer>
        <span>LUOPAN NUSANTARA</span>
        <span>AN EXPLORATION OF TRADITIONAL FENG SHUI</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

export default App;
