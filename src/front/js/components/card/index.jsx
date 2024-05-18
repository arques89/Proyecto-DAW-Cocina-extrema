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
