import React from 'react';

const BurstPlayer = props => {

    const playBursts = () => {
        for (let i = 0; i < props.bursts.length; i++) {
            props.bursts[i].play()
        }
    }
    return (
        <div id="burst-player">
            {playBursts()}
        </div>
    )
}

export default BurstPlayer