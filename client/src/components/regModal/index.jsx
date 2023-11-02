import {motion} from "framer-motion";
import Backdrop from "../Backdrop";
import "../../css/customModal.css";
import "../../css/regModal.css";
import {useState, useEffect } from 'react';
import dropIn from "../../utils/modalAnimation";
import { useMediaPredicate } from "react-media-hook";
import {Col} from 'react-bootstrap';

const Modal = ({handleClose, text, switchToAuth}) => {
  const [enlarged, setEnlarged] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnlarged(false);
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [enlarged]);

  const handleBackdropClick = () => {
    setEnlarged(true);
  };

  const lessThan500 = useMediaPredicate("(max-width: 500px)");
  const className = lessThan500 ? "" : "input-group"
  return(
    <Backdrop onClick={handleBackdropClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="customModal regModal"
        id="modal"
        variants={dropIn}
        initial={enlarged ? "enlarged" : "hidden"}
        animate={enlarged ? "enlarged" : "visible"}
        exit={enlarged ? "enlarged" : "exit"}
        frame-motion="animation1"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Реєстрація</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className={className}>
              <div className="form-floating mb-3" data-bs-theme="dark">
                <input type="text" className="form-control" placeholder="Ім'я"></input>
                <label htmlFor="floatingInput">Ім'я</label> 
              </div>
              <div className="form-floating mb-3" data-bs-theme="dark">
                <input type="text" className="form-control" placeholder="Прізвище"></input>
                <label htmlFor="floatingInput">Прізвище</label> 
              </div>
            </div>
            <div className="form-floating mb-3" data-bs-theme="dark">
              <input type="email" className="form-control" placeholder="name@example.com"></input>
              <label htmlFor="floatingInput">Пошта</label>
            </div>
            <div className="form-floating mb-3" data-bs-theme="dark">
              <input type="password" className="form-control" placeholder="Пароль"></input>
              <label htmlFor="floatingInput">Пароль</label> 
            </div>
            <div className="form-floating mb-3" data-bs-theme="dark">
              <input type="password" className="form-control" placeholder="Підтвердіть пароль"></input>
              <label htmlFor="floatingInput">Підтвердіть пароль</label> 
            </div>
          </div>
          <div className="modal-footer row">
            <Col>
              <span>Є акаунт?</span> <a href="#" id="reg" className="link" onClick={switchToAuth}>Авторизація</a>
            </Col>
            <Col className="right">
              <button type="button" className="button">Реєстрація</button>
            </Col>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;