import React from 'react'
import * as Workspace from './WorkspaceComponents'

var ImagePreview = React.createClass({
  render: function() {
    return (
      <div className="ImagePreview" style={{'backgroundImage': 'url('+ this.props.image +')'}}>
        <div className="WorkspaceOverview">
          <Workspace.Information name="Coworking Space, South Korea" price={this.props.price} duration="1" />
          <Workspace.Meta people={this.props.people} />
        </div>
      </div>
    );
  }
});
export default ImagePreview