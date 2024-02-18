import React from 'react';
import '../styles/settingbar.scss';
import toolState from '../store/toolState';

const SettingBar = (): JSX.Element => {
    return (
        <div className='settingbar'>
            <div className='settingbar__input-field'>
                <label htmlFor='line-width'>Line width</label>
                <input
                    id='line-width'
                    type='number'
                    min={1}
                    max={50}
                    defaultValue={1}
                    onChange={e => toolState.setLineWidth(e.target.valueAsNumber)}
                />
            </div>

            <div className='settingbar__input-field'>
                <label htmlFor='stroke-color'>Stroke</label>
                <input id='stroke-color' type="color" onChange={e => toolState.setStrokeColor(e.target.value)} />
            </div>

            <div className='settingbar__input-field'>
                <label htmlFor='fill-color'>Fill</label>
                <input id='fill-color' type="color" onChange={e => toolState.setFillColor(e.target.value)} />
            </div>
        </div>
    );
}

export default SettingBar;