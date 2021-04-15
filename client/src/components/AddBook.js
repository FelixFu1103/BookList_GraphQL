import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'



class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            genre: "",
            authorId: "",
            error: false
         }
    }
    
    displayAuthors() {
        var data = this.props.getAuthorsQuery
        if (data.loading) {
            return (<option disabled>Loading Authors...</option>)
        } else {
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{author.name}</option>)
            })
        }
    }

    submitForm(e) {
        e.preventDefault()
        // all info are filled 
        const {name, genre, authorId} = this.state;
        if (!name && !genre && !authorId) {
            this.setState({
                error: true
            })
        } else {
            this.props.addBookMutation({
                variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                },
                refetchQueries: [{query: getBooksQuery}]
            })
            this.setState({
                name: "",
                genre: "",
                authorId: "",
                error: false
            });
        }

    }
    render() { 
        console.log("error: ", this.state.error)
        return ( 
            <>
                <div id="error">
                    {this.state.error ? 
                        <p>Book information is missing</p>
                    : ""}
                </div>
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" 
                           onChange={(e) => this.setState({name: e.target.value})}
                           value={this.state.name}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" 
                           onChange={(e) => this.setState({genre: e.target.value})}
                           value={this.state.genre}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => this.setState({authorId: e.target.value})}
                            value={this.state.authorId}>
                        <option>Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
            </>
        );
    }
}
 
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
