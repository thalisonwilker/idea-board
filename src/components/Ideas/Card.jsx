import React from 'react'
import { Button,Col, Card, CardHeader,CardBody, CardFooter} from 'reactstrap'

export default props => {
    return props.ideias.map( (ideia, index) =><Col
        key={index}
        className="mt-3"
        xs={12}
        md={4}
        lg={4}>
            
            <Card
                color={ideia.cor}
                className={ ideia.cor == "light" ? "text-dark" : "text-white" }>
                    
                <CardHeader>
                    { ideia.titulo }
                </CardHeader>
                <CardBody>
                    <p className="lead">
                        { ideia.descricao }
                    </p>
                </CardBody>
                <CardFooter>
                    <Button size="sm">
                        Editar
                    </Button>
                    <Button
                        onClick={()=>{
                            props.remover(index)
                        }}
                        size="sm"
                        className="ml-2">
                        Excluir
                    </Button>
                </CardFooter>
            </Card>
        </Col> )
} 