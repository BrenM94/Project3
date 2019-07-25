import React, { Component } from 'react';
import AddPremioForm from './AddPremioForm';
import { Container, Header, Segment, Feed, Icon, Divider, Button, Checkbox, Popup } from "semantic-ui-react";


export default class AdminUsuarios extends Component {
    constructor (props){
        super(props);
        this.state={
            premios: [],
            premioAEditar: {}
        }
        this.loadPremios()
        this.onEditar()
    }

    loadPremios = () => {
        fetch('/api/premios')
        .then (res => res.json())
        .then (data => this.setState({premios: data}))
    }

    onEditar = (premio) => {
        this.setState({ premioAEditar: premio })
    }

    // onDesactivarPremio = (id) => {
    //     fetch(`api/premios/${id}`, {
    //        method: 'PATCH',
    //        body: JSON.stringify({ active: 0 })
    //     })
    //     .then (res => res.json())
    //     .then (data => this.loadPremios())
    // }

    // onDeletePremio = (id) => {
    //     console.log('id utilizado en el delete premio:', id)
    //     fetch(`/api/premios/${id}`, {
    //         method: 'DELETE'
    //     })
    //     .then (res => res.json()) 
    //     .then (data => this.loadPremios())
    // }
     
    render() {
        return (
        <Container fluid={true} className='containerAll'>  
            <Header inverted as='h2' block>
                Administrar Premios
            </Header> 
{/* Formulario Premios */}
            <Segment raised >
                <AddPremioForm premio={this.state.premioAEditar} onAddPremio={this.loadPremios}/>
            </Segment>
            <Segment raised >
{/* Listado de premios donde se pueden activar/desactivar y editar */}
                <Feed>
                    <Header as='h3' textAlign='center'>
                        Listado de Premios
                    </Header>
                <Divider/>
                    {this.state.premios.map(premio => 
                    <Feed.Event>
                        <Feed.Label>
{/* Botton editar premio */}
                            <Button animated circular inverted color='grey'
                                onClick={ () => this.onEditar(premio) } 
                            >
                                <Button.Content hidden>Editar</Button.Content>
                                <Button.Content visible>
                                    <Icon name='gift'  color='teal'/>
                                </Button.Content>
                            </Button>
                        </Feed.Label>
                        <Feed.Content className>
                            <Feed.Summary>
                                <span className='listadoPremio1'>{premio.nombre} tiene un coste de {premio.puntos} puntos. </span>
                            </Feed.Summary>
                            <Feed.Summary className='spaceBetween'>
                                <span className='listadoPremio2'>Detalles adicionales: {premio.descripcion}</span>
{/* Toggle Activo/noActivo */}
                                <Popup 
                                    trigger={<Checkbox toggle
                                    value= {premio.activo}
                                    defaultChecked={1}
                                    // onClick= {() => this.onPremioActivo(premio.id)}
                                    />}
                                    content='Toggle a la izquierda para desactivar premio y a la derecha para activarlo nuevamente.'
                                    basic inverted
                                />
{/* Boton de DELETE */}
                                {/* <Button floated='right' animated circular inverted color='black'
                                     onClick={()=> this.onDeletePremio(premio.id)}
                                >
                                    <Button.Content hidden>Delete</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='trash' inverted color='black'/>
                                    </Button.Content>
                                </Button>  */}
                            </Feed.Summary>
                        </Feed.Content>
                    </Feed.Event>)}
                </Feed>
            </Segment>
        </Container>
        )
    }
}
