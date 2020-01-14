import React from 'react';
import { Card } from 'semantic-ui-react';

const AnimationCard = props => {
    return (
        <div className="tool-card">
            <Card key={props.id}>
                <Card.Content >
                    <Card.Header >
                        Burst
                    </Card.Header>
                </Card.Content>
            </Card>
        </div>
    )
}
export default AnimationCard