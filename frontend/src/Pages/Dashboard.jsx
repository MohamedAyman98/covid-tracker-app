import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogForm from "../Components/LogForm";
import Spinner from "../Components/Spinner";
import LogItem from "../Components/LogItem";
import { getLogs, getAllLogs } from "../features/logs/logSlice";
import Map from "../Components/Map";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { logs, isLoading, isError, message, allLogs } = useSelector(
    (state) => state.logs
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }

    dispatch(getLogs());
    dispatch(getAllLogs());

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <div className="welcome-msg">
          <h4>Welcome {user && user.name}</h4>
          <button
            id="editNameBtn"
            className="btn"
            onClick={() =>
              navigate("/editName", { state: { name: user.name } })
            }
          >
            Edit name
          </button>
        </div>

        <div className="dashboard-title">
          <p>
            COVID World distribution (click on icon to view specific user
            details)
          </p>
        </div>

        <Map userData={allLogs} />
      </section>

      <LogForm />

      <hr></hr>
      <h3>Your log history</h3>

      <section className="content">
        {logs.length > 0 ? (
          <div className="logs">
            {logs.map((log) => (
              <LogItem key={log._id} log={log} />
            ))}
          </div>
        ) : (
          <h3>You have not logged any data!</h3>
        )}
      </section>
    </>
  );
}
export default Dashboard;
