import {useState} from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null); // {id, name, image, balance}

    function handleShowAddFriend() {
        setShowAddFriend(!showAddFriend);
    }

    function handleAddFriend(newFriend) {
        setFriends([...friends, newFriend]);
    }

    function handleSelectFriend(friend) {
        setSelectedFriend((currentSelectedFriend) => {
                if (currentSelectedFriend && currentSelectedFriend.id === friend.id) {
                    return null;
                }

                return friend;
            }
        );
    }

    function handleSplitBill(value) {
        setFriends((friends) =>
            friends.map((friend) =>
                friend.id === selectedFriend.id
                    ? {...friend, balance: friend.balance + value}
                    : friend
            )
        );

        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList friends={friends} handleSelectFriend={handleSelectFriend} selectedFriend={selectedFriend}/>
                {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend}/>}
                <Button onClick={handleShowAddFriend}>{showAddFriend ? "Cancel" : "Add friend"}</Button>
            </div>

            {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} handleSplitBill={handleSplitBill}/>}
        </div>
    );
}

function FriendsList({friends, handleSelectFriend, selectedFriend}) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend key={friend.id} friend={friend} handleSelectFriend={handleSelectFriend}
                        selectedFriend={selectedFriend}/>
            ))}
        </ul>
    );
}

function Friend({friend, handleSelectFriend, selectedFriend}) {
    const isSelected = selectedFriend && selectedFriend.id === friend.id;

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe <strong>${Math.abs(friend.balance)}</strong>
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    Owes you <strong>${friend.balance}</strong>
                </p>
            )}
            {friend.balance === 0 && (
                <p>
                    You and {friend.name} are <strong>even</strong>
                </p>
            )}

            <Button onClick={() => handleSelectFriend(friend)}>{isSelected ? "Close" : "Select"}</Button>
        </li>
    );
}

function Button({children, onClick}) {
    return <button className="button" onClick={onClick}>{children}</button>;
}

function FormAddFriend({handleAddFriend}) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) {
            alert("Please fill in all fields!");
            return;
        }

        const id = crypto.randomUUID();
        const newFriend = {
            id,
            name,
            image: `${image}?u={id}`,
            balance: 0,
        }

        handleAddFriend(newFriend);

        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className="form-add-friend">
            <label htmlFor="name">🧑‍🤝‍🧑Friend's name</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="image">🖼️Image URL</label>
            <input type="text" id="image" name="image" value={image} onChange={(e) => setImage(e.target.value)}/>
            <Button onClick={handleSubmit}>Add friend</Button>
        </form>
    );
}

function FormSplitBill({selectedFriend, handleSplitBill}) {
    const [bill, setBill] = useState("");
    const [paidByUser, setPaidByUser] = useState(0);
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState("you");

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) {
            alert("Please fill in all fields!");
        }

        handleSplitBill(whoIsPaying === "you" ? paidByFriend : -paidByUser);
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split the bill with {selectedFriend.name}</h2>

            <label htmlFor="bill">💰 Bill value</label>
            <input type="number" id="bill" name="bill" value={bill} onChange={(e) => setBill(e.target.value)}/>
            <label>💁 Your expense</label>
            <input type="number" id="you" name="you" value={paidByUser}
                   onChange={(e) => setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)}/>
            <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
            <input type="number" id="friend" name="friend" value={paidByFriend} disabled/>

            <label>🤑 Who is paying the bill?</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value="you">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split bill</Button>
        </form>
    );
}