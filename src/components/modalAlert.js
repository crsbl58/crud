import "../style/modalAlert/index.css";
import "../style/modalAlert/indexResponsive.css";
import acceptSvg from "../img/modalAlert/accept.svg";
import dangerSvg from "../img/modalAlert/danger.svg";
import errorSvg from "../img/modalAlert/error.svg";
import noticeSvg from "../img/modalAlert/notice.svg";
import typeState from "../state/modalAlert/type";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const ModalAlert = ({ type, message, time }) => {
    
  const dispatch = useDispatch();
  let SelectionType = null;
  const [stateOpacity, setStateOpacity] = useState(0);
  switch (type) {
    case "accept":
      SelectionType = acceptSvg;
      break;
    case "danger":
      SelectionType = dangerSvg;
      break;
    case "error":
      SelectionType = errorSvg;
      break;
    case "notice":
      SelectionType = noticeSvg;
      break;
    default:
      break;
  }
  useEffect(() => {
    setStateOpacity(1);
  });
/*   let closeModalAlert = null
   closeModalAlert = setTimeout(() => {
    dispatch({
      type: typeGlobal.CHANGE_GLOBAL_STATE_MODAL_ALERT,
      payload: false,
    });
    clearTimeout(closeModalAlert);
  }, 4000);  */

  return (
    <div
      style={{ opacity: `${stateOpacity}` }}
      className="divContainerModalAlert00"
    >
      <div>
        <img src={SelectionType}></img>
        <h3>{message}</h3>
      </div>
      <button
        onClick={() => {
    
            dispatch({
                type: typeState.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                payload: false,
              });
        }}
      >
        Aceptar
      </button>
    </div>
  );
};

export default ModalAlert;
