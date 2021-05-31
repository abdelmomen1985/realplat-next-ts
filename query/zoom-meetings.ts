import { gql } from "@apollo/client";




export const NEW_MEETING = gql`
  mutation create_meeting{
    create_meeting{
      host_email
      host_id
      id
      join_url
      password
      start_url
      type
      h323_password
    }
  }
`

export const ADD_MEETING = gql`
  mutation insert_meeting($user_id: uuid!, $zoom_data: jsonb!){
    insert_meetings_one(object: {user_id: $user_id, zoom_data: $zoom_data}){
      zoom_data
    }
  }
`