import React from 'react'
import {useState} from 'react'
import logo from './offsidelogo.png';

const AddForm = ({Login, error}) =>{
    
    const [details, setDetails] = useState({email:"", password:""})

    const submitHandler = (e) =>{
        e.preventDefault();

        Login(details);
    }

    return(
        <form onSubmit={submitHandler}>
            <div className='form-inner'>
                <img src={logo} className="logo-login"></img>
                <h2>Agregar Usuario</h2>

                {(error != "") ? (<div className='error'>{error}</div>) : ""}

                <div className='form-group'>
                    <label htmlFor='text'>Nombre:</label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Apellido:</label>
                    <input type="text" name="lastname" id="lastname" onChange={e => setDetails({...details, lastname: e.target.value})} value={details.lastname} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Contraseña</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                </div>
                <div className='form-group'>
                    <label htmlFor='text'>Equipo Favorito:</label>
                    <input type="text" name="favouriteteam" id="favouriteteam" onChange={e => setDetails({...details, favourite: e.target.value})} value={details.favouriteteam}/>
                </div>


                <input type="submit" value="Guardar"></input>
                
            </div>
        </form>
    )
}
export default AddForm;