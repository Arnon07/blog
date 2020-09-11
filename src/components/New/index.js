import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';

class New extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alert: ''
        }

        this.cadastrar = this.cadastrar.bind(this);

    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/')
            return null;
        }

    }

    cadastrar = async (e) =>{
        e.preventDefault();

        const {titulo, imagem, descricao} = this.state
        if(titulo !== '' && imagem !== '' && descricao !== ''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: titulo,
                image: imagem,
                descricao: descricao,
                autor: localStorage.nome
            });

            this.props.history.push('/dashboard')

        }else{
            this.setState({alert: 'Preencha todos os campos!'})
        }

    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <span>{this.state.alert}</span>
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