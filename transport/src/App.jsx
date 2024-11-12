import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login.jsx';
import GetAllUsers from './Components/GetAllUsers';
import UserDetail from './Components/UserDetail';
import UpdateUser from './Components/UpdateUser';
import Users from './Components/Users.jsx';
import Trajet from './Components/Trajet.jsx'
import LogoutButton from './Components/Logout.jsx';
import CommentForm from './Components/CommentForm.jsx';
import CommentList from './Components/CommentList.jsx';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUserPlus, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from './Components/Accueil.jsx';
import { TokenProvider, TokenContext } from './TokenContext';
import TrajetEnCour from './Components/TrajetEnCour.jsx';


function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <div>
          {/* Navigation avec des boutons */}
          <header>
            <nav>
              <Logo />
              <TokenContext.Consumer>
                {({ token }) => (
                  <ul>
                    {!token || token === 'NO token' ? (
                      <>
                        <li>
                          <Link to="/login">
                            <FontAwesomeIcon icon={faRightToBracket} />
                          </Link>
                        </li>
                        <li>
                          <Link to="/register">
                            <FontAwesomeIcon icon={faUserPlus} />
                          </Link>
                        </li>
                      </>
                    ) : null}
                    <li>
                      <Link to="/getAllUsers">
                        <FontAwesomeIcon icon={faUsers} />
                      </Link>
                    </li>
                    {token && token !== 'NO token' ? (
                      <>
                        <li>
                          <LogoutButton />
                        </li>
                        <li>
                          <Link to="/trajet">
                            Commander Trajet
                          </Link>
                        </li>
                        {/*<li>
                          <Link to="/allComments">
                            Commentaires
                          </Link>
                        </li>
                         <li>
                          <Link to="/commentForm">
                            Commentaire
                          </Link>
                        </li> */}
                      </>
                    ) : null}
                  </ul>
                )}
              </TokenContext.Consumer>
            </nav>
          </header>

          {/* Afficher le token de connexion */}
          {/* <TokenContext.Consumer>
            {({ token }) => (
              <div className="token-display">
                <p>Token de connexion: {token}</p>
              </div>
            )}
          </TokenContext.Consumer> */}

          {/* Routes définies */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getAllUsers" element={<GetAllUsers />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/users/:id/edit" element={<UpdateUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/trajet" element={<Trajet />} />
            <Route path='/commentForm' element={<CommentForm />} />
            <Route path='/allComments' element={<CommentList />} />
            <Route path="/trajet-en-cour" element={<TrajetEnCour />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
