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
                 name: { control: "input", tipo: "text", name: "name", placeholder: "Tu nombre", value: "" } ,
                 lastname: { control: "input", tipo: "text", name: "lastname", placeholder: "Tu apellido", value: "" },
                 activo: { control: "checkbox", tipo: "checkbox", name: "activo", placeholder: null, value: "1", checked:true },
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

        const form = {...this.state.form};
        Object.values(form).map((el, i) => el.value = "");

        this.setState({
            index: -1,
            id: 0,
            form: form
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

        form[event.target.name].value = event.target.value;

        this.setState({ form: form });

    }

    handleGuardar = () => {

        const cliente = {};

        Object.values(this.state.form).map((el, i) => cliente[el.name] = el.value);

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

        const form = {...this.state.form};

        Object.values(form).map( (el,i) => form[el.name].value = cliente[el.name] );

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
