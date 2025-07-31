import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/'); // redirect to home
    } else {
      navigate('/login');
    }
  }, []);

  return <p>Logging in...</p>;
};

export default AuthSuccess;