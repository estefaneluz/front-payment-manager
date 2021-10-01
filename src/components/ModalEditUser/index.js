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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { token, user, setUser, setLoading } = useContext(AuthContext);
  const [alert, setAlert] = useState({});
  const watchFields = watch(['name', 'email']);
  const [buttonClass, setButtonClass] = useState('pink-opacity');


  const closeModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (watchFields.includes('')) {
      setButtonClass("pink-opacity");
    } else {
      setButtonClass("pink");
    }
  }, [watchFields]);

  const clearAlert = () => setAlert({});

  const saveUser = async () => {
    setLoading(true);

    const response = await fetch(
      "https://api-payment-manager.herokuapp.com/perfil",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = await response.json();

    setLoading(false);

    return setUser(userData);
  }

  const onSubmit = async (data) => {
    clearAlert();
    setLoading(true);

    try {
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

      setLoading(false);

      if (response.ok) {
        await saveUser();
        
        setAlert({
          type: "success",
          message: "Usuário atualizado com sucesso!",
        });

        setTimeout(() => closeModal(), 3000);
        return;
      }

      const message = await response.json();

      setAlert({
        type: "error",
        message,
      });

    } catch (error) {
      setLoading(false);

      return setAlert({
        type: "error",
        message: error.message
      });
    }
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
                error={!!errors.name}
                {...register("name", { required: true })}
              />
              <TextField
                id="email"
                label="E-mail"
                placeholder="exemplo@gmail.com"
                className={styles.input}
                defaultValue={user.email}
                error={!!errors.email}
                {...register("email", { required: true })}
              />
              <InputPassword
                id="password"
                label="Nova senha"
                placeholder="Deixe vazio para não editar."
                register={register}
              />
              <TextField
                id="phone"
                label="Telefone"
                className={styles.input}
                defaultValue={user.phone && user.phone}
                {...register("phone")}
              />
              <TextField
                id="cpf"
                label="CPF"
                className={styles.input}
                defaultValue={user.cpf && user.cpf}
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
