import React from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react';

const AnimationCard = props => {
    return (
        <div className="tool-card" >
            Burst
        </div>
    )
}

// onClick={() => props.dispatch({type: "SELECT_ANIMATION", animation: props.animation})}

export default connect()(AnimationCard)