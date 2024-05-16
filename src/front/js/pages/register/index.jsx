// import Avatar from 'react-nice-avatar';
// import Avatar from 'react-avatar';
import { Toaster } from 'react-hot-toast';
import { inputRegister } from './mocks'; 
import { useContext, useState } from 'react';
import { Context } from '../../store/appContext';

export const Register = () => {
  const { store , actions } = useContext(Context); // Obtén las acciones y el estado del contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [avatarConfig, setAvatarConfig] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si el formulario es válido antes de enviar la solicitud
    if (!event.target.checkValidity()) {
      console.error("El formulario es inválido");
      return;
    }
    
    // Verificar si los campos están vacíos
    if (!name || !surname || !email || !password) {
      console.error("Por favor, completa todos los campos");
      return;
    }
    
    // Llamar a la acción register con los datos del formulario
    const avatarConfig = await actions.register(email, password, name, surname);
    if (avatarConfig) {
      setAvatarConfig(avatarConfig);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "name") setName(value);
    if (name === "surname") setSurname(value);
  };

  const renderInputRegister = () => {
    return inputRegister.map(item => (
      <div key={item.id}>
        <label htmlFor={item.htmlFor}>{item.label}</label><br />
        <input 
          type={item.type} 
          name={item.name} 
          placeholder={item.placeholder} 
          value={item.name === "email" ? email : item.name === "password" ? password : item.name === "name" ? name : surname}
          onChange={handleChange}
          required 
        />
        <br />
      </div>
    ))
  }

  return (
    <div className="register-container">
      <div className="video-login">
        <video className="video" loop autoPlay muted>
          <source
            src="https://res.cloudinary.com/dztgp8g6w/video/upload/v1714975087/6822612-hd_1080_2048_25fps_dp32fa.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="register-form">
        <div className='icono-avatar'>
          <div className='av'>
            {/* <Avatar style={{ width: '8rem', height: '8rem' }} {...avatarConfig} /> */}
            <Avatar name={name + ' ' + surname} color="#FFFFFF" fgColor="#000000" round={true} size="70px"/>
          </div>
          <div className='ed'>
            <h5>Nombre:  {name + ' ' + surname}</h5>
            <br />
            <h5>Correo:{email}</h5>
          </div>
        </div>
        <div className="bloqu-register mt-5">
          <h2>Registro</h2>
          <div className="register">
            <form onSubmit={handleSubmit}>
              {renderInputRegister()}
              <br />
              <button type="submit">Registrarse</button>
            </form>
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              // Define default options
              duration: 10000,
            }}
          />
        </div>
      </div>
    </div>
  );
};
