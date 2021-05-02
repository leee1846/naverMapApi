import { useEffect, useState } from "react";

const { naver } = window;

function App() {
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

  // get current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재위치를 알수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== "string") {
      const currentPosition = [myLocation.latitude, myLocation.longitude];

      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
      });
    }
  }, [myLocation]);

  return <div id='map' style={{ width: "100%", height: "500px" }} />;
}

export default App;
