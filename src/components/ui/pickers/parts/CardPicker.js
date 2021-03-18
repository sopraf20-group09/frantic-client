import React, {Component} from 'react';
import "styles/ui/pickers/BasicPickers.scss";
import Card from "components/ui/cards/Card";

/**
 * This component allows the user to pick a number of cards.
 * PROPS:
 * cards: array of card objects    - selectable cards
 *                                 - cards can additionally have property "disabled: bool",
 *                                   which makes the card unselectable.
 * maxAmount: number               - the maximum amount of cards that should be selectable.
 * disableFuckYous: bool           - automatically disables all fuck you cards if true. (default: true)
 * onSelectionChange: func([], int) - a function that is called every time the selection changes.
 *                                   parameters are:
 *                                   []: a list of currently selected card objects,
 *                                   int: the amount of available, non disabled cards
 */
class CardPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedCards: []};
    }

    render() {
        let cardItems = [];
        this.availableCards = 0;
        for (let c of this.props.cards) {
            let disabled = false;
            if (c.disabled || (this.props.disableFuckYous && c.value === 'fuck-you')) {
                disabled = true;
            }
            else {
                this.availableCards++;
            }
            cardItems.push(
                <div className={
                    "picker-card-item"
                    + (this.state.selectedCards.includes(c) ? " active" : "")
                    + (disabled ? " disabled" : "")}
                     onClick={() => this.handleCardClick(c)}
                     key={c.key}
                >
                    <Card
                        withShadow
                        type={c.type}
                        value={c.value}
                        color={c.color}
                    />
                </div>
            );
        }

        return (
            <div className="picker-container scrolling">
                {cardItems}
            </div>
        );
    }

    handleCardClick(c) {
        if (c.disabled) {
            return;
        }

        let i = this.state.selectedCards.indexOf(c);
        let newCards = this.state.selectedCards.slice();
        if (i >= 0) {
            newCards.splice(i, 1);
        } else {
            newCards.push(c)
        }

        // remove first selected player if array gets too long
        if (newCards.length > this.props.maxAmount) {
            newCards.shift();
        }

        this.setState({selectedCards: newCards});

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(newCards, this.availableCards);
        }
    }
}

CardPicker.defaultProps = {
    maxAmount: 1,
    disableFuckYous: true
};

export default CardPicker;