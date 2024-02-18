import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    undoList: string[] = [];
    redoList: string[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext('2d');
    }

    pushToUndo(data: string) {
        this.undoList.push(data);
    }

    pushToRedo(data: string) {
        this.redoList.push(data);
    }

    clearRedoList() {
        this.redoList = [];
    }

    undo() {
        if (this.undoList.length > 0) {
            this.pushToRedo(this.canvas.toDataURL());
            const img = new Image();
            img.src = this.undoList.pop()!;
            img.onload = () => {
                this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }

    redo() {
        if (this.redoList.length > 0) {
            this.pushToUndo(this.canvas.toDataURL());
            const img = new Image();
            img.src = this.redoList.pop()!;
            img.onload = () => {
                this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            }
        }
    }
}

const canvasState: CanvasState = new CanvasState();

export default canvasState;