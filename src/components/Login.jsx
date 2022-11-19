import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import logo from './offsidelogo.png';
import { Link } from 'react-router-dom'

function Login() {

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault(user, password);

      setUser("");
      setPassword("");
      setSuccess(true);
      navigate("/menu")
  }

  return (
    <>
      {success ? (
        <div className="flex items-center h-screen">
          <section className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
          <h1 className="text-center text-lg font-bold">¡Bienvenido!</h1>
          <br/>
          <Link to="/show-users" className="bg-emerald-600 px-2 py-1 rounded-md mx-2 my-2 ">Gestionar Usuarios</Link>
          <Link to="/show-events" className="bg-emerald-600 px-2 py-1 rounded-md">Gestionar Eventos</Link>
          <br/>
          <br/>
          <a href="" className="bg-red-700 px-2 py-1 rounded-md mx-2">Regresar</a>
          </section>
        </div>
        
      ) : (
        <div className="flex items-center h-screen">
          <section className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
          <p
            ref={errRef}
            className={errorMessage ? "errorMessage" : "offscreen"}
            aria-live="assertive"
          >
            {errorMessage}
          </p>
          <img src={logo} alt="" className="h-32 float-right" />
          <h1 className="py-3 text-2xl">Inicio de Sesión</h1>

          <form>
            <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />

            <label htmlFor="password" className="block text-sm font-bold mb-2">Contraseña:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full p-2 rounded-md bg-zinc-600 mb-2"
            />
            <button onClick={handleSubmit} className='bg-teal-600 px-2 py-1 rounded-md text-sm'>Ingresar</button>
          </form>
        </section>
        </div>
      )}
    </>
  );
}

export default Login;
