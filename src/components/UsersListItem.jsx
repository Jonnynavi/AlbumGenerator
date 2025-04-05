import { FaRegTrashCan, FaSpinner} from "react-icons/fa6";
import { useRemoveUserMutation } from "../store/apis/usersApi";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";


function UsersListItem({user}){

    const [removeUser, { isLoading }] = useRemoveUserMutation();

    const handleRemoveUser = () => {
        removeUser(user.id);
    }
    const header = <>
                <div className="flex flex-row items-center justify-between">
                    {isLoading ? <FaSpinner className="animate-spin"/> : <FaRegTrashCan className="cursor-pointer text-xl" onClick={handleRemoveUser}/>}
                    <p className="ml-2">{user.name}</p>
                </div>
    </>
    return (
        <ExpandablePanel header={header}><AlbumList user={user} /></ExpandablePanel>
    )
}

export default UsersListItem;