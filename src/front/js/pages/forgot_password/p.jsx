import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { InputForgotPassword } from "./mocks";
import { Context } from "../../store/appContext";

export const ForgotPassword = () => { // Cambia el nombre de la función a ForgotPassword
  const { actions, store } = useContext(Context);

  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    actions.forgotPassword(email);
  };

  const renderInputForgotPassword = () => {
    return InputForgotPassword.map((item) => (
      <div key={item.id}>
        <label htmlFor={item.htmlFor}>{item.label}</label>
        <br />
        <input
          type={item.type}
          name={item.name}
          placeholder={item.placeholder}
          required
          onChange={handleInputChange}
        />
        <br />
      </div>
    ));
  };

  return (
    <>
      {store.token === null && store.is_active === false ? (
        <div className="login-container">
          <div className="video-login">
            <video className="video" loop autoPlay muted>
              <source
                src="https://res.cloudinary.com/dztgp8g6w/video/upload/v1714975087/6822612-hd_1080_2048_25fps_dp32fa.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="login-form">
            <div className="content mt-5">
              <h2>Olvide contraseña</h2>
              <div className="login">
                <form onSubmit={handleSubmit}>
                  {renderInputForgotPassword()}
                  <br />
                  <button type="submit">Enviar correo</button>
                </form>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
};

