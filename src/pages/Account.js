import NavBar from "../components/NavBar";
import './styles/Account.css';
import Footer from "../components/Footer";
import SignIn from './components/SignIn';

function Account(){
    return(
        <>
            <NavBar />
            <SignIn />
            <Footer />
        </>
    )
}

export default Account;