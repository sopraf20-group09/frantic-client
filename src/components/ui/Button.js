import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import 'styles/ui/UiElements.scss';

/**
 * Render a button.
 * PROPS:
 * onClick: func            - called when button is clicked
 * width: string (optional) - a width override
 * type: string: 'primary', secondary' or 'end-turn'. default: primary
 *                          - defines the button-style
 * disabled: bool           - sets whether the button should be enabled.
 * style:                   - passed to button component
 *
 */
class Button extends Component {
    render() {
        return (
            <button
                className={`button-container ${this.props.type || 'primary'} button-text ${this.props.disabled && 'disabled'}`}
                style={{width: this.props.width, ...this.props.style}}
                onClick={() => this.handleClick()}>
                {this.props.children}
            </button>
        );
    }

    handleClick() {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick();
        }
    }
}

export default withRouter(Button);