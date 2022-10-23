function UserInfoBox({ info }) {
  const box = {
    position: "absolute",
    top: "5px",
    right: "50px",
    width: "400px",
    minHeight: "200px",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "10px",
    fontSize: "18px",
    color: "white",
  };

  return (
    <div style={box}>
      <h4>User Info</h4>
      <ul style={{ padding: 0, listStyleType: "none" }}>
        <li>
          Age:<strong>{info.age}</strong>
        </li>
        <li>
          Temperature:<strong>{info.temperature}</strong>
        </li>
        <li>
          Location:<strong>{info.location}</strong>
        </li>
        <li>
          Symptoms:<strong>{info.symptoms}</strong>
        </li>
      </ul>
    </div>
  );
}

export default UserInfoBox;
