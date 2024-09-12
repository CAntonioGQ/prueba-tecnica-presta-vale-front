export class Product{
    static ENABLE = 1;
    static DISABLE= 2;
    static LOCK = 3;
    static PENDING = 4;
    static DELETE = 99;

    constructor(
        public idProduct?: number,
        public name?: string,
        public price?: number,
        public status?: number
    ) {}

    public get getIdProduct(): number | undefined{
        return this.idProduct;
    }
    public set setIdProduct(idProduct: number | undefined){
        this.idProduct = idProduct;
    }
    public get getName(): string | undefined {
        return this.name;
    }
    public set setName(name: string | undefined){
        this.name = name;
    }
    public get getPrice(): number | undefined {
        return this.price;
    }
    public set setPrice(price: number | undefined){
        this.price = price;
    }
    public get getStatus(): number | undefined{
        return this.status;
    } 
    public set setStatus(status: number | undefined){
        this.status = status;
    }
}