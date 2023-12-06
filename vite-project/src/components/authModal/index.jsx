import {motion} from "framer-motion";
import Backdrop from "../Backdrop";
import "../../css/components/customModal.css";
import {useState, useEffect, useContext} from 'react';
import dropIn from "../../utils/modalAnimation";
import {Col} from 'react-bootstrap';
import { observer } from "mobx-react-lite";
import { Context } from '../../main.jsx';  
import loginValidation from "../validation/loginValidation.jsx";

const Modal = observer(({handleClose, switchToReg}) => {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(Context);
  const {server} = useContext(Context);

  //validation errors
  const [errors, setErrors] = useState({});

  //variable which gives our inputs classes form-control and erInput
  const [invClass, setInvClass] = useState({
    email: "form-control",
    password: "form-control",
  });

  const handleSubmit = () => {
    let data = loginValidation(email, password, context, handleClose);
    setErrors(data[0]);
    setInvClass(data[1]);
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
              <input type="email" className={invClass.email} placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)}></input>
              <label htmlFor="floatingInput">Пошта</label>
              {errors.email &&
                <p className="erText">
                  {errors.email}
                </p>
              }
            </div>
            <div className="form-floating mb-3" data-bs-theme="dark">
              <input type="password" className={invClass.password} placeholder="password" value={password} onChange={e => setPassword(e.target.value)}></input>
              <label htmlFor="floatingInput">Пароль</label> 
              {errors.password &&
                <p className="erText">
                  {errors.password}
                </p>
              }
              {server.serverE &&
                <p className="erText">
                  {server.serverE}
                </p>
              }
            </div>
          </div>
          <div className="modal-footer">
            <Col>
              <span>Немає акаунту?</span> <a href="#" id="reg" className="link" onClick={switchToReg}>Реєстрація</a>
            </Col>
            <Col className="right">
              <button type="button" className="button" onClick={handleSubmit}>Авторизація</button>
            </Col>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
});

export default Modal;