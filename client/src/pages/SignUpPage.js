import EditClientForm from "../components/EditClientForm";
import Navbar from "../components/Navbar"
const SignUpPage = () => {
    return (
        <div>
            <div>
                <Navbar pageName="Registration" />
            </div>
            <EditClientForm
                id={null}
                editRole={false}
                buttonCaption="Create account"
                submitMessage="Account created"
            />
        </div>
    );
}

export default SignUpPage;