// Everything here was previously in the App component.
import React from "react";
import pic from "./bag.png"

// Importing components
import Header from "./../Header";
import SimpleTabs from "./../NavBar"

class Shop extends React.Component {

  render() {
    return (
      <div>
        <div className="Shop">
          <Header
            title="Token Shop"
            logo= {pic}
            money="$4500"
          />
        </div>

        <div class="tabs">
          <SimpleTabs/>
        </div>

      </div>
    );
  }
}

export default Shop;
