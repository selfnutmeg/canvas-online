import Tool from "./Tool";

export default class Rect extends Tool {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    mouseDown: boolean;
    startX: number;
    startY: number;
    savedSnapshot: string;

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
        this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
        this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;
        this.savedSnapshot = this.canvas.toDataURL();
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            const currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft;
            const currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop;;
            const width = currentX - this.startX;
            const height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height);
        }
    }

    draw(x: number, y: number, w: number, h: number) {
        const img = new Image();
        img.src = this.savedSnapshot;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.beginPath();
            this.ctx?.rect(x, y, w, h);
            this.ctx?.fill();
            this.ctx?.stroke();
        }
    }
}