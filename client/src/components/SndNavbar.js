import React from 'react';
import { observer } from 'mobx-react-lite';
import "../css/components/sndNav.css"
import { useMediaPredicate } from "react-media-hook";

const SndNavbar = observer(() => {
  const lessThan576 = useMediaPredicate("(max-width: 576px)");
  return (
    <nav class="navbar navbar-expand-sm sndNav">
      <div class="container-fluid navContent">
        <a class="navbar-brand" href="/">Gigix.ua</a>
        <div className='sndNavNav'>
          <ul class="navbar-nav">
            <li className='nav-item nav1'>
              <form>
                <button className='catalogBtn'>
                  {!lessThan576 ? <>Каталог</> : <>К</>}
                </button>
              </form>
            </li>
            <li class="nav-item nav2">
              <form className='searchField'>
                <input type='text' placeholder='Я хочу знайти...' name='q'>
                </input>
                <button type='submit'>Пошук</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
export default SndNavbar;
