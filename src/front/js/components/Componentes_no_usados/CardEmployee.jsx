// const Card = () => {
//   return (
    <>
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="sm:flex sm:items-center px-6 py-4">
        <img
          className="block h-16 sm:h-24 mx-auto sm:mx-0 sm:mr-4 rounded-full sm:w-24"
          src="https://via.placeholder.com/150"
          alt="Avatar"
          />
        <div className="text-center sm:text-left mt-4 sm:mt-0">
          <p className="text-xl font-bold text-gray-800">John Doe</p>
          <p className="text-sm text-gray-600">Software Engineer</p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
   {/* ); */}
 {/* }; */}


{/* // const Card = () => { */}
    {/* //   return ( */}
        <div className="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
      <img className="w-full" src="https://via.placeholder.com/400x200" alt="Mountain" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Mountain</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis, quam in
          malesuada blandit, velit nunc tempus metus, at fringilla arcu metus nec turpis.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Saber Más
        </button>
      </div>
    </div>
</>
//   );
// };




import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { cardDetails } from "./mocks";

export function CardDefault () {
  const renderCardDetails = () => {
    return cardDetails.map((item) => (
      <div key={item.id}>
        <Card className="mt-6 bg-black w-full">
          <CardHeader className="relative h-96 rounded-none">
            <img src={item.image} alt="card-image" />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h5"
              className="my-4 text-md font-thin text-center text-white"
            >
              {item.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 text-center rounded-full ">
            <Button className="border border-white rounded-full w-40 py-1 font-thin bg-black">
              COMPRAR AHORA
            </Button>
          </CardFooter>
        </Card>
      </div>
    ));
  };

  return(<>{renderCardDetails()}</>
)
}
