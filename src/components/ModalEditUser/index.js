import "./styles.css";
import { useEffect, useState, useContext } from "react";
import { useStyles } from "../../styles/form-material-ui";
import { TextField, Snackbar } from "@material-ui/core/";
import { Alert } from "@material-ui/lab";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";

function ModalEditUser({ open, setOpen }) {
  const styles = useStyles();
  const { register, handleSubmit, watch } = useForm();

  const { token, user } = useContext(AuthContext);
  const [alert, setAlert] = useState({});
  const watchAllFields = watch();
  const [buttonClass, setButtonClass] = useState('-pink-opacity');


  const closeModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (
      !watchAllFields.name ||
      !watchAllFields.password ||
      !watchAllFields.email
    ) {
      setButtonClass("pink-opacity");
    } else {
      setButtonClass("pink");
    }
  }, [watchAllFields]);

  const clearAlert = () => setAlert({});

  const onSubmit = async (data) => {
    clearAlert();

    const response = await fetch(
      "https://api-payment-manager.herokuapp.com/perfil",
      {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      setAlert({
        type: "success",
        message: "Usuário atualizado com sucesso!",
      });
      setTimeout(() => closeModal(), 4000);
      return;
    }

    const message = await response.json();
    setAlert({
      type: "error",
      message,
    });
  };

  return (
    <>
      {open && (
        <div className="modal">
          <div id="form-edit-user">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-close" onClick={() => closeModal()}>X</div>
              <h1>Editar Usuário</h1>
              <TextField
                id="name"
                label="Nome"
                className={styles.input}
                defaultValue={user.name}
                {...register("name", { required: true })}
              />
              <TextField
                id="email"
                label="E-mail"
                placeholder="exemplo@gmail.com"
                className={styles.input}
                value={user.email}
                {...register("email", { required: true })}
              />
              <InputPassword
                id="password"
                label="Nova senha"
                placeholder="Deixe vazio para não editar."
                register={register}
              />
              <TextField
                id="standard-basic"
                label="Telefone"
                className={styles.input}
                value={user.phone && user.phone}
                {...register("phone")}
              />
              <TextField
                id="standard-basic"
                label="CPF"
                className={styles.input}
                value={user.cpf && user.cpf}
                {...register("cpf")}
              />
              <button className={`btn btn-${buttonClass}`} type="submit">
                Editar conta
              </button>
            </form>
          </div>
          {!!alert.message && (
            <Snackbar
              open={!!alert.message}
              autoHideDuration={4000}
              onClose={clearAlert}
            >
              <Alert onClose={clearAlert} severity={alert.type}>
                {alert.message}
              </Alert>
            </Snackbar>
          )}
        </div>
      )}
    </>
  );
}

export default ModalEditUser;
