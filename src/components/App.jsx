import React from 'react'
import { ButtonGroup, Button, Container, Row, Col, Modal, ModalHeader,ModalBody, ModalFooter, Input } from 'reactstrap'

import CardIdeia from './Ideas/Card'

const INITIAL_STATE = {
    ideias: [],
    estadoModalAdicionarIdeia : false,
    tituloDaIdeia: '',
    descricaoDaIdeia: '',
    cor: 'primary',
    estadoModalEditarIdeia: false,
    i: 0
}

const btnList = [ "primary", "secondary", "success", "info", "warning", "danger", "light", "dark" ]

const LOCAL_STORAGE_APP_KEY = 'laksjdkasdjanosidhasuidayhsdnuasdhyauds'

export default class App extends React.Component {

    constructor(props){
        super(props)
        this.state = INITIAL_STATE

        this.salvarIdeiaEditada = this.salvarIdeiaEditada.bind(this)
    }

    componentDidMount(){
        this.carregaIdeiasDoLocalStorage()
    }

    salvarIdeiasNoLocalStorage(){
        let ideias = this.state.ideias
        let titulo = this.state.tituloDaIdeia
        let descricao = this.state.descricaoDaIdeia
        let cor = this.state.cor

        ideias.push( { titulo, descricao, cor } )

        this.salvaListaNoStorageEAtualiza(ideias)

        this.alternaEstadoModalAdicionarTarefa()
        this.setState({
            ...this,
            tituloDaIdeia: '',
            descricaoDaIdeia: ''
        })
    }

    carregaIdeiasDoLocalStorage(){
        let ideias = window.localStorage.getItem(LOCAL_STORAGE_APP_KEY)

        if(!ideias){
            ideias = []
        }else{
            ideias = JSON.parse(ideias)
        }
        this.setState({
            ...this,
            ideias: ideias
        })
    }
    removerIdeia(index){
        let ideias = this.state.ideias
        let temp = []

        for(let x = 0; x < ideias.length; x++){
            if(x != index){
                temp.push(ideias[x])
            }
        }
        this.setState({
            ...this,
            ideias: temp
        })

        this.salvaListaNoStorageEAtualiza(temp)
        
    }

    alternaEstadoModalAdicionarTarefa(){
        this.setState({
            estadoModalAdicionarIdeia: !this.state.estadoModalAdicionarIdeia
        })
    }

    salvaListaNoStorageEAtualiza(lista){
        window.localStorage.setItem(LOCAL_STORAGE_APP_KEY,JSON.stringify(lista))
        this.carregaIdeiasDoLocalStorage()
    }

    abrirModalEditarIdeia(index){
        let ideia = this.state.ideias[index]
        this.setState({
            ...this,
            tituloDaIdeia: ideia.titulo,
            descricaoDaIdeia: ideia.descricao,
            cor: ideia.cor,
            estadoModalEditarIdeia: true,
            i: index
        })
    }

    salvarIdeiaEditada(){
        let ideias = this.state.ideias
        let i = this.state.i
        let ideia = ideias[i]
        ideia.titulo = this.state.tituloDaIdeia
        ideia.descricao = this.state.descricaoDaIdeia
        ideia.cor = this.state.cor
        ideias[i] = ideia

        this.salvaListaNoStorageEAtualiza(ideias)

        this.setState({
            ...this,
            tituloDaIdeia: '',
            descricaoDaIdeia: '',
            cor: '',
            estadoModalEditarIdeia: false,
            i: 0
        })

    }


    render(){
        return <Container className="py-5">
            <Row>
                <Col col={12}>
                    <h1 className="text-center">
                        Idea Board
                    </h1>
                </Col>
            </Row>
                
            <Row>
                <Col col={12}>
                    <Button onClick={this.alternaEstadoModalAdicionarTarefa.bind(this)} color="primary">
                        Nova Ideia
                    </Button>
                </Col>
            </Row>


            <Row>
                <CardIdeia
                    ideias={this.state.ideias}
                    editar={this.abrirModalEditarIdeia.bind(this)}
                    remover={this.removerIdeia.bind(this)}
                />
            </Row>

            <Modal isOpen={this.state.estadoModalAdicionarIdeia}>
                <ModalBody>
                    <h3 className="text-center">
                        Qual seria esta nova ideia?
                    </h3>
                    <hr/>

                    <p className="py-2">
                        Defina uma cor
                    </p>

                    <ButtonGroup className="mb-3">
                       
                    {
                        btnList.map( (btn, index) => <Button key={index}
                        color={btn}
                        className="p-3"
                        onClick={()=>{
                            this.setState({
                                ...this,
                                cor: btn
                            })
                        }}
                        ></Button>)
                    }
                    
                    </ButtonGroup>

                    <Input
                        placeholder="Título"
                        value={this.state.tituloDaIdeia}
                        onChange={ evt =>{
                            this.setState({
                                ...this,
                                tituloDaIdeia: evt.target.value
                            })
                        } }
                    />
                    <div className="my-2"></div>
                    <Input
                        placeholder="Descrição"
                        value={this.state.descricaoDaIdeia}
                        onChange={ evt =>{
                            this.setState({
                                ...this,
                                descricaoDaIdeia: evt.target.value
                            })
                        } }
                    />
                    
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={this.salvarIdeiasNoLocalStorage.bind(this)}
                        disabled={
                            this.state.tituloDaIdeia.length < 4
                            ||
                            this.state.descricaoDaIdeia.length < 5
                         }
                        color="success">
                        Salvar
                    </Button>
                    <Button
                        onClick={() =>{
                            this.setState({
                                estadoModalAdicionarIdeia: false
                            })
                        }}
                        color="danger">
                            Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.estadoModalEditarIdeia}>
                <ModalHeader>
                <Input
                    placeholder="Descrição"
                    value={this.state.tituloDaIdeia}
                    onChange={ evt =>{
                        this.setState({
                            ...this,
                            tituloDaIdeia: evt.target.value
                        })
                    } }
                />
                </ModalHeader>
                <ModalBody>
                <ButtonGroup className="mb-3">
                    
                    {
                        btnList.map( (btn, index) => <Button key={ index }
                        color={ btn }
                        className="p-3"
                        onClick={()=>{
                            this.setState({
                                ...this,
                                cor: btn
                            })
                        }}
                        ></Button>)
                    }
                    
                </ButtonGroup>
                <Input
                    placeholder="Descrição"
                    value={this.state.descricaoDaIdeia}
                    onChange={ evt =>{
                        this.setState({
                            ...this,
                            descricaoDaIdeia: evt.target.value
                        })
                    } }
                    />
                </ModalBody>
                <ModalFooter>
                <Button
                    onClick={this.salvarIdeiaEditada }
                    disabled={
                        this.state.tituloDaIdeia.length < 4
                        ||
                        this.state.descricaoDaIdeia.length < 5
                        }
                    color="success">
                        Salvar
                    </Button>
                    <Button
                        onClick={() =>{
                            this.setState({
                                tituloDaIdeia: '',
                                descricaoDaIdeia: '',
                                cor: '',
                                estadoModalEditarIdeia: false,
                                i: 0
                            })
                        }}
                        color="danger">
                            Cancelar
                    </Button>
                </ModalFooter>

            </Modal>
        </Container>
    }
}