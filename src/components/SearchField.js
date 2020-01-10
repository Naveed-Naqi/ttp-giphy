import React, { Component } from 'react'
import axios from 'axios'
import API_KEY from '../keys'
import StylishGifCard from "./StylishGifCard";

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
        axios.get("http://api.giphy.com/v1/gifs/search?q=" + this.state.search + "&api_key=" + API_KEY)
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
                    return(
                        <StylishGifCard
                            url = {element.images.original.url}
                            title = {element.title}
                            key = {element.id}
                        ></StylishGifCard>
                    )
                })
            )

        }
    }


    render() {
        let display = this.determineDisplay();
        return (

            <div>
                <h1>Search Results</h1>
                <input id="search" onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Submit</button>
                
                <div>
                    {display}
                </div>
            </div>
        )
    }
}
