import "./styles.css";
import { useEffect, useState, useContext } from "react";
import { useStyles } from "../../styles/form-material-ui";
import { TextField } from "@material-ui/core/";
import { GlobalStatesContext } from "../../contexts/GlobalStatesContext";
import { useForm } from "react-hook-form";
import InputPassword from "../../components/InputPassword";
import InputMask from 'react-input-mask'
import onlyNumbers from "../../functions/onlyNumbers";

function ModalEditUser({ open, setOpen }) {
  const styles = useStyles();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const { 
    token, 
    user, 
    setUser, 
    setLoading, 
    setAlert, 
    clearAlert 
  } = useContext(GlobalStatesContext);
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

    data.phone = onlyNumbers(data.phone);
    data.cpf = onlyNumbers(data.cpf);

    clearAlert();
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-payment-manager.herokuapp.com/perfil/",
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

        setTimeout(() => closeModal(), 2000);
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
            <form className="form" id="form-edit-user" onSubmit={handleSubmit(onSubmit)}>
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
              <InputMask 
                mask="(99) 999999999"
                id="phone"
                label="Telefone"
                defaultValue={user.phone && user.phone}
                {...register("phone")}>
                  { (inputProps) => <TextField {...inputProps} className={styles.input} /> }
              </InputMask>
              <InputMask 
                mask="999.999.999-99"
                id="cpf"
                label="CPF"
                defaultValue={user.cpf && user.cpf}
                {...register("cpf")}
              >
                  { (inputProps) => <TextField {...inputProps} className={styles.input} /> }
              </InputMask>
              <button className={`btn btn-${buttonClass}`} type="submit">
                Editar conta
              </button>
            </form>
        </div>
      )}
    </>
  );
}

export default ModalEditUser;
