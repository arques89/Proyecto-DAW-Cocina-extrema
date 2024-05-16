// import config from "../../../config";
// import { inputUpFile } from "./mocks";

// export const upFile = () => {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     var headers = {};
//     try {
//       const response = await fetch(`${config.hostname}/crear_chef`, {
//         method: "POST",
//         body: formData,
//         mode: "cors",
//         headers: headers,
//       });

//       if (!response.ok) {
//         throw new Error("Error al enviar el formulario");
//       }

//       console.log("Formulario enviado correctamente");
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const renderUpFile = () => {
//     return inputUpFile.map((item) => (
//       <li key={item.id}>
//         <label htmlFor={item.htmlFor}>{item.label}</label>
//         <br />
//         <input
//           type={item.type}
//           name={item.name}
//           placeholder={item.placeholder}
//           required
//         />
//         <br />
//       </li>
//     ));
//   };

//   return (
//     <div className="container" id="upFile-container">
//       <div className="content mt-5">
//         <div className="upFile">
//           <h2>Login</h2>
//           <form
//             action={`${config.hostname}/crear_chef`}
//             method="post"
//             encType="multipart/form-data"
//             onSubmit={handleSubmit}
//           >
//             <ul>
//               {renderUpFile()}
//               <li>
//                 <label htmlFor="descripcion">Descripción:</label>
//                 <br />
//                 <textarea name="descripcion"></textarea>
//               </li>
//               <li>
//                 <button type="submit">Guardar</button>
//               </li>
//             </ul>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
