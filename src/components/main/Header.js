import { useState } from "react"
import "../css/Header.css";

function Header(){
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  
  function changeSearchHandler(e){
    setSearch(e.target.value)
  }

  function handleSearchClick() {
    console.log("검색어:", search);
    // 실제 검색 로직을 여기에 추가필요
  }

  return(
    <div className="Header">
      <button>sidebar</button>
      <a href="/">
        <img src="/img/doorimain.png" alt="doorimain"/>
      </a>
      <div>
        <input type="text" placeholder="검색어를 입력하세요" value={search} onChange={changeSearchHandler}/>
        <button className="search" onClick={handleSearchClick}>검색</button>
      </div>  
    </div>
  )
}

export default Header