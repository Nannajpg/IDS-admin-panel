import {useState} from 'react'
import LoginForm from './components/LoginForm.jsx'
function App() {

  const adminUser = {
    email: "prueba@gmail.com",
    password:"hola1234"
  }

  const [user, setUser] = useState({email:""});
  const [error, setError] = useState("")


  const Login = details =>{
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password){
      console.log("Sesion Iniciada!")
      setUser({
        email:details.email
      })
    } else {
      console.log("Se ha equivocado de email o contraseña")
      setError("Se ha equivocado de email o contraseña")
    }

  }

  const Logout = () =>{
    setUser({email:""});
  }

  return (


    <div className="App">
        {(user.email != "") ? (
          <div className='welcome'>
              <h2>Bienvenido, <span>{user.email}</span></h2>
              <button onClick={Logout}>Cerrar Sesión</button>
          </div>
        ) : (
          <LoginForm Login={Login} error ={error} />
        )
      }
    </div>
  );
}

export default App;
