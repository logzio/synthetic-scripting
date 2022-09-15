import React, { FunctionComponent } from 'react';

const Spinner: FunctionComponent = () => {
    return (
        <svg
            style={{
                padding: '0px 25px ',
                shapeRendering: 'auto',
                width: '82px',
                height: '100%',
            }}
            width='82px'
            height='20px'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid'
        >
            <circle
                cx='50'
                cy='50'
                fill='none'
                stroke='#335868'
                strokeWidth='8'
                r='35'
                strokeDasharray='164.93361431346415 56.97787143782138'
            >
                <animateTransform
                    attributeName='transform'
                    type='rotate'
                    repeatCount='indefinite'
                    dur='0.5s'
                    values='0 50 50;360 50 50'
                    keyTimes='0;1'
                ></animateTransform>
            </circle>
        </svg>
    );
};

export default Spinner;
