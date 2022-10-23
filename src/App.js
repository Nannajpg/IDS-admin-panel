import {useState} from 'react'
import LoginForm from './components/LoginForm.jsx'
import AddForm from './components/AddForm.jsx'
function App() {

  const adminUser = {
    name:"Luis",
    lastname:"Vasquez",
    email: "luisvasquez@gmail.com",
    password:"12345",
    favouriteteam: "Argentina",
  }

  const [user, setUser] = useState({name:"", lastname:"", email:"", favouriteteam:""});
  const [error, setError] = useState("");

  const Login = details =>{
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password){
      console.log("Sesion Iniciada!")
      setUser({
        name:details.name,
        lastname:details.lastname,
        email:details.email,
        favouriteteam:details.favouriteteam,
      })
    } else {
      console.log("Se ha equivocado de email o contraseña")
      setError("Se ha equivocado de email o contraseña")
    }

  }

  const Logout = () => { 
    setUser({name:"", lastname:"", email:"", favouriteteam:""});
  }

  const Add = () => {
    //
  }


  return (


    <div className="App">
        {(user.email != "") ? (
          <div className='welcome'>
              <h2>Bienvenido, <span>{user.name}</span></h2>
              <h3>Elija una opción:</h3>
              <button onClick={Add}>Agregar Usuario</button>
                
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
