import "./constant.css";
import "./App.css";
import "./Appresponsive.css";
import imgCrud from "./img/profle_person_profile_user_icon.svg";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { apiInstance } from "./utils/api";

import ModalAlert from "./components/modalAlert";
import typeModalAlert from "./state/modalAlert/type";

function App() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.modalAlert);

  const [statePerson, setStatePerson] = useState([]);

  const [inputsForm, setInputsForm] = useState({
    nombreIndicador: "",
    codigoIndicador: "",
    unidadMedidaIndicador: "",
    valorIndicador: "",
    fechaIndicador: "",
    tiempoIndicador: "",
    origenIndicador: "",
  });

  const changeInputs = (e) => {
    setInputsForm({
      ...inputsForm,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const [stateForm, setStateForm] = useState({
    stateSelection: 3,
  });

  const [stateSelection, setStateSelection] = useState(null);

  let stateDisable = true;

  let styleForm = {};

  switch (stateForm.stateSelection) {
    case 0:
      stateDisable = false;
      styleForm = { display: "flex", background: "rgb(201, 224, 201)" };
      break;

    case 1:
      stateDisable = false;
      styleForm = { display: "flex", background: "rgb(219, 219, 195)" };
      break;
    case 2:
      stateDisable = true;
      styleForm = { display: "flex", background: "rgb(214, 190, 190)" };
      break;
    case 3:
      styleForm = { display: "none", background: "" };
      break;
    default:
      break;
  }

  const updateDataIndicators = async () => {
    const { data } = await apiInstance.get(`/solutoria/indicators`);
    setStatePerson(data);
  };

  const getDataIndicators = async () => {
    const { data } = await apiInstance.get(`/solutoria/listIndicators`);
    setStatePerson(data);
  };

  return (
    <div className="App">
      {selector.modalAlert.state === true && (
        <ModalAlert
          type={selector.modalAlert.type}
          message={selector.modalAlert.message}
        />
      )}
      <header className="App-header">
        <img style={{ width: "5rem" }} src={imgCrud}></img>
        <h1>Crud</h1>
      </header>
      <main>
        <div>
          <div className="flexRow">
            <button
              onClick={() => {
                updateDataIndicators();
              }}
            >
              guardar Data en Bd
            </button>
            <button
              onClick={() => {
                getDataIndicators();
              }}
            >
              llamar datos de bd
            </button>
            <button
              onClick={() => {
                setStateForm({ stateSelection: 0 });
                setStateSelection(null);
              }}
            >
              Agregar
            </button>
            <button
              onClick={() => {
                setStateForm({ stateSelection: 1 });
                setStateSelection(null);
              }}
            >
              Modificar
            </button>
            <button
              onClick={() => {
                setStateForm({ stateSelection: 2 });
                setStateSelection(null);
              }}
            >
              Eliminar
            </button>
            <button
              onClick={() => {
                setStateForm({ stateSelection: 3 });
                setStateSelection(null);
              }}
            >
              Cancelar
            </button>
          </div>

          <form
            style={styleForm}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flexColumn"
          >
            <h2>
              {stateForm.stateSelection === 0 ? "Ingrese nuevo usuario" : ""}
              {stateForm.stateSelection === 1
                ? "Seleccione usuario a modificar"
                : ""}
              {stateForm.stateSelection === 2
                ? "Seleccione usuario a eliminar"
                : ""}
            </h2>
            <div>
              <div className="flexColumn">
                <h3>nombre Indicador</h3>
                <input
                  name="nombreIndicador"
                  value={inputsForm.nombreIndicador}
                  onChange={changeInputs}
                  disabled={stateDisable}
                ></input>
              </div>

              <div className="flexColumn">
                <h3>codigo Indicador</h3>
                <input
                  value={inputsForm.codigoIndicador}
                  onChange={changeInputs}
                  name="codigoIndicador"
                  disabled={stateDisable}
                ></input>
              </div>

              <div className="flexColumn">
                <h3>unidad Medida Indicador</h3>
                <input
                  value={inputsForm.unidadMedidaIndicador}
                  onChange={changeInputs}
                  name="unidadMedidaIndicador"
                  disabled={stateDisable}
                ></input>
              </div>

              <div className="flexColumn">
                <h3>valor Indicador</h3>
                <input
                  name="valorIndicador"
                  value={inputsForm.valorIndicador}
                  onChange={changeInputs}
                  disabled={stateDisable}
                ></input>
              </div>
              <div className="flexColumn">
                <h3>fecha Indicador</h3>
                <input
                  name="fechaIndicador"
                  value={inputsForm.fechaIndicador}
                  onChange={changeInputs}
                  disabled={stateDisable}
                ></input>
              </div>
              <div className="flexColumn">
                <h3>tiempo Indicador</h3>
                <input
                  name="tiempoIndicador"
                  value={inputsForm.tiempoIndicador}
                  onChange={changeInputs}
                  disabled={stateDisable}
                ></input>
              </div>
              <div className="flexColumn">
                <h3>origen Indicador</h3>
                <input
                  name="origenIndicador"
                  value={inputsForm.origenIndicador}
                  onChange={changeInputs}
                  disabled={stateDisable}
                ></input>
              </div>
            </div>
            <button
              onClick={async () => {
                if (
                  inputsForm.nombreIndicador.length > 0 &&
                  inputsForm.codigoIndicador.length > 0 &&
                  inputsForm.unidadMedidaIndicador.length > 0 &&
                  inputsForm.valorIndicador.length > 0 &&
                  inputsForm.fechaIndicador.length > 0 &&
                  inputsForm.tiempoIndicador.length > 0 &&
                  inputsForm.origenIndicador.length > 0
                ) {
                  switch (stateForm.stateSelection) {
                    case 0:

                      const { data } = await apiInstance.post(
                        `/solutoria/insertIndicators`,
                        {
                          id: statePerson.length + 1,
                          nombreIndicador: inputsForm.nombreIndicador,
                          codigoIndicador: inputsForm.codigoIndicador,
                          unidadMedidaIndicador:
                            inputsForm.unidadMedidaIndicador,
                          valorIndicador: inputsForm.valorIndicador,
                          fechaIndicador: inputsForm.fechaIndicador,
                          tiempoIndicador: inputsForm.tiempoIndicador,
                          origenIndicador: inputsForm.origenIndicador,
                        }
                      );

                      setStateForm({ stateSelection: 3 });
                      dispatch({
                        type: typeModalAlert.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                        payload: {
                          state: true,
                          type: "accept",
                          message: "Persona Agregada",
                        },
                      });
                      break;
                    case 1:
                      if (stateSelection === null) {
                        dispatch({
                          type: typeModalAlert.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                          payload: {
                            state: true,
                            type: "error",
                            message: "Seleccione persona",
                          },
                        });
                      } else {
                        const { data } = await apiInstance.post(
                          `/solutoria/updateIndicators`,
                          {
                            id: statePerson.length + 1,
                            nombreIndicador: inputsForm.nombreIndicador,
                            codigoIndicador: inputsForm.codigoIndicador,
                            unidadMedidaIndicador:
                              inputsForm.unidadMedidaIndicador,
                            valorIndicador: inputsForm.valorIndicador,
                            fechaIndicador: inputsForm.fechaIndicador,
                            tiempoIndicador: inputsForm.tiempoIndicador,
                            origenIndicador: inputsForm.origenIndicador,
                          }
                        );


                        setStateSelection(null);
                
                        setStateForm({ stateSelection: 3 });
                        dispatch({
                          type: typeModalAlert.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                          payload: {
                            state: true,
                            type: "danger",
                            message: "Persona Modificada",
                          },
                        });
                      }

                      break;
                    case 2:
                      if (stateSelection === null) {
                        dispatch({
                          type: typeModalAlert.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                          payload: {
                            state: true,
                            type: "error",
                            message: "Seleccione persona",
                          },
                        });
                      } else {
                        const { data } = await apiInstance.post(
                          `/solutoria/deleteIndicators`,
                          {
                            id: statePerson.length + 1,
                            nombreIndicador: inputsForm.nombreIndicador,
                            codigoIndicador: inputsForm.codigoIndicador,
                            unidadMedidaIndicador:
                              inputsForm.unidadMedidaIndicador,
                            valorIndicador: inputsForm.valorIndicador,
                            fechaIndicador: inputsForm.fechaIndicador,
                            tiempoIndicador: inputsForm.tiempoIndicador,
                            origenIndicador: inputsForm.origenIndicador,
                          }
                        );


                        setStateSelection(null);
                        setStateForm({ stateSelection: 3 });
                        dispatch({
                          type: typeModalAlert.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                          payload: {
                            state: true,
                            type: "danger",
                            message: "Persona Eliminada",
                          },
                        });
                      }

                      break;
                    default:
                      break;
                  }
                } else {
                  dispatch({
                    type: typeModalAlert.CHANGE_GLOBAL_STATE_MODAL_ALERT,
                    payload: {
                      state: true,
                      type: "error",
                      message: "falta completar",
                    },
                  });
                }
              }}
            >
              {stateForm.stateSelection === 0 ? "Guardar" : ""}
              {stateForm.stateSelection === 1 ? "Modificar" : ""}
              {stateForm.stateSelection === 2 ? "Eliminar" : ""}
            </button>
          </form>

          <div className="flexColumn">
            <div className="flexRow">
              <h3>nombre Indicador</h3>
              <h3>codigo Indicador</h3>
              <h3>unidad MedidaIndicador</h3>
              <h3>valor Indicador</h3>
              <h3>fecha Indicador</h3>
              <h3>tiempo Indicador</h3>
              <h3>origen Indicador</h3>
            </div>
            <div className="flexColumn">
              {statePerson.map((listPerson, index) => {
                return (
                  <div
                    style={
                      stateSelection === listPerson.id
                        ? { backgroundColor: "rgb(108, 110, 117)" }
                        : { backgroundColor: "" }
                    }
                    onClick={() => {
                      switch (stateForm.stateSelection) {
                        case 1:
                          setInputsForm({
                            name: listPerson.name,
                            lastName: listPerson.lastName,
                            phone: listPerson.phone,
                          });
                          setStateSelection(listPerson.id);

                          break;
                        case 2:
                          setInputsForm({
                            name: listPerson.name,
                            lastName: listPerson.lastName,
                            phone: listPerson.phone,
                          });
                          setStateSelection(listPerson.id);
                          break;
                        default:
                          break;
                      }
                    }}
                    className="flexRow"
                  >
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.nombreIndicador}
                    </h3>
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.codigoIndicador}
                    </h3>
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.unidadMedidaIndicador}
                    </h3>
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.valorIndicador}
                    </h3>
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.fechaIndicador}
                    </h3>
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.tiempoIndicador}
                    </h3>
                    <h3
                      style={
                        stateSelection === listPerson.id
                          ? { color: "white" }
                          : { color: "" }
                      }
                    >
                      {listPerson.origenIndicador}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
