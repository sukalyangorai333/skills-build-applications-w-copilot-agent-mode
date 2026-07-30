import { useEffect, useState } from 'react';
import { getApiUrlForResource, normalizeCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(getApiUrlForResource('teams'));

        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        if (isMounted) {
          setTeams(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-light">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {teams.length === 0 ? (
          <p className="text-muted">No teams available yet.</p>
        ) : (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div className="col-md-6" key={team.id || team._id || `${team.name}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">{team.name || 'Unnamed team'}</h3>
                  <p className="mb-1"><strong>Goal:</strong> {team.goal || '—'}</p>
                  <p className="mb-0"><strong>Members:</strong> {team.members?.length ? team.members.join(', ') : 'None yet'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
