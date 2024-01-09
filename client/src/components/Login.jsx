import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPostAdded, setNewPostAdded] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log('Login successful!');
                navigate("/")
                setNewPostAdded(true);
            } else {
                console.error('Login failed');
                // Handle failure (display error message, reset form, etc.)
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
                {newPostAdded && (
                    <p className="bg-green-100 text-green-800 rounded-md p-2 mb-4">
                        New post added successfully!
                    </p>
                )}
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Login
                    </button>
                    <Link to="/forgetpassword" >
                        <button type="submit" className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Forget
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default login;
