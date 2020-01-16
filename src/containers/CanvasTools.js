import React from 'react';
import AnimationCard from '../components/presentational/AnimationCard'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const CanvasTools = (props) => {

    const renderMyAnimations = () => props.myAnimations ? props.myAnimations.map(animation => <AnimationCard animation={animation} />) : null

    return (
        <div className="tools">
            <Button onClick={props.handleNewAnimation}>New Burst</Button>
            {renderMyAnimations()}
        </div>
    )
}


const mapStateToProps = state => {
    return {
        myAnimations: state.myAnimations
    }
}

export default connect(mapStateToProps)(CanvasTools)