import React from 'react'
import { Button, Container, Row, Col, Modal,ModalBody, ModalFooter, Input } from 'reactstrap'

import CardIdeia from './Ideas/Card'

export default class App extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            ideias: [],
            estadoModalAdicionarIdeia : false,
            tituloDaIdeia: '',
            descricaoDaIdeia: ''
        }
    }

    componentDidMount(){
        let ideias = this.carregaIdeiasDoLocalStorage()
        
    }

    salvaIdeia(){

        let ideias = this.carregaIdeiasDoLocalStorage()

        console.log(ideias)

        this.salvarIdeiasNoLocalStorage()
        

    }

    salvarIdeiasNoLocalStorage(){
        let ideias = this.state.ideias
        let titulo = this.state.tituloDaIdeia
        let descricao = this.state.descricaoDaIdeia

        ideias.push({
            "titulo": titulo,
            "descricao": descricao,
        })

        window.localStorage.setItem("app_ideas_board",JSON.stringify(ideias))
        this.carregaIdeiasDoLocalStorage()
        this.alternaEstadoModalAdicionarTarefa()
    }

    carregaIdeiasDoLocalStorage(){
        let ideias = window.localStorage.getItem('app_ideas_board')

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

    alternaEstadoModalAdicionarTarefa(){
        this.setState({
            estadoModalAdicionarIdeia: !this.state.estadoModalAdicionarIdeia
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
                <CardIdeia ideias={this.state.ideias} />
            </Row>

                

            <Modal isOpen={this.state.estadoModalAdicionarIdeia}>
                <ModalBody>
                    <h3 className="text-center">
                        Qual seria esta nova ideia?
                    </h3>
                    <hr/>
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
                        onClick={this.salvaIdeia.bind(this)}
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
        </Container>
    }
}