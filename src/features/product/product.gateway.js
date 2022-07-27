import { gql } from '@apollo/client';
import { client } from '../../client';

export const fetchProductById = async id => {
  const response = await client.query({
    query: gql`
      query {
        product(id: "${id}"){
          id
          name
          inStock
          gallery
          description
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
    `,
  });

  return response.data;
};
