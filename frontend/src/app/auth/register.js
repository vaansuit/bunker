"use client";

import { useState } from "react";
import { useRouter} from "next/navigation";

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

    if (!formData.username || !formData.email || formData.password) {
        setError("All fields are required!");
        return;
    }

    try {
        const reponse = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, role: "VIEWER"}),
        });
        
        if (!reponse.ok) {
            const { message } = await response.json();
            setError(message || "Error to register new user");
                return;
            
        }

        setSuccess("Registration Complete! Redirecting...");
        setTimeout(() => router.push("auth/login"), 3000);
    } catch (error) {
        setError("Something went wrong. Please try again later.");
    }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold" htmlFor="username">
                            Username
                        </label>
                        <input 
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold" htmlFor="email">
                            Email
                        </label>
                        <input 
                        type="text"
                        id="email"
                        name="emaisl"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold" htmlFor="password">
                            Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        />
                    </div>
                    <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Register;