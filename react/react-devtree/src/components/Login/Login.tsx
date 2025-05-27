import './LoginStyle.css';
import { NavLink, Link } from 'react-router-dom';

const LoginComponent = () => {
    return (
        <>
            <div className="Login">
                <h1>Login</h1>
            </div>
            <nav>
                <Link to="/auth/register"> Registrate</Link>
            </nav>
        </>

    );
};

export default LoginComponent;
