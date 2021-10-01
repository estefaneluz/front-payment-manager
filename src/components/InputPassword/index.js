import {
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
  } from "@material-ui/core";
  import { Visibility, VisibilityOff } from "@material-ui/icons/";
  import { useStyles } from "../../styles/form-material-ui";
  import { useState } from "react";
  
  export default function Password(props) {
    const [showPassword, setShowPassword] = useState(false);
    const styles = useStyles();
  
    return (
      <FormControl className={styles.input}>
        <InputLabel error={props.error} htmlFor={props.id}>
          {props.label}
        </InputLabel>
        <Input
          error={props.error}
          id={props.id}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Mude a visualização da senha"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          {...props.register(props.id, { required: true })}
        />
      </FormControl>
    );
  }