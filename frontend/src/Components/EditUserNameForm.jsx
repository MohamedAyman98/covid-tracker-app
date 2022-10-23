import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateName } from "../features/auth/authSlice";

function EditUserNameForm() {
  const location = useLocation();
  const userName = location.state.name;

  const [name, setName] = useState(userName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateName(name));

    navigate("/");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Save
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditUserNameForm;
