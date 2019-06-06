import React, { Component } from 'react';
import StorageLocation from './StorageLocation'

export default class ItemsList extends Component {
  render() {
    return (
      <div style={{
            display: 'grid',
            gridGap: '20px',
            gridTemplateColumns: 'repeat(auto-fill, 320px)',
            justifyContent: 'center',
          }}
        >
          {
            [1,2,3,4,5,6].map(el=>
              <StorageLocation key={el} />
            )
          }
      </div>
    )
  }
}
