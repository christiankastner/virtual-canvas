import React from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react';

const AnimationCard = props => {
    return (
        <div className="tool-card" onClick={() => props.dispatch({type: "SELECT_ANIMATION", animation: props.animation})}>
            <Card>
                <Card.Content >
                    <Card.Description >
                        Burst
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )
}

export default connect()(AnimationCard)