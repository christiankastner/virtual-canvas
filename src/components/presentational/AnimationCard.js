import React from 'react';
import { connect } from 'react-redux'

const AnimationCard = props => {
    return (
        <div className="tool-card" >
            Burst
        </div>
    )
}

// onClick={() => props.dispatch({type: "SELECT_ANIMATION", animation: props.animation})}

export default connect()(AnimationCard)