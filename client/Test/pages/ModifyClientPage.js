import { useParams } from 'react-router-dom'

import EditClientForm from "../components/EditClientForm";
import Navbar from "../components/Navbar"
const ModifyClientPage = () => {
    const {id} = useParams();
    return (
        <div>
            <div>
                <Navbar pageName="ModifyClientPage" id={id}/>
            </div>

            <EditClientForm
                id = {id}
                editRole={false}
                buttonCaption="Modify"
                submitMessage="Personal information saved"
            />
        </div>
    );
}

export default ModifyClientPage;