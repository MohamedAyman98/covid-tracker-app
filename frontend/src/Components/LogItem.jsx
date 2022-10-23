import { useDispatch } from "react-redux";
import { deleteLog } from "../features/logs/logSlice";

function LogItem({ log }) {
  const dispatch = useDispatch();

  return (
    <div className="log">
      <div>{new Date(log.createdAt).toLocaleString("en-UK")}</div>

      <div>
        <label>Location: </label>
        <span>{log.location}</span>
      </div>

      <div>
        <label>Age: </label>
        <span>{log.age}</span>
      </div>

      <div>
        <label>Temperature: </label>
        <span>{log.temperature}</span>
      </div>

      <div>
        <label>Symptoms: </label>
        <span>{log.symptoms}</span>
      </div>

      <button className="close" onClick={() => dispatch(deleteLog(log._id))}>
        X
      </button>
    </div>
  );
}

export default LogItem;
