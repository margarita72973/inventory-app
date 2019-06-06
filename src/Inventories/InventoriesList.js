import React, { Component } from 'react';
import Inventory from './Inventory'
import List from '@material-ui/core/List';

export default class ItemsList extends Component {
  render() {
    return (
      <List>
        {
          [1,2,3,4,5,6].map(el=>
            <Inventory key={el} />
          )
        }
        ItemsList
      </List>
    )
  }
}
