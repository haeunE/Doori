import { useEffect } from "react";
import "./css/Introduce.css"; // CSS 파일 import

const { kakao } = window;

function Introduce() {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.5382343, 127.1272417),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(37.5382343, 127.1272417);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    const iwContent = '<h style="margin: 20px;">Doori독립영화관<h>';
    const iwPosition = new kakao.maps.LatLng(37.5382343, 127.1272417);
    const infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });
    infowindow.open(map, marker);

    kakao.maps.event.addListener(marker, "click", function () {
      window.open("https://ch.mbccomputer.co.kr/front/home", "_blank");
    });
  }, []);

  return (
    <div className="Introduce-container">
      <div className="Introduce-title">
        <p>"독립영화의 세계로 초대합니다"</p>
      </div>
      <div className="Introduce-subtitle">
        <p>안녕하세요, Doori 독립영화관 입니다.</p>
      </div>
      <fieldset className="Introduce-fieldset">
        <legend className="Introduce-legend">"우리의 시선, 우리의 이야기."</legend>
        <div className="Introduce-text">
          <p>
            독립영화는 거대한 상업적 산업의 그늘에서 벗어나, 진정성과 창의력을 바탕으로
            세상에 메시지를 전하는 영화입니다. <br />
            ...
          </p>
        </div>
      </fieldset>
      <fieldset className="Introduce-fieldset">
        <legend className="Introduce-legend">"무엇을 상영하나요?"</legend>
        <div className="Introduce-text">
          <p>
            독립영화관에서는 상업적인 대작보다는 작가주의 영화, 다큐멘터리, 실험영화,
            단편영화 등을 상영합니다.
          </p>
        </div>
      </fieldset>
      <fieldset className="Introduce-fieldset">
        <legend className="Introduce-legend">"찾아오는 길"</legend>
        <div className="Introduce-text">
          <p>
            우리는 도시 속에서 쉽게 접근할 수 있는 곳에 위치해 있으며, 대중교통을 이용해
            쉽게 찾아오실 수 있습니다.
          </p>
        </div>
        <div id="map" className="Introduce-map"></div>
      </fieldset>
    </div>
  );
}

export default Introduce;
