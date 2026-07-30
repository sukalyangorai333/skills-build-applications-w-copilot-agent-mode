import { useEffect, useState } from 'react';
import { getApiUrlForResource, normalizeCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(getApiUrlForResource('users'));

        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        if (isMounted) {
          setUsers(normalizeCollection(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-light">Loading users...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {users.length === 0 ? (
          <p className="text-muted">No users available yet.</p>
        ) : (
          <div className="row g-3">
            {users.map((user, index) => (
              <div className="col-md-6" key={user.id || user._id || `${user.name}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-bold">{user.name || 'Unnamed user'}</h3>
                  <p className="mb-1"><strong>Email:</strong> {user.email || '—'}</p>
                  <p className="mb-0"><strong>Fitness level:</strong> {user.fitnessLevel || '—'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
