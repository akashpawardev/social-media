import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newUserAdded, setNewUserAdded] = useState();
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify JSON content type
                },
                body: JSON.stringify({ username, email, password }), // Send data as JSON string
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            setNewUserAdded(true);
            navigate("/login");
            // return (<Navigate to="/" replace={true} />)
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h1 className="text-3xl font-semibold mb-4">Add New User</h1>
                {newUserAdded && (
                    <p className="bg-green-100 text-green-800 rounded-md p-2 mb-4">
                        New User added successfully!
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" className="w-full border rounded-md px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <Link to="/login">
                    </Link>
                    <button type="submit" className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Register</button>
                </form>
            </div>
        </div >
    );
}

export default Register;
