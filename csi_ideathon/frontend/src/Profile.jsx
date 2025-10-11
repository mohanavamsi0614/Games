import { useAuth } from "./Auth_cont";

function Profile(){
    const {user} = useAuth();
    return <h1>Profile Page {user.name}</h1>
}
export default Profile;