import React, {Component} from "react";

export default class PopUp extends Component {
    handleClick = () => {
        this.props.toggle();
    };

    render() {
        return (
            <div className="modal">
                <div className="modal_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
                    <form>
                        <h3>Change Password</h3>
                        <label>
                            Enter new password:
                            <input type="text" name="password"/>
                        </label>
                        <br/>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}
