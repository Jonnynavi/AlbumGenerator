import { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation, useAddPhotoMutation } from "../store";
import { FaRegTrashCan, FaSpinner} from "react-icons/fa6";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";
import PhotoList from "./PhotoList";

function AlbumList({user}){
    const { data, error, isLoading } = useFetchAlbumsQuery(user);
    const [addAlbum, { isLoading: isAddingAlbum }] = useAddAlbumMutation();
    const [removeAlbum, {isLoading: isRemovingAlbum}] = useRemoveAlbumMutation();
    const [addPhoto] = useAddPhotoMutation();
    
    const handleRemoveAlbum = (album) => {
        removeAlbum(album);
    }

    const handleAddAlbun = () => {
        addAlbum(user);
    }

    const handleAddPhoto = (albumId) => {
        console.log(albumId);
        addPhoto(albumId);
    }

    let content;
    if(isLoading){
        content = <Skeleton times={3} />
    }else if(error){
        content = <div>Error loading albums.</div>
    }else{
        content = data.map((album) => {
            const header = <div className="flex flex-row items-center justify-between">
                <div className="mr-2">
                    {isRemovingAlbum ? <FaSpinner className="animate-spin"/> : <FaRegTrashCan className="cursor-pointer text-xl" onClick={() => handleRemoveAlbum(album)}/>}
                </div>
                {album.title}
            </div>
            
            return <ExpandablePanel key={album.id} header={header}>
                <Button className="mb-2" onClick={() => handleAddPhoto(album.id)}>Add Photo</Button>
                <div className="w-4.9/5 mr-auto">
                    <PhotoList albumID={album.id} />                    
                </div>
            </ExpandablePanel>
        });
    }

    return (
        <div>
            <div className="flex flex-row justify-between m-3 items-center">
                <div>Albums for {user.name}</div>
                <Button onClick={handleAddAlbun} >+ Add Album</Button>
            </div>
            <div className="w-full">{content}</div>
        </div>
    );
}

export default AlbumList;