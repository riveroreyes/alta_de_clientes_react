import React from "react";
import classes from "./myList.module.css";

const myList = (props) => {

  return (
    <div className={classes.div_table}>
      <table>
        <thead>
          <tr>
            <th>Nombres y Apellidos</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {
            props.clientes.map((el, index) =>
              <tr key={el.id} className={classes.myList}>
                <td>{index + 1}.- {el.name} {el.lastname}</td>
                <td>
                  <button type="button" onClick={() => props.edit(el.id)} className={[classes.myListButton, classes.editar].join(' ')}>Edit</button>
                  <button type="button" onClick={() => props.delete(el.id, index)} className={[classes.myListButton, classes.borrar].join(' ')}>Delete</button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default myList;