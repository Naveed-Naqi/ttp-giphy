import React, { Component } from 'react'
import axios from 'axios';
import API_KEY from "./keys";
import StylishGifCard from "./components/StylishGifCard";
import "./App.css";
import SearchField from './components/SearchField';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gifs: []
        };
    }

    componentDidMount() {
        axios.get("http://api.giphy.com/v1/gifs/trending?api_key=" + API_KEY)
        .then(response => {
            this.setState({
                gifs: response.data.data
            })
        })
    }

    determineDisplay = () => {
        if(this.state.gifs.length === 0) {
            return (
                <h1>LOADING</h1>
            );
        }else {
            return (
                this.state.gifs.map( (element) => {
                    return(
                            <StylishGifCard
                                url = {element.images.original.url}
                                title = {element.title}
                                key = {element.id}
                            ></StylishGifCard>
                        ); 
                    })
            );
        }

    }


    render() {
        let display = this.determineDisplay();
        return (
            <div className="App">
                <SearchField></SearchField>
                <h1>TRENDING GIFS</h1>
                {display}
            </div>
        )
    }
}
