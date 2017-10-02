import React from 'react'
import './App.css'
import BookLists from './components/BookLists'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './components/SearchBooks'
import {Route, Link} from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        books: []
    }

    componentDidMount() {
        this.getBooks()
    }

    getBooks = () => {
        BooksAPI.getAll().then(books => {
            this.setState({
                books
            })
        });
    }

    updateShelf = (book, shelf) => {
        debugger
        BooksAPI.update(book, shelf).then(() => {
            this.getBooks()
        });
    }

    showBooksByShelf = (books, shelf) => books.filter(book => book.shelf === shelf)

    render() {
        const {books} = this.state
        const shelves = ["wantToRead", "currentlyReading", "read"]

        return (
          <div className="app">
            <Route exact path="/" render={()=> (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <BookLists books={this.showBooksByShelf(books, 'currentlyReading')} onUpdateShelf={this.updateShelf}/>
                        </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <BookLists books={this.showBooksByShelf(books, 'wantToRead')} onUpdateShelf={this.updateShelf}/>
                        </div>
                    </div>

                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <BookLists books={this.showBooksByShelf(books, 'read')} onUpdateShelf={this.updateShelf}/>
                        </div>
                    </div>

                </div>


                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}/>

            <Route path="/search" render={({ history })=> (
                <SearchBooks  books={books} onUpdateShelf={this.updateShelf}/>
            )}/>

          </div>
        )
      }
}

export default BooksApp
