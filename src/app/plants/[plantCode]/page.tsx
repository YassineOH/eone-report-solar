interface Params {
  params: {
    plantCode: string;
  };
}

function PlantDetails({ params }: Params) {
  return <div>{params.plantCode}</div>;
}
export default PlantDetails;
