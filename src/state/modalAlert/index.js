import typeState from "./type";

const estadoInicial = {
  modalAlert: {
    state: false,
    type: "",
    message: "",
  },
};

function rootReducer(state = estadoInicial, accion) {
  switch (accion.type) {
    case typeState.CHANGE_GLOBAL_STATE_MODAL_ALERT:
      return {
        ...state,
        modalAlert: {
          state: accion.payload.state,
          type: accion.payload.type,
          message: accion.payload.message,
        },
      };
    default:
      return state;
  }
}
export default rootReducer;
