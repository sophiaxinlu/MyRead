import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Books extends Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        authors: PropTypes.array,
        onUpdateShelf: PropTypes.func.isRequired
    }

    static  defaultProps = {
        authors: [],
        imageLinks: { smallThumbnail: ''},
        shelf: 'none'
    }

    render() {
        const {
            id,
            title,
            authors,
            imageLinks,
            onUpdateShelf,
            shelf
        } = this.props

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