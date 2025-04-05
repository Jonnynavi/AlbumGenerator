import { FaRegTrashCan, FaSpinner} from "react-icons/fa6";
import { useRemovePhotoMutation } from "../store";

function PhotoListItem({photo}){
    const [removePhoto, {isLoading}] = useRemovePhotoMutation();
    const handleRemovePhoto = (e) => {
        removePhoto(photo.id);
    }

    return (
        <div className="relative">
            <img src={photo.url} alt={photo?.title || "photo"} className="h-40 w-40 rounded-lg m-2" />
            <FaRegTrashCan onClick={handleRemovePhoto} className="absolute top-3 start-3 hover:text-red-600 hover:text-lg cursor-pointer" />
        </div>
    );
}

export default PhotoListItem;