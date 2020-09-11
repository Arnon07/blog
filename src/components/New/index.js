import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';

class New extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }

        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/')
            return null;
        }

    }

    handleFile = async (e) =>{
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({imagem: image});
                this.handleUpload();
            }else{
                alert('Selecione uma imagem do tipo PNG ou JPG');
                this.setState({imagem: null});
                return null;
            }
        }
    }

    handleUpload = async ()=>{
        const {imagem} = this.state;
        const currentUid = firebase.getCurrentUid();

        const uploadTaks = firebase.storage
        .ref(`images/${currentUid}/${imagem.name}`)
        .put(imagem);

        await uploadTaks.on('state_changed', 
        (snapshot)=>{
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({progress})
        },
        (error) =>{
            console.log('Error de imagem' + error);
        },
        ()=>{
            firebase.storage.ref(`images/${currentUid}`)
            .child(imagem.name).getDownloadURL()
            .then(url=>{
                this.setState({url: url})
            })
        })
    }

    cadastrar = async (e) =>{
        e.preventDefault();

        const {titulo, imagem, descricao, url} = this.state
        if(titulo !== '' && 
            imagem !== '' && 
            descricao !== '' &&
            imagem !== null &&
            url !== ''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: titulo,
                image: url,
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
                    <span>{this.state.alert}</span> <br/>

                    <input type="file" 
                    onChange={this.handleFile}/> <br/>
                    {
                        this.state.url !== '' ?
                        <img src={this.state.url} width="250" height="150" alt="Capa do post"/>
                        :
                        <progress value={this.state.progress} max="100"/>
                    }

                    <label>Titulo:</label> <br/>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus
                    onChange={(e) => this.setState({titulo: e.target.value})}/> <br/>

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