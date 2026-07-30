import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const data = await fetchCollection('workouts');
        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-light">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted">No workouts available right now.</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout, index) => (
              <div className="col-md-6" key={workout.id || workout._id || `${workout.name}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">{workout.name || 'Workout'}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {workout.duration || 0} min</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty || '—'}</p>
                  <p className="mb-0"><strong>Focus area:</strong> {workout.focusArea || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
