import React, { Component } from 'react';
import classes from './App.module.css';
import API from './api';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Alta de clientes',
      clientes: [],
      index: -1,
      id: 0
    }
  }

  obtenerListado = async () => {

    const resp = await API.get('clientes');

    if (resp.status === 200) {
      this.setState({ clientes: resp.data });
    }

  }

  resetForm = () => {

    this.setState({
      index: -1,
      id: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();


  }

  updateCliente = async (cliente) => await API.put('clientes/' + this.state.id, cliente)

  insertCliente = async (cliente) => {
    const resp = await API.post('clientes/', cliente);

    if (resp.status === 201) {
      this.obtenerListado();
    }

  }

  deleteCliente = async (id) => {
    const resp = await API.delete('clientes/' + id);

    if (resp.status === 200) {
      this.obtenerListado();
    }

  }

  componentDidMount() {

    this.obtenerListado();
    this.refs.name.focus();

  }

  handleGuardar = () => {

    const name = this.refs.name.value;
    const lastname = this.refs.lastname.value;

    const clientes = [...this.state.clientes];

    const cliente = { name, lastname };

    if (this.state.index >= 0) {

      clientes[this.state.index].name = name;
      clientes[this.state.index].lastname = lastname;

      this.updateCliente(cliente);

    } else {

      this.insertCliente(cliente);

    }

    this.resetForm();


  }

  handleDelete = (id) => {

    this.deleteCliente(id);

    this.resetForm();

  }

  handleEdit = (id) => {

    const index = this.state.clientes.findIndex((el) => el.id === id);

    const cliente = this.state.clientes[index];

    this.refs.name.value = cliente.name;
    this.refs.lastname.value = cliente.lastname;

    this.setState({
      index: index,
      id: id
    });

    this.refs.name.focus();

  }


  render() {

    let clientes = this.state.clientes;
    let btnTextGuardar = this.state.index >= 0 ? 'Actualizar' : 'Guardar';

    return (
      <div className={classes.App}>

        <h1>{this.state.title}</h1>

        <div>
          <form ref="myForm" className={classes.myForm} >
            <input type="text" ref="name" placeholder="Tu nombre" className={classes.formField} />
            <input type="text" ref="lastname" placeholder="Tu apellido" className={classes.formField} />
            <button type="button" onClick={() => this.handleGuardar()} className={classes.myButton}>{btnTextGuardar}</button>
          </form>
        </div>

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
                clientes.map((el, index) =>
                  <tr key={el.id} className={classes.myList}>
                    <td>{index + 1}.- {el.name} {el.lastname}</td>
                    <td>
                      <button type="button" onClick={() => this.handleEdit(el.id)} className={classes.myListButton + ' ' + classes.editar}   ><i className="far fa-edit"></i></button>
                      <button type="button" onClick={() => this.handleDelete(el.id)} className={classes.myListButton + ' ' + classes.borrar}><i className="far fa-trash-alt"></i></button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}

export default App;
