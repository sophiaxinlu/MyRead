import React, {Component} from 'react'
import BookLists from './BookLists'
import {shelvesOptions} from '../utils/Constants'
import PropTypes from 'prop-types'


class CategorizedBooks extends Component {

    static propTypes = {
        books: PropTypes.array,
        onUpdateShelf: PropTypes.func.isRequired
    }

    showBooksByShelf = (books, shelf) => books.filter(book => book.shelf === shelf)

    render() {
        const { books, onUpdateShelf} = this.props
        return (
            <div className="list-books-content">
                {shelvesOptions.map((shelf) =>
                    (shelf.value !== 'none') && (
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">{shelf.text}</h2>
                            <div className="bookshelf-books">
                                <BookLists books={this.showBooksByShelf(books, shelf.value)} onUpdateShelf={onUpdateShelf}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export  default  CategorizedBooks