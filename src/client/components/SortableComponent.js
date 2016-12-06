import React, {Component, Proptypes} from 'react';
import {render} from 'react-dom';
import {ListGroupItem, ListGroup,} from 'react-bootstrap';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


const SortableItem = SortableElement(({value}) => <ListGroupItem>{value}</ListGroupItem>);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )}
        </ul>
    );
});
let  SortableComponent = (props) =>{

    const {
        oldIndex, 
        newIndex,
        items,
        value,
        onSortEnd
    } = props; 
           return (
            //<SortableList items={this.state.items} onSortEnd={this.onSortEnd} />
             <SortableList items={items} onSortEnd={onSortEnd} />
        )
    }

export default SortableComponent;