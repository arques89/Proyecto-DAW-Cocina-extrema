import { useContext, useState, useEffect } from "react";
import { RenderInputDatosPersonales } from "../../components/input";
import { Context } from "../../store/appContext";
import { ValidatePassword } from "../../components/validate_password";
import { GoEye, GoEyeClosed } from "react-icons/go";
import toast from "react-hot-toast";

export const DatosPersonales = () => {
  const { actions } = useContext(Context);
  const [change, setChange] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await actions.getPersonalData();
    };
    fetchData();
  }, []);

  const handleChangePasswordToggle = () => {
    setChange(!change);
  };

  const handleSubmit = async (data) => {
    const { email, name, surname, phone } = data;
    try {
      await actions.updatePersonalDetails(email, name, surname, phone);
      console.log("Detalles personales actualizados exitosamente");
    } catch (error) {
      console.error("Error al actualizar detalles personales:", error);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordValid) {
      toast.error("La contraseña introducida no es segura");
      return;
    }
    try {
      await actions.updatePassword(password);
      toast.success("Contraseña actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      toast.error("Error al actualizar la contraseña");
    }
  };

  return (
    <div>
      <div className="text-xl me-20">
        <h3 className="pb-3 text-shape_border_button">DATOS PERSONALES</h3>
        <hr />
      </div>
      <div className="flex">
        <div className="w-2/4 pe-4">
          <RenderInputDatosPersonales onSubmit={handleSubmit} />
          <div className="flex justify-end mt-3">
            <button
              name="changePassword"
              onClick={handleChangePasswordToggle}
              className="justify-end text-shape_red"
            >
              Cambiar
            </button>
          </div>
          {change && (
            <form onSubmit={handlePasswordSubmit} className="mt-4">
              <div>
                <label
                  htmlFor="new-password"
                  className="text-lg text-shape_border_button mt-2"
                >
                  Nueva Contraseña
                </label>
                <div className="mt-3 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nueva Contraseña"
                    className="block bg-shape_input w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? <GoEye /> : <GoEyeClosed />}
                  </button>
                </div>
              </div>
              <ValidatePassword password={password} setValidationStatus={setIsPasswordValid} />
              <button
                type="submit"
                className="hover:bg-shape_red w-full text-lg text-white rounded-full bg-shape_border_button mb-4 mt-10"
              >
                ACTUALIZAR CONTRASEÑA
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
