import { FaMale, FaFemale } from "react-icons/fa";
import { Accordion, Card, Badge } from "react-bootstrap";

interface CatListProps {
  gender: string;
  catDetails: {
    catName: string;
    ownerName: string;
    ownerAge: number;
    otherPets: { name: string; type: string }[];
  }[];
}
const getPetEmoji = (type: string) => {
  switch (type.toLowerCase()) {
    case "dog":
      return "🐶";
    case "cat":
      return "😻";
    case "fish":
      return "🐠";
    default:
      return "🐾";
  }
};

const CatList = ({ gender, catDetails }: CatListProps) => (
  <div className="CatList">
    <div className="owner-card">
      <h2 className={gender === "male" ? "male-header" : "female-header"}>
        {gender === "male" ? <FaMale /> : <FaFemale />}
        {gender === "male" ? "Male" : " Female"}
      </h2>
      {catDetails.map((catDetail, index) => (
        <div key={index}>
          <Accordion className="accordion">
            <Card className="accordion-card">
              <Accordion.Item className="accordion-item" eventKey={` ${index}`}>
                <Accordion.Header className="accordion-header">
                  {catDetail.catName}
                </Accordion.Header>
                <Accordion.Body className="accordion-body">
                  <Card.Body>
                    <div className="owner-info">
                      <div className="owner-details">
                        <p>Owner: {catDetail.ownerName}</p>
                        <p>
                          Owner's Age: <Badge pill>{catDetail.ownerAge}</Badge>
                        </p>
                      </div>
                    </div>
                    {catDetail.otherPets && catDetail.otherPets.length > 0 && (
                      <>
                        <p>Other Pets:</p>
                        <ul className="owner-pets">
                          {catDetail.otherPets.map((otherPet, i) => (
                            <li key={i}>
                              {getPetEmoji(otherPet.type)}
                              {otherPet.name} ({otherPet.type})
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Card.Body>
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          </Accordion>
        </div>
      ))}
    </div>
  </div>
);

export default CatList;
