import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import UserInfoBox from "./UserInfoBox";

function Map({ userData, center, zoom }) {
  const [userInfo, setLocationInfo] = useState(null);

  const markers = userData.map((user) => {
    return (
      <LocationMarker
        key={user._id}
        lat={user.latitude}
        lng={user.longitude}
        onClick={() => {
          setLocationInfo({
            id: user._id,
            age: user.age,
            temperature: user.temperature,
            location: user.location,
            symptoms: user.symptoms,
          });
        }}
      />
    );
  });

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAkfXrRbcQy25Ij2c1wK4GXsgZzQ8-M3c4" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {userInfo && <UserInfoBox key={userInfo._id} info={userInfo} />}
    </div>
  );
}

Map.defaultProps = {
  center: {
    lat: 30,
    lng: 31,
  },
  zoom: 3,
};

export default Map;
