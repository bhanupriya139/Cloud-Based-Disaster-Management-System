import './HomePage.css'

function HomePage({ onNavigate }) {
  return (
    <main className="home-page">
      <header className="page-header">
        <div className="brand">
          <span className="brand-badge">DMS</span>
          <div>
            <h1>Disaster Management System</h1>
            <p>Fast coordination for NGOs, volunteers, and emergency response teams.</p>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" onClick={() => onNavigate('admin-login')}>Admin Login</button>
          <button type="button" onClick={() => onNavigate('login')}>NGO Login</button>
          <button type="button" className="secondary" onClick={() => onNavigate('register')}>NGO Sign Up</button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Emergency response made clearer</p>
          <h2>Activate disaster support in one tap.</h2>
          <p>
            Use the emergency alert button for immediate response. NGOs can sign in, register, and track relief requests from the same dashboard.
          </p>
          <div className="hero-buttons">
            <button type="button" className="emergency-button" onClick={() => onNavigate('dashboard')}>
              Emergency Alert
            </button>
            <button type="button" className="secondary" onClick={() => onNavigate('register')}>
              Register Your NGO
            </button>
          </div>
        </div>
        <div className="hero-card">
          <h3>Ready for any disaster</h3>
          <p>
            Quickly connect shelters, volunteers, and relief teams. Keep your community safer with structured support, alerts, and NGO coordination.
          </p>
          <ul>
            <li>Emergency alerts</li>
            <li>NGO access and onboarding</li>
            <li>Real-time status updates</li>
          </ul>
        </div>
      </section>

      <section className="features-grid">
        <article>
          <h3>Emergency Button</h3>
          <p>Notify response teams instantly when urgent help is needed.</p>
        </article>
        <article>
          <h3>NGO Login</h3>
          <p>Secure access for non-profit organizations to manage relief operations.</p>
        </article>
        <article>
          <h3>NGO Registration</h3>
          <p>Sign up to receive deployment requests, coordinate supplies, and support survivors.</p>
        </article>
      </section>
    </main>
  )
}

export default HomePage;
