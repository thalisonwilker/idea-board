import React from 'react'
import { Button, Container, Row, Col, Modal,ModalBody, ModalFooter, Input } from 'reactstrap'

export default class App extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            estadoModalAdicionarIdeia : false,
            tituloDaIdeia: '',
            descricaoDaIdeia: ''
        }
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

            <Modal isOpen={this.state.estadoModalAdicionarIdeia}>
                <ModalBody>
                    <h3 className="text-center">
                        Qual seria esta nova ideia?
                    </h3>
                    <hr/>
                    <Input
                        value={this.state.descricaoDaIdeia}
                        onChange={ evt =>{
                            this.setState({
                                
                            })
                        } }
                    />
                </ModalBody>
                <ModalFooter>
                    <Button>
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