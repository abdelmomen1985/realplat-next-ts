import { gql } from '@apollo/client';
export const allDevelopers = gql`
  query Developers {
    developers(limit: 50) {
      id
      description
      media
      name
      slug_en
      compounds {
        name
        id
      }
    }
  }
`;
export const GET_DEVELOPER_BY_PK = gql`
  query developers_by_pk ($id: uuid!){
    developers_by_pk(id: $id) {
      id
      name
      media
      description
      compounds {
        id
        name
        media
        description
      }
    }
  }
`;