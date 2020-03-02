import React from 'react';
import {EMPTY, WALL, PLAYER, BOX, GOAL, ERASE} from '../hardCodedData'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

// import {EMPTY, WALL, PLAYER, BOX, GOAL, ERASE} from './constants';

class EditButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    create_button(obj_type) {
        let color = 'primary';
        if (obj_type === this.props.currentOn) {
            color = 'secondary';
        }
        return (
            <Button color={color} variant="outlined" size="small" onClick={(function (e) {
                this.props.onButtonClick(obj_type)
            }).bind(this)}
                    style={{display: 'inline-block'}}
            >
                {obj_type.toUpperCase()}
            </Button>);
    }

    render() {
        return (
            <ButtonGroup>
                {[WALL, PLAYER, BOX, GOAL, ERASE].map((function (obj_type) {
                    return (<div>{this.create_button(obj_type)}
                        <br/>
                    </div>);
                }).bind(this))}
            </ButtonGroup>
        );
    }
}

export default EditButtons;
