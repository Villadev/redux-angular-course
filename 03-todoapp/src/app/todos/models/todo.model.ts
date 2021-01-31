export class Todo {
    public id: number;
    public texto: string;
    public completado: boolean;

    constructor(_text: string) {
        this.texto = _text;
        this.id = Math.random();
        this.completado = false;
    }
}

