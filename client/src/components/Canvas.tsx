import React, { useEffect, useRef } from 'react';
import '../styles/canvas.scss';
import {observer} from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import Brush from '../tools/Brush';
import toolState from '../store/toolState';

const Canvas = observer((): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            canvasState.setCanvas(canvasRef.current);
            toolState.setTool(new Brush(canvasRef.current));
        }
    }, []);

    const mouseDownHandler = () => {
        if (canvasRef.current) {
            canvasState.pushToUndo(canvasRef.current.toDataURL());
            canvasState.clearRedoList();
        }
    }
    
    return (
        <div className='canvas-wrapper'>
            <canvas
                ref={canvasRef}
                className='canvas'
                width={600}
                height={400}
                onMouseDown={mouseDownHandler}
            />
        </div>
    );
});

export default Canvas;