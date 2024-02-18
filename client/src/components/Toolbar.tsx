import React from 'react';
import '../styles/toolbar.scss';
import toolState from '../store/toolState';
import canvasState from '../store/canvasState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

const Toolbar = (): JSX.Element => {
    return (
        <div className='toolbar'>
            <div className='toolbar__section'>
                <button className='toolbar__button brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))} />
                <button className='toolbar__button rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))} />
                <button className='toolbar__button circle' onClick={() => toolState.setTool(new Circle(canvasState.canvas))} />
                <button className='toolbar__button eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))} />
                <button className='toolbar__button line' onClick={() => toolState.setTool(new Line(canvasState.canvas))} />
            </div>

            <div className='toolbar__section'>
                <button className='toolbar__button undo' onClick={() => canvasState.undo()} />
                <button className='toolbar__button redo' onClick={() => canvasState.redo()} />
                <button className='toolbar__button save' />
            </div>
        </div>
    );
}

export default Toolbar;