export default function Item({id, name, quantity, packed, onRemoveItem, onToggleItem}) {
    return (
        <li>
            <input type="checkbox" checked={packed} onChange={() => {
                onToggleItem(id);
            }}/>
            <span style={packed ? {textDecoration: "line-through"} : {}}>
                {quantity} {name}
            </span>
            <button className="remove-btn" onClick={() => onRemoveItem(id)}>❌</button>
        </li>
    );
}
