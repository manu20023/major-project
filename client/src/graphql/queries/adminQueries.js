import { gql } from "@apollo/client";

export const GET_ADMIN_DASHBOARD_DATA = gql`
  {
    getAllTypesUsers {
      id
      name
      username
      isManager
      isAdmin
      joined
    }
    getAllHotels {
      id
    }
    getAllBookings {
      id
      bookedOn
      bookedBy {
        id
      }
      hotel {
        id
      }
      amount
    }
  }
`;
