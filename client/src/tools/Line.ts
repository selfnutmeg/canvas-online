import Tool from "./Tool";

export default class Line extends Tool {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    mouseDown: boolean;
    savedSnapshot: string;
    lineStartX: number;
    lineStartY: number;

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
        this.savedSnapshot = this.canvas.toDataURL();
        this.lineStartX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
        this.lineStartY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop);
        }
    }

    draw(x: number, y: number) {
        const img = new Image();
        img.src = this.savedSnapshot;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.beginPath();
            this.ctx?.moveTo(this.lineStartX, this.lineStartY);
            this.ctx?.lineTo(x, y);
            this.ctx?.stroke();
        }
    }
}