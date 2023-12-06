import {motion} from "framer-motion";
import Backdrop from "../Backdrop";
import "../../css/components/customModal.css";
import "../../css/components/regModal.css";
import {useState, useEffect, useContext } from 'react';
import dropIn from "../../utils/modalAnimation";
import { useMediaPredicate } from "react-media-hook";
import {Col, Form} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main.jsx';  
import registrationValidation from "../validation/registrationValidation.jsx";

const Modal = observer(({handleClose, switchToAuth}) => {
  const [enlarged, setEnlarged] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const {server} = useContext(Context);
  const context = useContext(Context);

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

  //validation errors
  const [errors, setErrors] = useState({});

  //variable which gives our inputs classes form-control and erInput
  const [invClass, setInvClass] = useState({
    name: "form-control",
    surname: "form-control",
    email: "form-control",
    password: "form-control",
    confirmPassword: "form-control",
  });

  const handleSubmit = () => {
    let data = registrationValidation(name, surname, email, password, confirmPassword, context, handleClose);
    setErrors(data[0]);
    setInvClass(data[1]);
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
                <input type="text" className={invClass.name} placeholder="Ім'я" value={name} onChange={e => setName(e.target.value)}></input>
                <label htmlFor="floatingInput">Ім'я</label> 
                {errors.name &&
                  <p className="erText">
                    {errors.name}
                  </p>
                }
              </div>
              <div className="form-floating mb-3" data-bs-theme="dark">
                <input type="text" className={invClass.surname} placeholder="Прізвище" value={surname} onChange={e => setSurname(e.target.value)}></input>
                <label htmlFor="floatingInput">Прізвище</label> 
                {errors.surname &&
                  <p className="erText">
                    {errors.surname}
                  </p>
                }
              </div>
            </div>
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
              <input type="password" className={invClass.password} placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} ></input>
              <label htmlFor="floatingInput">Пароль</label> 
              {errors.password &&
                <p className="erText">
                  {errors.password}
                </p>
              }
            </div>
            <div className="form-floating mb-3" data-bs-theme="dark">
              <Form.Control type="password" className={invClass.confirmPassword} placeholder="Підтвердіть пароль" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
              <label htmlFor="floatingInput">Підтвердіть пароль</label> 
              {errors.confirmPassword &&
                <p className="erText">
                  {errors.confirmPassword}
                </p>
              }
              {server.serverE &&
                <p className="erText">
                  {server.serverE}
                </p>
              }
            </div>
          </div>
          <div className="modal-footer row">
            <Col>
              <span>Є акаунт?</span> <a href="#" id="reg" className="link" onClick={switchToAuth}>Авторизація</a>
            </Col>
            <Col className="right">
              <button type="button" className="button" onClick={handleSubmit}>Реєстрація</button>
            </Col>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
});

export default Modal;