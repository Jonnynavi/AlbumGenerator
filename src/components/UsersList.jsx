import { useFetchUsersQuery, useAddUserMutation } from "../store";
import { GoSync } from "react-icons/go";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";

function UsersList(){
    const { data, error, isLoading } = useFetchUsersQuery();
    const [addUser, results] = useAddUserMutation();
    const { isLoading: isAddingUser } = results;

    const handleUserAdd = (e) => {
        e.preventDefault();
        addUser();
    };



    let content;
    if(isLoading){ 
        content = <Skeleton times={6} className="h-10 w-full"/>;
    }else if(error){ 
        content = <div>Error fetching data...</div>
    }else{
        content = data.map((user) => {
            return (
                <div key={user.id}>   
                    <UsersListItem user={user}/>
                </div>
            )}
        );
    };

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 mr-0 text-xl">Users</h1>
                <Button disabled={isAddingUser} onClick={handleUserAdd}>
                    { isAddingUser ? <GoSync className="animate-spin" /> : "+ Add User"}
                </Button>
            </div>
            {content}
        </div>
    )
    }

export default UsersList;