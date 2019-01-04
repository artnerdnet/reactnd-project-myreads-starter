import React from 'react'
import Book from './Book'
import * as BooksAPI from '.././BooksAPI'

class SearchPage extends React.Component {
  state={
    query: '',
    results: []
  };

  // Use of destructuring the params. Also use of callback function on setState.
  updateQuery = ({target: {value: query}}) => this.setState({query}, () => this.getResults());

  getResults = () =>  {
    const {query} = this.state;
    if (query) {
      /* There is some issue with how this BooksAPI does its search.
         It find some things obvious but if I search for a result I just saw
         it can't find it. Since you don't control the search method I'm not
         sure what else to do for that at the moment.
         This will ensure it won't break your app when it returns a weird error.
         An error like no books or authors with the letter 'o'. Which isn't true.
      */
      BooksAPI
        .search(query)
        .then(results => {
          // Uncomment this to see what it looks like when it breaks
          // Let me know if you aren't familiar with dev tools in your browser.
          // console.log(results);
          if (results.error) {
            return this.setState({results: []});
          }
          this.setState({results})
        })
    } else {
      this.setState({results: [], query: ''});
    }
  };

  render() {
    return (
      <div className='search-books'>
        {/* <Searchbar /> */}
        {/* Look up BEM, (block, element, modifier)  http://getbem.com/naming/
          its a way to help keep your classNames details and separate so you can
          just look at it and know what, where, and why
        */}
        <div className='search-books-bar'>
          <div className="search-books-input-wrapper">
            <input
              name="query"
              type="text"
              placeholder='Search for books by title or author'
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.results.map(result => (
            <li key={result.id}>
              <Book
               book={result}
              />
            </li>
          ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
