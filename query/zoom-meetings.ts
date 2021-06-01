import { gql } from "@apollo/client";




export const CREATE_ZOOM_MEETING = gql`
  mutation create_meeting{
    create_meeting{
      id
      uuid
      type
      host_email
      host_id
      join_url
      start_url
      password
      h323_password
    }
  }
`

export const INSERT_MEETING = gql`
  mutation insert_meeting($user_id: uuid!, $zoom_data: jsonb!){
    insert_meetings_one(object: {user_id: $user_id, zoom_data: $zoom_data}){
      zoom_data
    }
  }
`