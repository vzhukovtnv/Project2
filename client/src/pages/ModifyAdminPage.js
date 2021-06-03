import { useParams } from 'react-router-dom'

import EditClientForm from "../components/EditClientForm";
import Navbar from "../components/Navbar"
const ModifyAdminPage = () => {
    const {id} = useParams();
    return (
        <div>
            <div>
                <Navbar pageName="ModifyAdminPage" id={id}/>
            </div>

            <EditClientForm
                id = {id}
                editRole={true}
                buttonCaption="Save"
                submitMessage="Personal information saved"
            />
        </div>
    );
}

export default ModifyAdminPage;