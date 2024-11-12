import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { TokenContext } from '../TokenContext';

const useLogout = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);

  const logout = () => {
    // Supprimez le token de l'utilisateur ou les informations de session
    localStorage.removeItem('authToken'); // Suppression du token
    setToken('NO token');

    // Redirigez l'utilisateur vers la page de connexion
    navigate('/login');
  };

  return logout;
};

const LogoutButton = () => {
  const logout = useLogout();

  return (
    <button onClick={logout}>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );
};

export default LogoutButton;
