import React, { Component } from "react";
import classes from "./myForm.module.css";

export default class myForm extends Component {

  render() {

    let controles = [];

    controles = Object.values(this.props.form).map((el, i) => {


      if (el.control === "input") {

        return (
          <input
            key={i}
            type={el.text}
            placeholder={el.placeholder}
            name={el.name}
            className={classes.formField}
            onChange={this.props.change}
            value={el.value}
          />
        );

      }else if( el.control === "checkbox" ){

        return (
          <input
            key={i}
            type="checkbox"
            name={el.name}
            value={el.value}
            check={el.check}
          />
        );

      }else{
        return null;
      }

    }
    )



    return (
      <div className="container">
        <div>
          <form className={classes.myForm}>

            { controles.map( (el,i) => el )}

            <button
              type="button"
              onClick={() => this.props.guardar()}
              className={classes.myButton}
            >
              {this.props.textoGuardar}
            </button>
          </form>
        </div>

      </div>
    );


  }

}