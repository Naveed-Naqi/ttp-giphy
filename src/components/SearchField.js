import React, { Component } from 'react'
import axios from 'axios'
import API_KEY from '../keys'
import StylishGifCard from "./StylishGifCard";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

export default class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            data: [],
            allowAdultContent: false
        }
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    handleClick = () => {

        let rating = this.state.allowAdultContent === true ? "r" : "g";

        axios.get("http://api.giphy.com/v1/gifs/search?q=" + this.state.search + "&api_key=" + API_KEY + "&rating=" + rating)
        .then(response => {
            this.setState({
                data: response.data.data
            })
            console.log(response.data.data)
        })
    }

    determineDisplay = () => {
        if(this.state.data.length === 0) {
            return <h1>No Results Found</h1>;
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

    handleCheckBox = () => {
        this.setState({
            allowAdultContent: !this.state.allowAdultContent
        }, () => {
            this.handleClick();
        });
      };


    render() {
        let display = this.determineDisplay();
        return (

            <div>
                <h1>Search for a gif</h1>
                <input id="search" onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Submit</button>

                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.allowAdultContent}
                        onChange={this.handleCheckBox}
                        value="allowAdultContent"
                        color="primary"
                    />
                    }
                    label="Allow Adult Content"
                />

                <div>
                    {display}
                </div>
            </div>
        )
    }
}
