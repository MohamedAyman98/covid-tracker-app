import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../features/logs/logSlice";
import axios from "axios";

function LogForm() {
  const [age, setAge] = useState("");
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { isError, message } = useSelector((state) => state.logs);

  const dispatch = useDispatch();

  // Automatically detect Location from browser
  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setLocation(data.country_name);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isError, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createLog({ age, temperature, location, latitude, longitude, symptoms })
    );
  };

  return (
    <>
      <h4>Enter data:</h4>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Temperature</label>
            <input
              type="text"
              className="form-control"
              name="temp"
              id="temp"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Location (Autodetect)</label>
            <input
              type="text"
              className="form-control"
              name="loc"
              id="loc"
              value={location}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Symptoms</label>
            <input
              type="text"
              className="form-control"
              name="symptoms"
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Log data
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default LogForm;
