import {Card,Button, Label,Icon, ButtonGroup } from 'semantic-ui-react';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

export default class JobList extends Component {
    
    constructor(props) {
        super(props)
        this.state={
            jid:'null'
        }
    
    }

  render() {
     return (       
            <Card.Group> 
              {this.props.loadJobs.slice(this.props.indexOfFirstPost,this.props.indexOfLastPost).map(card => (
                <Card key={card.id} style={{display:'inline-table'}}> 

                    <Card.Content> 
                    <div style={{
                        marginBottom:120                
                         }}>                   
                    <Card.Header>{card.title}</Card.Header>                    
                    <Label color='black' ribbon='right'>
                     <Icon name='user'/> 0
                     </Label>    
                    <Card.Meta>{card.location.city},{card.location.country}</Card.Meta>
                    <Card.Description>{card.summary}</Card.Description>
                    </div>
                    </Card.Content>  

                    <Card.Content style={{
                        display:'flex'  ,
                        justifyItems:'center' ,                        
                        alignItems : 'center'             
                         }}>
                    
                    <div style={{
                        display:'flex'  ,
                        flexDirection:'row'                        
                        }}>
                    <div style={{
                        display:'flex'  ,
                        alignItems:'center',
                        marginRight:'35px'                        
                        }}>
                    <Button style={{display:'flex'}} color='red' size='mini'>
                            Expired
                    </Button>                                          
                    </div>
                    <div style={{
                        display:'flex' ,
                        flexDirection:'row'
                        }}>
                    <ButtonGroup basic color='blue' size='mini' >
                        <div style={{
                        display:'flex',
                        justifyContent:'center'
                        }}>
        
                <Link to={{pathname:`/CloseJob/`,
                    state:{params :{id : card.id}}
                  }}>  
                        
                    <Button style={{display:'flex'}}>
                    <Icon name='ban'/>
                        Close 
                    </Button>  
                </Link>

                <Link to={`/EditJob/${card.id}`}>                        
                    <Button style={{display:'flex'}}>  
                    <Icon name='edit outline'/>
                        Edit                        
                    </Button>  
                </Link> 

                    <Button style={{display:'flex'}}>
                    <Icon name='copy outline'/>
                        Copy
                    </Button>

                    </div>
                    </ButtonGroup>
                    </div>
                </div> 
                
                </Card.Content>
                </Card>                
                ))}            
            </Card.Group>      
     
    )
  }
}

JobList.propTypes={
    LoadJobs : PropTypes.array,
    indexOfFirstPost : PropTypes.number,
    indexOfLastPost : PropTypes.number
}
