import React from 'react'
import {Col, Card, CardHeader,CardBody, CardFooter} from 'reactstrap'

export default props => {
    return props.ideias.map( (ideia, index) =><Col className="mt-3" xs={12} md={4} lg={4}>
            <Card key={index}>
                <CardHeader>
                    { ideia.titulo }
                </CardHeader>
                <CardBody>
                    <p className="lead">
                        { ideia.descricao }
                    </p>
                </CardBody>
            </Card>
        </Col> )
} 