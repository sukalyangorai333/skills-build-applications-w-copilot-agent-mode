import { useEffect, useState } from 'react';
import { getApiUrlForResource, normalizeCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrlForResource('activities'));

        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-light">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {activities.length === 0 ? (
          <p className="text-muted">No activities available right now.</p>
        ) : (
          <div className="row g-3">
            {activities.map((activity, index) => (
              <div className="col-md-6" key={activity.id || activity._id || `${activity.type}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">{activity.type || 'Activity'}</h3>
                  <p className="mb-1"><strong>Duration:</strong> {activity.duration || 0} min</p>
                  <p className="mb-1"><strong>Distance:</strong> {activity.distance ?? 0} km</p>
                  <p className="mb-0"><strong>Calories:</strong> {activity.calories ?? 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
