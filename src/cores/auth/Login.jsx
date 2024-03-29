import { Link, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import LogoOffside from "./assets/logo-offside-vertical.png";

function Login() {
  const state = useSelector((state) => state.auth);

  if (state.success) return <Navigate to="/dashboard" />;

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row-reverse items-center justify-evenly">
      <div className="h-1/6 lg:w-5/12 md:w-6/12 w-9/12 flex items-center justify-center">
        <img src={LogoOffside} alt="" className="lg:w-3/4" />
      </div>
      <div className="lg:w-7/12 md:w-6/12 md:h-full h-3/5 bg-white p-7 text-black flex justify-center items-center w-11/12">
        <div className="w-full h-3/4 flex flex-col items-center">
          <h1 className="text-4xl w-3/4 h-[15%] text-[#3D405B] font-bold">
            Panel Administrativo de Offside
          </h1>
          <h1 className="text-2xl w-3/4 h-[15%] text-[#3D405B] font-bold">
            Ingresa en tu cuenta
          </h1>
          <LoginForm />
          <div className="h-[10%] flex items-center justify-center gap-2 font-semibold text-lg">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;