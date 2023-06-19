import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    const style = { };
    return <header className="header">
        <h1 style={style}>Pizza Menu</h1>
    </header>
}

function Menu() {
    return <main className="menu">
        <h2>Our Menu</h2>

        {pizzaData.length > 0 ? <Pizza /> : <p>We're still working on our menu. Please come back later.</p>}
    </main>;
}

function Footer() {
    const hour = new Date().getHours();
    const openHour = 0;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour < closeHour;
    return <footer className="footer">
        {isOpen ? (
            <Order closeHour={closeHour} />
        ) : (
            <p>
                We're happy to see you tomorrow from {openHour}:00 to {closeHour}:00.
            </p>
        )}
    </footer>;
}

function Order(props) {
    return <div className="order">
        <p>
            We're open until {props.closeHour}:00. Come and get your pizza!
        </p>
        <button className="btn">Order now</button>
    </div>;
}

function Pizza() {
    return(
        <React.Fragment>
            <p>Authentic Italian cuisine, 6 creative dishes to choose from. All from our stone oven.
                all oragnic, all delicious.</p>
            <ul className="pizzas">
                {pizzaData.map((pizza) => <PizzaItem pizza={pizza} key={pizza.name} />)}
            </ul>;
        </React.Fragment>
    );
}

function PizzaItem(props) {
    const {pizza} = props;
    return <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
        <img src={pizza.photoName} alt={pizza.name} />
        <div>
            <h3>{pizza.name}</h3>
            <p>{pizza.ingredients}</p>
            <span>{pizza.soldOut ? "SOLD OUT" : "$" + pizza.price}</span>
        </div>
    </li>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
