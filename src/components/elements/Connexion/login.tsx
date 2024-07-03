import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";
import { login, updateEmail, updatePassword } from "../../../store/reducers/userReducer";
import './style.scss'

function Login() {
  console.log('composant login ok')

  const dispatch = useDispatch();
  const data = useAppSelector((state) => state.user.data);
  const initialEmail = data[0]?.email || "";
  const initialPassword = data[0]?.password || "";
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [errorValue, setError] = useState(null);

  const isLoading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(login({ email, password }));
      // Redirection vers la page d'accueil par exemple
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="Login">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Adresse mail :</label>
        <input className="email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            dispatch(updateEmail(event.target.value));
          }}
          required
        />
        <br />
        <label htmlFor="password">Mot de passe :</label>
        <input className="password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            dispatch(updatePassword(event.target.value));
          }}
          required
        />
        <br />
        {errorValue && <div style={{ color: 'red' }}>{errorValue}</div>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;