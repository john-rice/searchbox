import React, { useState } from 'react';

import {
  SearchBox,
  SearchBase,
  SearchComponent
} from '@appbaseio/react-searchbox';
import ReactPaginate from 'react-paginate';

import './styles.css';

const App = () => {
  const [queryVal, setQueryVal] = useState('');

  const _setQueryVal = val => {
    setQueryVal(val);
  };
  return (
    <SearchBase
      index="good-books-ds"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      appbaseConfig={{
        recordAnalytics: true,
        enableQueryRules: true,
        userId: 'jon@appbase.io',
        customEvents: {
          platform: 'ios',
          device: 'iphoneX'
        }
      }}
    >
      <div>
        <h2>
          React Searchbox Demo{' '}
          <span style={{ fontSize: '1rem' }}>
            <a
              href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API reference
            </a>
          </span>
        </h2>

        <SearchBox
          id="search-component"
          dataField={[
            {
              field: 'original_title',
              weight: 1
            },
            {
              field: 'original_title.search',
              weight: 3
            }
          ]}
          title="Search"
          placeholder="Search for Books"
          transformRequest={request => {
            const suggestedWordsList = [];
            let reqBody = JSON.parse(request.body);
            let getSearchComponentQueryIndex = 0;
            reqBody.query.forEach((item, index) => {
              if (item.id === 'search-component') {
                getSearchComponentQueryIndex = index;
              }
            });
            let queryWord = reqBody.query[getSearchComponentQueryIndex].value;
            let url =
              'https://api.datamuse.com/words?sp=' +
              reqBody.query[getSearchComponentQueryIndex].value +
              '&max=2';
            return (
              fetch(url)
                .then(res => res.json())
                .then(data => {
                  if (data && data.length > 0) {
                    suggestedWordsList.push(data[0].word);
                    queryWord = suggestedWordsList[0];
                  }
                  if (suggestedWordsList.length) {
                    reqBody.query[getSearchComponentQueryIndex].value =
                      suggestedWordsList[0];
                  }
                  let newRequest = {
                    ...request,
                    body: JSON.stringify(reqBody)
                  };

                  return Promise.resolve(newRequest);
                })
                .catch(err => window.console.error(err))
                // eslint-disable-next-line
                .finally(() => {
                  _setQueryVal(queryWord);
                  if (!suggestedWordsList.length) {
                    return Promise.resolve(request);
                  }
                })
            );
          }}
        />
        {queryVal && (
          <div className="row">
            Showing results for&nbsp; <b>{queryVal}</b>
          </div>
        )}
        <div className="row">
          <div>
            <SearchComponent
              id="result-component"
              highlight
              dataField="original_title"
              size={10}
              react={{
                and: ['search-component']
              }}
            >
              {({ results, loading, size, setValue, setFrom }) => {
                return (
                  <div className="result-list-container">
                    {loading ? (
                      <div>Loading Results ...</div>
                    ) : (
                      <div>
                        {!results.data.length ? (
                          <div>No results found</div>
                        ) : (
                          <p>
                            {results.numberOfResults} results found in{' '}
                            {results.time}ms
                          </p>
                        )}
                        {results.data.map(item => (
                          <div
                            className="flex book-content text-left"
                            key={item._id}
                          >
                            <img
                              src={item.image}
                              alt="Book Cover"
                              className="book-image"
                            />
                            <div
                              className="flex column justify-center"
                              style={{ marginLeft: 20 }}
                            >
                              <div
                                className="book-header"
                                dangerouslySetInnerHTML={{
                                  __html: item.original_title
                                }}
                              />
                              <div className="flex column justify-space-between">
                                <div>
                                  <div>
                                    by{' '}
                                    <span className="authors-list">
                                      {item.authors}
                                    </span>
                                  </div>
                                  <div className="ratings-list flex align-center">
                                    <span className="stars">
                                      {Array(item.average_rating_rounded)
                                        .fill('x')
                                        .map((i, index) => (
                                          <i
                                            className="fas fa-star"
                                            key={item._id + `_${index}`}
                                          />
                                        )) // eslint-disable-line
                                      }
                                    </span>
                                    <span className="avg-rating">
                                      ({item.average_rating} avg)
                                    </span>
                                  </div>
                                </div>
                                <span className="pub-year">
                                  Pub {item.original_publication_year}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <ReactPaginate
                      pageCount={Math.floor(results.numberOfResults / size)}
                      onPageChange={({ selected }) =>
                        setFrom((selected + 1) * size)
                      }
                      previousLabel="previous"
                      nextLabel="next"
                      breakLabel="..."
                      breakClassName="break-me"
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      subContainerClassName="pages pagination"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      activeClassName="active"
                    />
                  </div>
                );
              }}
            </SearchComponent>
          </div>
        </div>
      </div>
    </SearchBase>
  );
};

export default App;