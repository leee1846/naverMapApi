declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window;

function App() {
  const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
  };

  const map = new naver.maps.Map("map", mapOptions);
  return <div id='map' style={{ width: "100%", height: "500px" }} />;
}

export default App;
