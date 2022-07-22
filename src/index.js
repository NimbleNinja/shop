import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.scss';
import { client } from './client';
import { gql } from '@apollo/client';

const container = document.getElementById('root');
const root = createRoot(container);

//client
//  .query({
//    query: gql`
//      query {
//        categories {
//          name
//          products {
//            id
//            name
//            category
//            prices {
//              currency {
//                label
//                symbol
//              }
//              amount
//            }
//          }
//        }
//      }
//    `,
//  })
//  .then(result => console.log(result.data.categories));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
