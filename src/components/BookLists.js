import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class BookLists extends Component {

    static propTypes = {
        books: PropTypes.array,
        onUpdateShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, onUpdateShelf} = this.props

        return (
            <ol className="books-grid">
                {
                    books.map((book) => (
                        <Book
                            id = {book.id}
                            title = {book.title}
                            authors = {book.authors}
                            shelf = {book.shelf}
                            imageLinks = {book.imageLinks}
                            onUpdateShelf = {onUpdateShelf}
                        />
                    ))
                }
            </ol>
        )
    }
}

export  default  BookLists