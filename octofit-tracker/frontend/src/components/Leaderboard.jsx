import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const data = await fetchCollection('leaderboard');
        if (isMounted) {
          setEntries(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-light">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {entries.length === 0 ? (
          <p className="text-muted">No leaderboard entries available yet.</p>
        ) : (
          <div className="row g-3">
            {entries.map((entry, index) => (
              <div className="col-md-6" key={entry.id || entry._id || `${entry.name}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">#{entry.rank || index + 1} {entry.name || 'Anonymous'}</h3>
                  <p className="mb-0"><strong>Score:</strong> {entry.score || 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
