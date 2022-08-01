import { gql } from '@apollo/client';
import { client } from '../../client';

export const initFetch = async () => {
  const response = await client.query({
    query: gql`
      query {
        categories {
          name
        }
        currencies {
          label
          symbol
        }
      }
    `,
  });

  return response.data;
};

export const fetchProductsByCategory = async category => {
  const response = await client.query({
    query: gql`
      query{
        category(input: {title: "${category}"}){
          name
          products{
            id
            name
            inStock
            gallery
            description
            category
            attributes{
              id
              name
              type
              items{
                displayValue
                value
                id
              }
            }
            prices{
              currency{
                label
                symbol
              }
              amount
            }
            brand
          }
        }
      }
    `,
  });
  return response;
};
