import React, { Component } from 'react'
import axios from 'axios'

export default class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            data: []
        }
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleClick = () => {
        axios.get("http://api.giphy.com/v1/gifs/search?q=" + this.state.search +"&api_key=9Q9MsWs3RkTosk6qfAWA9lvzrrd7e4RL")
        .then(response => {
            this.setState({
                data: response.data.data
            })
            console.log(response.data.data)
        })
    }

    determineDisplay = () => {
        if(this.state.data.length === 0) {
            return null;
        }else {
            return(
                this.state.data.map((element) => {
                    return(<img src={element.images.original.url} alt="animated"></img>)
                })
            )

        }
    }


    render() {
        let display = this.determineDisplay();
        return (

            <div>
                <input id="search" onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Submit</button>
                {display}
            </div>
        )
    }
}
