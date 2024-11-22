import { useEffect } from "react";

import './css/Introduce.css';
const { kakao } = window;

function Introduce() {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(37.5382343, 127.1272417),
        level: 3
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new window.kakao.maps.LatLng(37.5382343, 127.1272417); // 마커 위치
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      const iwContent = '<h style="margin: 20px;">Doori독립영화관<h>',
      iwPosition = new kakao.maps.LatLng(37.5382343, 127.1272417);
      const infowindow = new kakao.maps.InfoWindow({
        position : iwPosition,
        content : iwContent
      });
      infowindow.open(map, marker);
      window.kakao.maps.event.addListener(marker, 'click', function () {
        window.open('https://ch.mbccomputer.co.kr/front/home', '_blank'); 
      });
  }, [])
  return (
    <div>
      <div className="title"><p>"독립영화의 세계로 초대합니다"</p></div>
      <th className="subtitle2"><p>안녕하세요, Doori 독립영화관 입니다.</p></th> 
      <fieldset>
        <legend>"우리의 시선, 우리의 이야기."</legend>
        <div className="text1"><p>독립영화는 거대한 상업적 산업의 그늘에서 벗어나, 진정성과 창의력을 바탕으로 세상에 메시지를 전하는 영화입니다.<br /> 이곳은 바로 그런 독립적인 영화들만을 모아 소개하는 공간입니다. 우리는 독립영화가 가진 고유의 힘을 믿습니다. 더 넓은 세상에서 묻히기 쉬운,<br /> 그러나 깊고 진지한 이야기를 담고 있는 작품들이 여러분을 기다리고 있습니다. 여기서는 대형 영화관에서는 볼 수 없는 새로운 시각과 감동을 만나볼 수 있습니다.<br /> 영화에 대한 새로운 경험을 원하신다면, 우리 사이트에서 다양한 독립영화들을 감상해 보세요. 매주 새로운 작품이 추가되며, 여러분은 이곳에서 독립영화의 진정한 가치를 발견하게 될 것입니다.</p></div>
      </fieldset>
      <fieldset>
        <legend>"무엇을 상영하나요?"</legend>
      <div className="text1"><p>독립영화관에서는 상업적인 대작보다는 작가주의 영화, 다큐멘터리, 실험영화, 단편영화 등을 상영합니다. 또한, 전통적인 극영화뿐만 아니라, 다양한 장르와 형식을 아우르는 작품들이 상영됩니다. 그 어떤 상업적인 트렌드에도 휘둘리지 않고, 창의적이고 실험적인 영화들을 소개하여 관객들에게 새로운 영화적 세계를 선보입니다.</p></div>
      </fieldset>
      <fieldset>
        <legend>"특별 프로그램"</legend>
      <div className="text1"><p>독립영화관은 정기적으로 영화제, 감독과의 만남, 작품 해설 세션 등을 개최합니다. 또한, 특정 주제나 장르를 중심으로 특별 상영 프로그램을 마련해 관객들이 더 깊이 있고 다양한 영화를 경험할 수 있도록 합니다. 영화와 함께하는 문화 행사는 우리 영화관의 중요한 부분으로, 영화 그 이상의 가치를 제공하고자 합니다. 또한, 커뮤니티와의 연결을 중요하게 생각하며, 영화와 관련된 워크숍, 토크쇼 등을 통해 더 많은 사람들과 소통합니다.</p></div>
      </fieldset>
      <fieldset>
        <legend>"시설은 어떤 구조인가요?"</legend>
      <div className="text1"><p>독립영화관은 영화 관람의 경험을 최우선으로 고려한 아늑하고 편안한 공간입니다. 큰 스크린과 우수한 음향 시스템을 통해 최상의 영화 감상 환경을 제공하며, 영화관 내부는 관객들이 영화에 집중할 수 있도록 세심하게 디자인되었습니다. 여기서는 단순히 영화를 보는 것이 아니라, 영화와 소통하고, 경험하고, 느끼는 공간입니다. 또한, 작은 커피숍과 갤러리 공간도 있어 영화 상영 전후로 커피를 마시며 여유를 즐길 수 있습니다.</p></div>
      </fieldset>
      <fieldset>
        <legend>"찾아오는 길"</legend>
      <div className="text1"><p>우리는 도시 속에서 쉽게 접근할 수 있는 곳에 위치해 있으며, 대중교통을 이용해 쉽게 찾아오실 수 있습니다. 주차 공간도 마련되어 있어 차량을 이용하시는 분들도 편리하게 방문하실 수 있습니다. 영화관 내부에는 장애물 없는 접근을 지원하여, 모든 사람들이 불편함 없이 이용할 수 있습니다.</p></div>
      <div id="map" style={{ width: '500px', height: '500px' }}></div>
      </fieldset>
      <fieldset>
        <legend>"끝으로"</legend>
      <div className="text1"><p>독립영화관은 단순한 영화관이 아닙니다. 우리는 영화를 사랑하는 사람들이 모여 서로의 생각을 나누고, 더 나은 세상을 위한 영감을 주고받는 공간입니다. 영화라는 매개체를 통해 사회적, 문화적 대화를 이어가고, 다양한 목소리가 하나로 모일 수 있는 장을 제공합니다. 우리는 여러분이 영화와 함께 새로운 세상을 만날 수 있도록 도와드릴 것입니다. 독립영화관에서 만나요!</p></div>
      </fieldset>
    </div>
    
      
  );
}

export default Introduce;