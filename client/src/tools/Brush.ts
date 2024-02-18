import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    mouseDown: boolean;

    listen() {
        if (this.canvas) {
            this.canvas.onmouseup = this.mouseUpHandler.bind(this);
            this.canvas.onmousedown = this.mouseDownHandler.bind(this);
            this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        }
    }

    mouseUpHandler(e: MouseEvent) {
        this.mouseDown = false;
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop);
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop);
        }
    }

    draw(x: number, y: number) {
        this.ctx?.lineTo(x, y);
        this.ctx?.stroke();
    }
}