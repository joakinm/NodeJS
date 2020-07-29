const fs = require('fs');
const path = require('path');
const cart = require ('./cart');

const p = path.join(path.dirname(require.main.filename), 'data', 'Products.json');

const getProdFile = cb => {
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            return cb([]);
        } else{
            cb(JSON.parse(fileContent));
        }
    });
}   

module.exports = class Producto{
    constructor(id,title, ImageURL, Description, price){
        this.id = id;
        this.title = title;
        this.ImageURL = ImageURL;
        this.Description = Description;
        this.price = price;
    }
    //---set
    guardar(){
        getProdFile(products=>{
            if(this.id){
                const ExistingProdId = products.findIndex(prod => prod.id == this.id);
                const updatedProducts = [...products];
                updatedProducts[ExistingProdId] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts),(err)=>{
                    console.log(err);
                });
            } else{
                this.id = (Math.random()*100);
                products.push(this);
                fs.writeFile(p, JSON.stringify(products),(err)=>{
                    console.log(err);
                });
            }
            
        });
    } 
    //---- get
    static traerProducto(cb){//hay que implementarlo con un cb, por que sino devuelve null x la llamada async
        getProdFile(cb);
    }
    //------ get by ID
    static getById(id,cb){
        getProdFile(products=>{
            const prod = products.find(p=> p.id == id);
            cb(prod);
        })
    }

    //------- delete
    delete(id){
        getProdFile(products =>{
            const prod = products.find(prod => prod.id == id)
            const ExistingProdId = products.filter(prod => prod.id != id);
            fs.writeFile(p, JSON.stringify(ExistingProdId),(err)=>{
                console.log(err);
            });
            cart.delete(Productid,prod.price);
        })
    }
}
