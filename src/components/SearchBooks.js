import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import BookLists from './BookLists'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'


class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array,
        onUpdateShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        foundBooks: [],
        error: 'Find your books by typing book and author in the input box.'
    }

    search = (query) => {
        this.setState({query: query.trim(), foundBooks: []})

        if(!query) {
            this.setState({ foundBooks: [], error: 'Find your books by typing book and author in the input box.' });
        } else {
            BooksAPI.search(query.trim(), 20).then( (foundBooks) =>{
                if(!foundBooks || foundBooks.error || foundBooks.length < 1){
                    this.setState({foundBooks: [], error: 'No books found.'})
                } else{
                    foundBooks.sort(sortBy('title'))
                    this.setState({foundBooks, error: ''})
                }
            })
        }
    }

    setShelf = (categorizedBooks, noncategorizedBooks) => {
        const shelfObj = categorizedBooks.reduce((accumulat, book) => ({ ...accumulat, [book.id]: book.shelf }), {});
        return noncategorizedBooks.map(book => ({ ...book, shelf: shelfObj[book.id] }));
    }

    render() {
        const {query, foundBooks, error} = this.state
        const {books, onUpdateShelf} = this.props

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
                <div className="search-books-results">
                    {
                        (error !== '') && (
                            <div>{error}</div>
                        )
                    }
                    <BookLists books={this.setShelf(books, foundBooks)} onUpdateShelf={onUpdateShelf} />
                </div>
            </div>
        )
    }
}

export default SearchBooks