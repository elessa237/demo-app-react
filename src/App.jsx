import React, {useState} from "react";
import {render} from "react-dom";

function AddCard({produit}) {
    const name = produit.stocked ? <h4>{produit.name}</h4> : <h4 className="text-danger">{produit.name}</h4>;
    return (
        <div className="col">
            <div className="card shadow-sm">
                <div className="card-body">
                    {name}<span>{produit.price}</span>
                    <p className="card-text">{produit.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        Catégorie : <small className="text-muted">{produit.category}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Card({produits, texte, inStock}) {

    const card = [];

    produits.forEach((produit) => {
        if (produit.name.indexOf(texte) === -1) {
            return
        }
        if ((produit.stocked === false) && (inStock === true)) {
            return;
        }
        card.push(
            <AddCard produit={produit} key={produit.id}/>
        )
    });

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {card}
        </div>
    );
}

function Search({texte, check, onTexteChange, onCheckChange}){
    return (
        <form className="form mb-3" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group mb-3">
                <input
                    type="text"
                    placeholder="rechercher..."
                    value={texte}
                    onChange={(e) => onTexteChange(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={check}
                        onChange={(e)=> onCheckChange(e.target.checked)}
                    /> Uniquement en stock
                </label>
            </div>
        </form>
    );
}

function App() {
    const [texte, setTexte] = useState("");
    const [check, setCheck] = useState(false);

    return (
        <>
            <Search
                texte={texte}
                check={check}
                onTexteChange={setTexte}
                onCheckChange={setCheck}
            />
            <Card
                inStock={check}
                produits={PRODUCTS}
                texte={texte}
            />
        </>
    );
}

const PRODUCTS = [
    {
        id: 1,
        category: "Sporting Goods",
        price: "$49.99",
        stocked: true,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium !",
        name: "Football"
    },
    {
        id: 2,
        category: "Sporting Goods",
        price: "$9.99",
        stocked: true,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium !",
        name: "Baseball"
    },
    {
        id: 3,
        category: "Sporting Goods",
        price: "$29.99",
        stocked: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium !",
        name: "Basketball"
    },
    {
        id: 4,
        category: "Electronics",
        price: "$99.99",
        stocked: true,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium !",
        name: "iPod Touch"
    },
    {
        id: 5,
        category: "Electronics",
        price: "$399.99",
        stocked: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium !",
        name: "iPhone 5"
    },
    {
        id: 6,
        category: "Electronics",
        price: "$199.99",
        stocked: true,
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium !",
        name: "Nexus 7"
    }
]

class ProduitElement extends HTMLElement{
    connectedCallback() {
        render(<App/>, this)
    }
}

customElements.define('produits-tag', ProduitElement);