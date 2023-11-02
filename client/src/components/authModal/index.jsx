import {motion} from "framer-motion";
import Backdrop from "../Backdrop";
import "../../css/customModal.css";
import {useState, useEffect } from 'react';
import dropIn from "../../utils/modalAnimation";
import {Col} from 'react-bootstrap';

const Modal = ({handleClose, text, switchToReg}) => {
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
  return(
    <Backdrop onClick={handleBackdropClick}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="customModal"
        id="modal"
        variants={dropIn}
        initial={enlarged ? "enlarged" : "hidden"}
        animate={enlarged ? "enlarged" : "visible"}
        exit={enlarged ? "enlarged" : "exit"}
        frame-motion="animation1"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Авторизація</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="form-floating mb-3" data-bs-theme="dark">
             <input type="email" className="form-control" placeholder="name@example.com"></input>
             <label htmlFor="floatingInput">Пошта</label>
            </div>
            <div className="form-floating mb-3" data-bs-theme="dark">
             <input type="password" className="form-control" placeholder="password"></input>
             <label htmlFor="floatingInput">Пароль</label> 
            </div>
          </div>
          <div className="modal-footer">
            <Col>
              <span>Немає акаунту?</span> <a href="#" id="reg" className="link" onClick={switchToReg}>Реєстрація</a>
            </Col>
            <Col className="right">
              <button type="button" className="button">Авторизація</button>
            </Col>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;