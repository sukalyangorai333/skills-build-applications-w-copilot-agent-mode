import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness tracking app for teams, workouts, and leaderboards.
              </p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">React 19 + Vite frontend</li>
                <li className="list-group-item">Express + TypeScript backend</li>
                <li className="list-group-item">MongoDB with Mongoose data access</li>
              </ul>
              <a className="btn btn-primary" href="/">
                Explore the app
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
