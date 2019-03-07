import React, { Component } from 'react';
import classes from './App.module.css';
import MyForm from "./components/myForm/myForm";
import MyList from "./components/myList/myList";
import API from './api';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Alta de clientes',
      clientes: [],
      index: -1,
      id: 0,
      form: {
        name: "",
        lastname: ""
      }
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
      id: 0,
      form: {
        name: "",
        lastname: ""
      }
    });

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

  }

  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    const form = {...this.state.form}
    form[name] = value;
    this.setState({form: form});
    
  }

  handleGuardar = () => {

    const name = this.state.form.name;
    const lastname = this.state.form.lastname;

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

    const form = {name: cliente.name, lastname:cliente.lastname};

    this.setState({form: form});

    this.setState({
      index: index,
      id: id
    });

  }


  render() {

    let clientes = this.state.clientes;
    let btnTextGuardar = this.state.index >= 0 ? 'Actualizar' : 'Guardar';

    return (
      <div className={classes.App}>

        <h1>{this.state.title}</h1>

        <MyForm 
          textoGuardar={btnTextGuardar}
          guardar={this.handleGuardar}
          change={this.handleChange}
          name={this.state.form.name}
          lastname={this.state.form.lastname}
        />

        <MyList 
          clientes={clientes}
          edit={this.handleEdit}
          delete={this.handleDelete}
        />

      </div>
    );
  }
}

export default App;
