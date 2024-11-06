import { useParams } from "react-router-dom";
import AccommodationList from "../components/Accommodation/AccommodationList";
import ActivitiesList from "../components/Activities/ActivitiesList";
import PackingList from "../components/PackingList/PackingList";
import "./planDetailsPage.css";
import { Button, Card } from "@mantine/core";
import { useState, useEffect } from "react";
import CreateAccommodation from "../components/Accommodation/CreateAccommodation";
import axios from "axios";
import { API_URL } from "../assets/API_URL";

export default function PlanDetailsPage() {
  const { id } = useParams();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const openAccommodationForm = () => setIsAddItemOpen(true);
  const closeAccommodationForm = () => setIsAddItemOpen(false);
  const [accomodationList, setAccomodationList] = useState([]);
  useEffect(() => {
    getAccommodation();
  }, []);
  const getAccommodation = () => {
    axios
      .get(`${API_URL}/travelPlans/${id}/accommodation.json`)
      .then((response) => {
        const array = Object.keys(response.data).map((id) => ({
          //convert the response from objects to an array
          id,
          ...response.data[id],
        }));
        const newarr = array.toReversed();
        //save list in state

        setAccomodationList(newarr);
      })
      .catch((e) =>
        console.log("Error fetching accomodationList from Firebase", e)
      );
  };
  const addAccommodation = (newAccommodation) => {
    axios
      .post(`${API_URL}travelPlans/${id}/accommodation.json`, newAccommodation)
      .then((response) => {
        getAccommodation();
      })
      .catch((e) => console.log("couldnt add accommodation", e));
  };
  const updateAccommodation = (updatedAccommodation) => {
    axios
      .put(
        `${API_URL}travelPlans/${id}/accommodation/${updatedAccommodation}.json`,
        updatedAccommodation
      )
      .then((response) => {
        getAccommodation();
        console.log("updated Accommodation");
      })
      .catch((e) => console.log("couldnt update accommodation", e));
  };
  const deleteAccomodation = (accommodationId) => {
    axios
      .delete(
        `${API_URL}travelPlans/${id}/accommodation/${accommodationId}.json`
      )
      .then(() => {
        getAccommodation();
        console.log("deleted");
      });
  };
  return (
    <div className="planDetailsPage homepage">
      <Card>
        <h3>Accommodation</h3>
        <Button
          onClick={openAccommodationForm}
          variant="filled"
          color="yellow"
          size="sm"
          radius="md"
        >
          Add Accommodation
        </Button>
        {isAddItemOpen && (
          <div className="form-overlay" onClick={closeAccommodationForm}>
            <div className="form-box" onClick={(e) => e.stopPropagation()}>
              <CreateAccommodation
                callBackToCloseForm={closeAccommodationForm}
                callBackToAddAccommodation={addAccommodation}
                planId={id}
              />
            </div>
          </div>
        )}
        <AccommodationList
          callBackToDelete={deleteAccomodation}
          accomodationList={accomodationList}
          callBackToUpdate={updateAccommodation}
          planId={id}
        />
      </Card>

      <Card>
        <h3>Activites</h3>

        <ActivitiesList planId={id} />
      </Card>
      <Card>
        <h3>Packing</h3>
        <PackingList planId={id} />
      </Card>
    </div>
  );
}
