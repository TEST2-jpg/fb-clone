import { useState } from "react"

const Login = ({token, setToken}) => {
    const [formData, setFormData] = useState(
        { email: '', password: '' }
    )

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })
    }
    const logUser = async () => {
        const { email, password } = formData
        const jsonData = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const response = await jsonData.json()
        setToken(response.token)
        setFormData({ email: '', password: '' })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        logUser();
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
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
            <button onClick={async () => {
                try {
                    await fetch('http://localhost:8080/pro?token='+token)
                } catch (error) {
                    console.log(error)
                }

            }}>FETCH PRO</button>
            <button onClick={() => {
                console.log(token)
                console.log(typeof (token))
            }}>Console logger</button>
        </>
    )
}

export default Login