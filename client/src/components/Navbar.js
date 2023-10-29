import React, {useContext} from 'react';
import { Context } from '..';
import "../css/mainNav.css";
import "../css/button.css";
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Navbar = observer(() => {
  const {user} = useContext(Context);
  const navigate = useNavigate();
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mainNav">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Магазин</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Головна</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Товари</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Про нас</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/">Контакти</a>
            </li>
            <li>
              {user.isAuth ? (<>
                <button class="button" onClick={() => navigate('/admin')}>Керування сайтом</button>
                <button class="button" onClick={() => navigate('/acount')}>Акаунт</button></>)
                : ( <>
                <button class="button" onClick={() => user.setIsAuth(true)}>Авторизація</button>
                <button class="button" onClick={() => navigate('/registration')}>Реєстрація</button></>)
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
export default Navbar;
