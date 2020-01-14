import React from 'react';
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react';

const AnimationCard = props => {
    return (
        <div className="tool-card" onClick={() => props.selectAnimation(props.animation)}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        selectAnimation: (animation) => {dispatch({type: "SELECT_ANIMATION", animation: animation})}
    }
}

const mapStateToProps = (state) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(AnimationCard)