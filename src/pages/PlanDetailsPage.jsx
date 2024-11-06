import { useNavigate, useParams } from "react-router-dom";
import AccommodationList from "../components/Accommodation/AccommodationList";
import ActivitiesList from "../components/Activities/ActivitiesList";
import PackingList from "../components/PackingList/PackingList";
import CreateActivity from "../components/Activities/CreateActivity";
import CreatePackingItem from "../components/PackingList/CreatePackingItem";
import CreateAccommodation from "../components/Accommodation/CreateAccommodation";
import "./planDetailsPage.css";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../assets/API_URL";
import Weather from "../components/Weather";
export default function PlanDetailsPage({ plans }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [isAddPackingItemOpen, setIsAddPackingItemOpen] = useState(false);

  const openAccommodationForm = () => setIsAddItemOpen(true);
  const closeAccommodationForm = () => setIsAddItemOpen(false);

  const openActivitiesForm = () => setIsAddActivityOpen(true);
  const closeActivitesForm = () => setIsAddActivityOpen(false);

  const openPackingForm = () => setIsAddPackingItemOpen(true);
  const closePackingForm = () => setIsAddPackingItemOpen(false);

  const [accomodationList, setAccomodationList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [packingList, setPackingList] = useState([]);
  let plan = "";

  let imgToDisplay;
  plans.find((item) => {
    if (item.id === id) {
      imgToDisplay = item.image;
      plan = item;
    }
  });
  useEffect(() => {
    //this imporves code preformance
    const fetchData = async () => {
      await Promise.all([
        getAccommodation(),
        getActivities(),
        getPackingList(),
      ]);
      fetchData();
    };
  }, []);

  const getAccommodation = () => {
    axios
      .get(`${API_URL}/travelPlans/${id}/accommodation.json`)
      .then((response) => {
        if (response.data) {
          const array = Object.keys(response.data).map((id) => ({
            //convert the response from objects to an array
            id,
            ...response.data[id],
          }));
          const newarr = array.toReversed();
          //save list in state

          setAccomodationList(newarr);
        } else {
          setAccomodationList([]);
        }
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
        `${API_URL}travelPlans/${id}/accommodation/${updatedAccommodation.id}.json`,
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
      })
      .catch((e) => console.log("Couldnt Delete", e));
  };

  const getActivities = () => {
    axios
      .get(`${API_URL}/travelPlans/${id}/activities.json`)
      .then((response) => {
        if (response.data) {
          const array = Object.keys(response.data).map((id) => ({
            //convert the response from objects to an array
            id,
            ...response.data[id],
          }));
          const newarr = array.toReversed();
          //save list in state

          setActivitiesList(newarr);
        } else {
          setActivitiesList([]);
        }
      })
      .catch((e) =>
        console.log("Error fetching Activity List from Firebase", e)
      );
  };
  const addActivity = (newActivity) => {
    axios
      .post(`${API_URL}travelPlans/${id}/activities.json`, newActivity)
      .then((response) => {
        getActivities();
      })
      .catch((e) => console.log("couldnt add activity", e));
  };
  const deleteActivity = (activityId) => {
    axios
      .delete(`${API_URL}travelPlans/${id}/activities/${activityId}.json`)
      .then((response) => {
        getActivities();
      })
      .catch((e) => console.log("Couldnt Delete activity", e));
  };
  const updateActivity = (updateActivity) => {
    axios
      .put(
        `${API_URL}travelPlans/${id}/activities/${updateActivity.id}.json`, ///might be issue
        updateActivity
      )
      .then((response) => {
        getActivities();
        console.log("updated activity");
      })
      .catch((e) => console.log("couldnt update activity", e));
  };

  const getPackingList = () => {
    axios
      .get(`${API_URL}/travelPlans/${id}/packing.json`)
      .then((response) => {
        if (response.data) {
          const array = Object.keys(response.data).map((id) => ({
            //convert the response from objects to an array
            id,
            ...response.data[id],
          }));
          const newarr = array.toReversed();
          //save list in state

          setPackingList(newarr);
        } else {
          setPackingList([]);
        }
      })
      .catch((e) =>
        console.log("Error fetching packing List from Firebase", e)
      );
  };
  const addPackingItem = (newItem) => {
    axios
      .post(`${API_URL}travelPlans/${id}/packing.json`, newItem)
      .then((response) => {
        getPackingList();
      })
      .catch((e) => console.log("couldnt add Packing Item", e));
  };
  const deletePackingItem = (itemId) => {
    axios
      .delete(`${API_URL}travelPlans/${id}/packing/${itemId}.json`)
      .then((response) => {
        getPackingList();
      })
      .catch((e) => console.log("Couldnt Delete packing item", e));
  };

  return (
    <>
      <div
        className="Header"
        style={{
          backgroundImage: `url(${imgToDisplay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "25vh",
          position: "relative",
          marginBottom: "2em",
        }}
      >
        <Weather className="weather" city={plan.destination} />
        <Button
          className="back-button"
          variant="white"
          color="black"
          size="md"
          radius="md"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to all trips
        </Button>
      </div>

      <div className="plan-details-page">
        <div className="details">
          <h1> {plan.title}</h1>
          <p>
            Start Date: ({plan.startDate}) - End Date: ({plan.endDate})
          </p>
        </div>

        <div className="lists">
          {/* PACKING LIST  */}
          <section className="box">
            <div className="list-top">
              <h4>🧳 Packing List</h4>
              <Button
                onClick={openPackingForm}
                variant="filled"
                color="grey"
                size="sm"
                radius="md"
              >
                +
              </Button>
            </div>

            {isAddPackingItemOpen && (
              <div className="form-overlay" onClick={closePackingForm}>
                <div className="form-box" onClick={(e) => e.stopPropagation()}>
                  <CreatePackingItem
                    callBackToCloseForm={closePackingForm}
                    callBackToAddToPackingItem={addPackingItem}
                  />
                </div>
              </div>
            )}
            <PackingList
              packingList={packingList}
              callBackToDelete={deletePackingItem}
            />
          </section>

          {/* ACCOMMODATION  */}

          <section className="box">
            <div className="list-top">
              <h4>🏡 Accommodation</h4>
              <Button
                onClick={openAccommodationForm}
                variant="filled"
                color="grey"
                size="sm"
                radius="md"
              >
                +
              </Button>
            </div>

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
            />
          </section>

          {/* ACTIVITIES  */}

          <section className="box">
            <div className="list-top">
              <h4>🏃 Activities</h4>
              <Button
                onClick={openActivitiesForm}
                variant="filled"
                color="grey"
                size="sm"
                radius="md"
              >
                +
              </Button>
            </div>

            {isAddActivityOpen && (
              <div className="form-overlay" onClick={closeActivitesForm}>
                <div className="form-box" onClick={(e) => e.stopPropagation()}>
                  <CreateActivity
                    callBackToCloseForm={closeActivitesForm}
                    callBackToAddActivity={addActivity}
                  />
                </div>
              </div>
            )}

            <ActivitiesList
              callBackToDelete={deleteActivity}
              activitiesList={activitiesList}
              callBackToUpdate={updateActivity}
            />
          </section>
        </div>
      </div>
    </>
  );
}
