import React from 'react'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './components/SearchBooks'
import CategorizedBooks from "./components/CategorizedBooks"
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
        BooksAPI.update(book, shelf).then(() => {
            this.getBooks()
        });
    }

    render() {
        const {books} = this.state

        return (
          <div className="app">
            <Route exact path="/" render={()=> (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <CategorizedBooks books={books} onUpdateShelf={this.updateShelf} />

                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}/>

            <Route path="/search" render={ history => (
                <SearchBooks  books={books} onUpdateShelf={this.updateShelf} />
            )}/>

          </div>
        )
      }
}

export default BooksApp
