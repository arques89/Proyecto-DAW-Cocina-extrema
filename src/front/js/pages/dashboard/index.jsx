import Avatar from "react-avatar";
import "./index.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../store/appContext"; // Importa el contexto

export const Dashboard = () => {
  const { store } = useContext(Context); // Obtén las acciones y el estado del contexto
  return (
    <>
      {store.token === null ? (
        <Navigate to="/login" />
      ) : (
        <div className="container-fluid d-flex flex-column bg-white p-0">
          <div className="row m-0">
            <div
              id="dashboard"
              className="col-2 vh-100 p-5 d-flex align-item-center justify-content-center text-center"
            >
              <div className="">
                <Avatar
                  name="Javier Arques"
                  color="#000000"
                  fgColor="#FFFFFF"
                  round={true}
                  size="70px"
                />
                <h4>Inicio</h4>
                <h4>Perfil</h4>
                <h4>Configuracion</h4>
                <h4>Perfil</h4>
              </div>
            </div>
            <div id="dashboa" className="col-10 vh-100">
              Columna 2
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// <div>
//   <div className="container mt-5">
//     <div className="row">
//       <div className="col-md-6 offset-md-3">
//         {/* Post */}
//         <div className="card mb-3">
//           <img src="https://via.placeholder.com/600x400" className="card-img-top" alt="..." />
//           <div className="card-body">
//             <h5 className="card-title">Post Title</h5>
//             <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis consequat neque.</p>
//             <div className="d-flex justify-content-between align-items-center">
//               <div>
//                 <button type="button" className="btn btn-outline-primary"><i className="fas fa-thumbs-up"></i> Like</button>
//                 <button type="button" className="btn btn-outline-danger"><i className="fas fa-thumbs-down"></i> Dislike</button>
//                 <button type="button" className="btn btn-outline-warning"><i className="far fa-star"></i> Favorite</button>
//               </div>
//               <small className="text-muted">Posted 3 mins ago</small>
//             </div>
//           </div>
//           {/* Comments */}
//           <ul className="list-group list-group-flush">
//             <li className="list-group-item">
//               <strong>User1:</strong> Nice photo!
//             </li>
//             <li className="list-group-item">
//               <strong>User2:</strong> Cool!
//             </li>
//             {/* Add more comments here */}
//           </ul>
//           {/* Add comment form */}
//           <div className="card-body">
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="comment" className="form-label">Add a comment:</label>
//                 <textarea className="form-control" id="comment" rows="2"></textarea>
//               </div>
//               <button type="submit" className="btn btn-primary">Post</button>
//             </form>
//           </div>
//         </div>
//         {/* End of Post */}
//       </div>
//     </div>
//   </div>
// </div>
