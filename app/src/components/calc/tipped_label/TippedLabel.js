import React from 'react';
import { Popup, Icon } from 'semantic-ui-react';

const TippedLabel = ({ labelText, tooltipText, limits }) => {
    const [max, min] = limits;
    return (
        <div className="tipped-label-wrapper">
            {labelText}
            <Popup
                trigger={<span>&nbsp;<Icon name='question circle outline' /></span>}
                content={
                    <>
                        {tooltipText ? <p>{tooltipText}</p> : null}
                        {max || min ? <small>{`От ${min} до ${max}`}</small> : null}
                    </>
                }
                basic
            />
        </div>
    )
}

export default TippedLabel;
