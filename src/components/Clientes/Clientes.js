import React, { Component } from 'react';
import classes from './Clientes.module.css';
import MyForm from "../../components/myForm/myForm";
import MyList from "../../components/myList/myList";
import API from '../../api';
import Aux from '../../hoc/Aux';

class Clientes extends Component {

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

    updateCliente = async (cliente) => {

        await API.put('clientes/' + this.state.id, cliente);

        const clientes = [...this.state.clientes];
        clientes[this.state.index].name = cliente.name;
        clientes[this.state.index].lastname = cliente.lastname;

        this.resetForm();


    }

    insertCliente = async (cliente) => {

        await API.post('clientes/', cliente);

        this.obtenerListado();

        this.resetForm();


    }

    deleteCliente = async (id, index) => {

        await API.delete('clientes/' + id);

        let clientes = [...this.state.clientes];
        clientes.splice(index, 1);

        this.setState({ clientes: clientes });

        this.resetForm();

    }

    componentDidMount() {

        this.obtenerListado();

    }

    handleChange = (event) => {

        const form = { ...this.state.form }
        form[event.target.name] = event.target.value;
        this.setState({ form: form });

    }

    handleGuardar = () => {

        const name = this.state.form.name;
        const lastname = this.state.form.lastname;

        const cliente = { name, lastname };

        if (this.state.index >= 0) {
            this.updateCliente(cliente);
        } else {
            this.insertCliente(cliente);
        }

    }

    handleDelete = (id, index) => {
        this.deleteCliente(id, index);
    }

    handleEdit = (id) => {

        const index = this.state.clientes.findIndex((el) => el.id === id);

        const cliente = this.state.clientes[index];

        const form = { name: cliente.name, lastname: cliente.lastname };

        this.setState({
            form: form,
            index: index,
            id: id
        });

    }


    render() {

        let clientes = this.state.clientes;
        let btnTextGuardar = this.state.index >= 0 ? 'Actualizar' : 'Guardar';

        return (
            <Aux>
                <div className={classes.Clientes}>

                    <h1>{this.state.title}</h1>

                    <MyForm
                        textoGuardar={btnTextGuardar}
                        guardar={this.handleGuardar}
                        change={this.handleChange}
                        form={this.state.form}
                    />

                    <MyList
                        clientes={clientes}
                        edit={this.handleEdit}
                        delete={this.handleDelete}
                    />

                </div>

            </Aux>
        );
    }
}

export default Clientes;
