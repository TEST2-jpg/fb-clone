import { useState } from "react"

const Register = () => {
    const [formData, setFormData] = useState(
        { first_name: '', last_name: '', email: '', password: '' }
    )
    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }
    const registerUser = async () => {
        const jsonData = await fetch('http://localhost:8080/reg', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                formData,
            })
        })
        await jsonData.json()
        setFormData({ first_name: '', last_name: '', email: '', password: '' })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
     };    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                name="first_name"
                value={formData.first_name}
            />
            <input
                type="text"
                placeholder="Last name"
                onChange={handleChange}
                name="last_name"
                value={formData.last_name}
            />
            <input
                type="email"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
            />
            <input
                type="password"
                placeholder="New Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
            />
            <button>Submit</button>
        </form>
    )
}

export default Register