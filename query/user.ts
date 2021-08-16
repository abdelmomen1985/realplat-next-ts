import { gql } from '@apollo/client';

import { UNIT_FIELDS } from './unitsQuery';
export const USER_FIELDS = `
id
name
username
email
ext_data
media
`;
export const USER_WISHLIST = gql`
query user_wishlist($user_id: uuid) {
    core_user_wishlist_aggregate(where: {user_id: 
        {_eq: $user_id}}) {
      nodes {
       unit{
        ${UNIT_FIELDS}
       }
      }
    }
  }
`;
export const ADD_TO_WISHLIST = gql`
	mutation add_to_wishlist($user_id: uuid, $unit_id: uuid) {
		insert_core_user_wishlist_one(
			object: { user_id: $user_id, unit_id: $unit_id }
		) {
			created_at
		}
	}
`;
export const REMOVE_FROM_WISHLIST = gql`
	mutation remove_from_wishlist($user_id: uuid, $unit_id: uuid) {
		delete_core_user_wishlist(
			where: { user_id: { _eq: $user_id }, unit_id: { _eq: $unit_id } }
		) {
			affected_rows
		}
	}
`;

export const NEW_USER = gql`
	mutation sign_up($name: String, $username: String, $password: String) {
		insert_core_users(
			objects: [{ name: $name, username: $username, passwired: $password }]
		) {
			affected_rows
		}
	}
`;

export const UPDATE_USER = gql`
mutation updateUserData
(
  $id: uuid!,
  $username: String,
  $password: String,
  $name: String
  ){
  update_core_users_by_pk(pk_columns: {id: $id},
   _set: 
  {
    id: $id,
    username:$username,
    passwired: $password,
    name: $name
  }) {
    ${USER_FIELDS} 
  }
}
`;

export const UPDATE_USER_DATA = gql`
mutation updateUserData
(
  $id: uuid!,
  $ext_data: jsonb,
  $media: jsonb,
  $name: String
  ){
  update_core_users_by_pk(pk_columns: {id: $id},
   _set: 
  {
    id: $id,
    ext_data: $ext_data,
    media: $media,
    name: $name
  }) {
    ${USER_FIELDS}
  }
}
`;

export const GET_USER_BY_ID = gql`
  query users_by_pk($id: uuid! ){
    core_users_by_pk (id: $id) {
      ${USER_FIELDS} 
    }      
  }
`;
