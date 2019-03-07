import React from "react";
import classes from "./myForm.module.css";

const myForm = (props) => {

  return (
    <div>
      <form className={classes.myForm}>
        <input
          type="text"
          placeholder="Tu nombre"
          name="name"
          className={classes.formField}
          onChange={props.change}
          value={props.form.name}
        />
        <input
          type="text"
          placeholder="Tu apellido"
          name="lastname"
          className={classes.formField}
          onChange={props.change}
          value={props.form.lastname}
        />
        <button
          type="button"
          onClick={() => props.guardar()}
          className={classes.myButton}
        >
          {props.textoGuardar}
        </button>
      </form>
    </div>
  );
};

export default myForm;
