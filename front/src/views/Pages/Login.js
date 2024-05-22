import {useState} from "react";
import {useAuth} from "../../Controller/Login/AuthProvider";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    })
    const auth = useAuth();
    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if((input.mail !=="" ||input.username !== "") && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("Inserisci un nome utente e una password validi");
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev)=> ({
            ...prev,
            [name]:value,
        }));
    };

    return (
        <form onSubmit={handleSubmitEvent}>
            <div className="form_control">
                <label htmlFor="user-email">Email:</label>
                <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="example@yahoo.com"
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-email" className="sr-only">
                </div>
            </div>
            <div className="form_control">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-password" className="sr-only">
                </div>
            </div>
            <button className="btn-submit">Submit</button>
        </form>
    );
};

export default Login;

