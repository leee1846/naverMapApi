import { useEffect, useState } from "react";
import pinImage from "./pin.png";

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

      const currentMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map,
        icon: {
          url: pinImage,
          size: new naver.maps.Size(50, 52),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(25, 26),
        },
      });

      // 주변 마커 나타내기
      const otherLatLngs = [
        { lat: 37.6859, lng: 126.597865 },
        { lat: 37.68528, lng: 126.597227 },
        { lat: 37.685535, lng: 126.599528 },
        { lat: 37.684234, lng: 126.599292 },
      ];
      for (let i = 0; i < otherLatLngs.length; i++) {
        const otherMarkers = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            otherLatLngs[i].lat,
            otherLatLngs[i].lng
          ),
          map,
        });
      }
    }
  }, [myLocation]);

  return <div id='map' style={{ width: "100%", height: "500px" }} />;
}

export default App;
