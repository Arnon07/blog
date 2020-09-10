import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './new.css';

class New extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: ''
        }

        this.cadastrar = this.cadastrar.bind(this);

    }

    cadastrar(){

    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <label>Titulo:</label> <br/>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                    onChange={(e) => this.setState({titulo: e.target.value})}/> <br/>

                    <label>URL da Imagem:</label> <br/>
                    <input type="text" placeholder="URL da capa" value={this.state.imagem}
                    onChange={(e) => this.setState({imagem: e.target.value})}/> <br/>

                    <label>Descrição:</label> <br/>
                    <textarea type="text" placeholder="Descrição do post" value={this.state.descricao}
                    onChange={(e) => this.setState({descricao: e.target.value})}/> <br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(New);