import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import BookLists from './BookLists'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'


class SearchBooks extends Component {
    state = {
        query: '',
        books: []
    }

    search = (query) => {
        this.setState({query: query.trim() })
        BooksAPI.search(query.trim(), 20).then( (books) =>{
            if(!books || books.error){
                this.setState({books: []})
            } else{
                books.sort(sortBy('title'))
                this.setShelf(books)
                this.setState({books: books})
            }
        })
    }

    setShelf = (results) => {
        for (let result of results){
            for (let book of this.props.books)
                if (result.id === book.id) {
                    result.shelf = book.shelf
                } else {
                    result.shelf = 'none'
                }
        }

    }

    render() {
        const {query, books} = this.state
        const {onUpdateShelf} = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" exact to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               value = {query}
                               onChange={(event) => this.search(event.target.value)}

                        />
                    </div>
                </div>
                {
                    query && (
                        <div className="search-books-results">
                            {
                                (books.length > 1 ) ?  (
                                    <BookLists books={books} onUpdateShelf={onUpdateShelf} />
                                ) : (
                                    <div>No books found.</div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default SearchBooks