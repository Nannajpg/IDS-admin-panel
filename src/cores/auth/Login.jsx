import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import logo from "./assets/offsidelogo.png";
import useLoginForm from "./useLoginForm";

function Login() {

  const { handleChange, handleSubmit } = useLoginForm();

  const { success } = useSelector(state => state.auth);

  if (success) return <Navigate to='/dashboard' />;

  return (
    <>
      <section className="bg-zinc-800 max-2-sm p-4 mb-2 rounded-md">
        <img src={logo} alt="" className="h-32 float-right" />
        <h1 className="py-3 text-2xl">Inicio de Sesión</h1>
        <form>
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            /* autoComplete="off" */
            name="email"
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          />

          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
            className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          />
          <button
            onClick={handleSubmit}
            className="bg-teal-600 px-2 py-1 rounded-md text-sm"
          >
            Ingresar
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
