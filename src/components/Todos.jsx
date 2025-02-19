import { useState, useEffect } from 'react';
import api from '../api';

function ToDos({ isLoggedIn, userName, setUserName }) {
    const [toDos, setToDos] = useState([]);
    const [newToDo, setNewToDo] = useState('');
    const [editText, setEditText] = useState('');
    const [editMode, setEditMode] = useState(null);

    // Function for getting token and Todos if logged in:
    // =================================
    const fetchToDos = async () => {
        try {
            //get the token from localstorage
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('no token found');
                return;
            }

            /* Sends a GET request to
      'http://localhost:8080/' (backend server) */
            const response = await api.get('/toDos', {
                headers: {
                    Authorization: `Bearer ${token}`, //add the token to the header
                    'Content-Type': 'application/json', //add json content type
                },
            });
            setToDos(response.data.toDos); //update toDos state with toDos
            setUserName(response.data.userName);
        } catch (error) {
            console.error('Error fetching toDos:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchToDos();
        }
        // Fetch toDos each time the component loads
        // eslint-disable-next-line
    }, [isLoggedIn]); // if isLoggedIn changes - retrigger the useEffect.
    //disabled eslint for the above line because it was throwing a warning about dependencies but apparently this issue shouldn't cause problems in this case.

    const addToDo = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('no token found');
            return;
        }

        try {
            const response = await api.post(
                '/toDos/add',
                {
                    text: newToDo,
                    completed: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, //add the token to the header
                        'Content-Type': 'application/json', //add json content type
                    },
                }
            );
            setToDos(response.data.toDos); //refresh the toDos state
            setNewToDo(''); //clear the input
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred while adding the To-Do');
            console.error(error);
        }
    };

    // Function to UPDATE a toDo
    //=================================================
    const updateToDo = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('no token found');
            return;
        }

        try {
            const response = await api.put(
                `/todos/update/${id}`, //update the todo
                { text: editText }, // Send new text in the body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', //add json content type
                    },
                }
            );
            setToDos(response.data.toDos); // Refresh the toDos state
            setEditMode(null);
            setEditText(''); // reset the input
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred while updating the to Do'); // discovered a neat way of safely accessing nested properties IF THEY EXIST. If they don't - display the message on the right.
            console.error(error);
        }
    };

    // function to TOGGLE completed stat of todo:
    // ==========================================
    const toggleToDo = async (id) => {
        // This function sends a PUT request to update the `completed` status of the to-do
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('no token found');
            return;
        }
        const response = await api.put(
            `/toDos/toggle/${id}`, // Assuming backend has this endpoint
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to header
                    'Content-Type': 'application/json', //add json content type
                },
            }
        );
        setToDos(response.data.toDos); // Refresh the toDos state with the updated list
    };

    // function to delete a toDo
    //============================================
    const deleteToDo = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('no token found');
            return;
        }
        const response = await api.delete(`/todos/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to header
                'Content-Type': 'application/json', //add json content type
            },
        });
        setToDos(response.data.toDos); // Refresh the toDos state
    };
    return (
        <div>
            {/* Display username's todos */}
            <h1>{userName}'s ToDos</h1>
            {isLoggedIn > 0 ? (
                <>
                    {' '}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addToDo();
                        }}
                    >
                        <input type="text" value={newToDo} onChange={(e) => setNewToDo(e.target.value)} />
                        <button type="submit">Add</button>
                    </form>
                    <div>
                        {toDos.length > 0 ? (
                            <ul>
                                {toDos.map((todo) => (
                                    <li key={todo.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleToDo(todo.id)} // checkbox for toggling completed field
                                            />
                                            {todo.text}
                                        </label>
                                        {/* Edit button */}
                                        <button
                                            className="actions"
                                            onClick={() => {
                                                setEditMode(todo.id); // CHANGE!! -------> Set the edit mode to this to-do's ID
                                                setEditText(todo.text); // CHANGE!! -------> Pre-fill the input with the current to-do text
                                            }}
                                        >
                                            Edit
                                        </button>
                                        {/* Only show the input field when edit is clicked */}
                                        {editMode === todo.id && (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder="Edit text"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                />
                                                {/* Save button */}
                                                <button onClick={() => updateToDo(todo.id)}>Save</button>{' '}
                                                {/* Cancel button */}
                                                <button
                                                    onClick={() => {
                                                        setEditMode(null);
                                                        // cancel the edit
                                                        setEditText('');
                                                        // clear the input
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                        {/* Delete button */}
                                        <button className="actions" onClick={() => deleteToDo(todo.id)}>
                                            Delete
                                        </button>
                                    </li> // Render each todo as a list item
                                ))}
                            </ul>
                        ) : (
                            <h2>Looks real empty here!</h2>
                        )}
                    </div>
                </>
            ) : (
                <h2>You are not logged in</h2> // Show message if no todos exist
            )}
        </div>
    );
}

export default ToDos;
