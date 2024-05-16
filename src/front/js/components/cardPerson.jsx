// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Modal } from "../components/modal";

// export const CardPerson = ({ imageChef, chefName, chefDescription }) => {
//     const [showModal, setShowModal] = useState(false);

//     const handleOpenModal = () => {
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     CardPerson.propTypes = {
//         imageChef: PropTypes.string,
//         chefName: PropTypes.string,
//         chefDescription: PropTypes.string,
//     };

//     return (
//         <>
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 <div className="col">
//                     <div className="card h-100">
//                         <img src={imageChef} className="card-img-top" alt={chefName}></img>
//                         <div className="card-body">
//                             <h5 className="card-title">{chefName}</h5>
//                             <hr width="75%"/>
//                             <p className="card-text">{chefDescription}</p>
//                         </div>
//                         <div className='card-button'>
//                             <button className="btn btn-primary" onClick={handleOpenModal}>Saber más</button>
//                         </div>
//                         <div className="card-footer">
//                             <small className="text-body-secondary">Last updated 3 mins ago</small>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {showModal && <Modal onClose={handleCloseModal} chefName={"Martin Berasategui"} />}
//         </>
//     );
// };

