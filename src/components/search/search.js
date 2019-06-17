import React, { Component } from 'react';
import axios from 'axios';
import ImageResults from '../image-results/image-results';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const corsURL = `https://cors-anywhere.herokuapp.com/`;
const API_key = process.env.REACT_APP_PIXABAY_API_KEY;
const API_URL = `${ corsURL }https://pixabay.com/api/?key=${ API_key }`;


export default class Search extends Component {

    state = {
        searchTerm: '',
        amount: 10,
        images: []
    };

    onTextInput = async e => {
        const val = e.target.value;
        if(val === '') {
            this.setState({ images: [] });
        } else {
            try {
                this.setState({ [e.target.name]: val });
                let res = await axios.get(`${ API_URL }&q=${ this.state.searchTerm }&image_type=photo&per_page=${ this.state.amount }`);
                // console.log(res.data);
                this.setState({ images: res.data.hits });
            } catch (e) {
                console.log(e);
            }
        }
    };

    onAmountChange = (e, index, value) => this.setState({ amount: value });

    render() {

        // console.log(this.state.images);

        return (
            <div>
                <TextField
                    name="searchTerm"
                    value={ this.state.searchTerm }
                    floatingLabelText="search for images"
                    fullWidth={ true }
                    onChange={ this.onTextInput }>
                </TextField>
                <br />
                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={ this.state.amount }
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                { this.state.images.length > 0 ? (<ImageResults images={ this.state.images } />) : null }

            </div>
        )
    }
};
