import React from 'react'
import {Col} from 'reactstrap'

export default props => {
    return <Col xs={12}>
            {
                props.ideias.map( (ideia, index) => <p>
                    {
                        ideia.titulo
                    }
                </p> )
            }
        </Col>
} 