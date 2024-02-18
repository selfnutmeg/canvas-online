import toolState from "../store/toolState";
import Brush from "./Brush";

export default class Eraser extends Brush {
    draw(x: number, y: number) {
        if (this.ctx) {
            this.ctx.strokeStyle = 'white';
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            this.ctx.strokeStyle = toolState.strokeInputColor;
        }
    }
}