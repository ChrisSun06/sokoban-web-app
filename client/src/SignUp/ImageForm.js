import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PublishIcon from '@material-ui/icons/Publish';
// Importing actions/required methods
// import { addImage } from "../../actions/image";


/* Component for the Image Form */
class ImageForm extends React.Component {

    render() {
        const { addImage } = this.props;

        return (
            <React.Fragment>
                <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, null);
                }}>
                    <div class="image-form__field">
                        <label>Image:</label>
                        <input name="image" type="file" />
                    </div>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="image-form__submit-button"
                    >
                        Upload
                    </Button> */}
                    <Button type="submit">
                      <PublishIcon color="#C3CFC9"/>
                    </Button>
                </form>

                {/* <p className={`image-form__message--${dashboard.state.message.type}`}>
                    {dashboard.state.message.body}
                </p> */}
            </React.Fragment>
        );
    }
}

export default ImageForm;
