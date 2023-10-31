import React from 'react';
import "../css/modal.css";
import "../css/button.css";
import {motion} from "framer-motion";

const AuthModal = () => {
  return (
    <div class="modal fade" id="authModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Авторизація</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-floating mb-3" data-bs-theme="dark">
             <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
             <label for="floatingInput">Пошта</label>
            </div>
            <div class="form-floating mb-3" data-bs-theme="dark">
             <input type="password" class="form-control" id="floatingInput" placeholder="password"></input>
             <label for="floatingInput">Пароль</label>
            </div>
          </div>
          <div class="modal-footer">
            <motion.button type="button" class="button" className='button' onClick={() => null} whileHover={{scale: 1.1}} whileTap={{scale: 0.8}}>Реєстрація</motion.button>
            <button type="button" class="button">Авторизація</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
