// Everything here was previously in the App component.
import React from "react";
import pic from "./admin.jpg"

// Importing components
import Header from "./../Header";
import UsersList from "./../UsersListHead"

class Admin extends React.Component {

  render() {
    return (
      <div>
        <div>
          <Header
            title="Administrator"
            logo= {pic}
          />
        </div>

        <div>
          <UsersList/>
        </div>

      </div>
    );
  }
}

export default Admin;