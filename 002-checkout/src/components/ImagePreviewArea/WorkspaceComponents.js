import React from 'react'
import pluralize from 'pluralize'

function Information(props){
    var duration = pluralize('day',props.duration);
    
    return (
      <div className="WorkspaceInformation">
        <div className="WorkspaceName">{props.name}</div>
        <div className="WorkspacePrice">
          <div className="Price">{props.price} GBP</div>
          <div className="Duration">/ {duration}</div>
        </div>
      </div>
    );
}


function Meta(props){
    var people = pluralize('person',props.people);
  
    return (
      <div className="WorkspaceMeta">
        <div className="Description">Entire office for <strong>{people}</strong></div>  
        <div className="Dates"><strong>Mon, Aug 22, 2016</strong> to <strong>Fri, Aug 29, 2016</strong></div>
      </div>
    );
}

export { Information, Meta }