import React, { Component } from 'react'
import axios from 'axios'

export default class GifCard extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            data: []
        }
    }

    componentDidMount = () => {
        axios.get("http://api.giphy.com/v1/gifs/trending?api_key=9Q9MsWs3RkTosk6qfAWA9lvzrrd7e4RL")
        .then(response => {
            console.log(response.data)
            this.setState({
                data: response.data 
            }) 
            
        })
        
    }

    determineDisplay = () => {
        if(this.state.data.length === 0) {
            return null;
        }else {
            this.state.data.data.map( (element) => {
            console.log(element)
            return(<p>{element.url}</p>) 
            }
            )}
        }


    render() {
        let display = this.determineDisplay();
        return (
            <div>
                {display}
            </div>
        )
    }
}
