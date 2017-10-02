import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Books extends Component {

    render() {
        const {
            id,
            title,
            authors,
            imageLinks,
            onUpdateShelf,
            shelf
        } = this.props


        const shelvesOptions = [
            { value: 'currentlyReading', text: 'Currently Reading' },
            { value: 'wantToRead', text: 'Want to Read' },
            { value: 'read', text: 'Read' },
            { value: 'none', text: 'None' }
        ]

        return (
            <li key={id} className='book'>
                <div className="book-top">
                    <div className='book-cover'
                         style={{width: 150, height: 200, backgroundImage: `url(${imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf}
                            onChange={(event) => onUpdateShelf({id}, event.target.value)}>
                            <option value="" disabled>Moving to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className='book-title'>{title}</div>
                <div className='book-authors'>{authors.join(", ")}</div>
            </li>
        )
    }

}

export default Books