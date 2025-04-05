import { useFetchPhotoQuery } from "../store";
import PhotoListItem from "./PhotoListItem";

function PhotoList({albumID}){

    const { data, error, isLoading } = useFetchPhotoQuery(albumID);

    const renderPhotos = () => {
        return data?.map((photo) => {
            return  <PhotoListItem key={photo.id} photo={photo} />;
        });
    }

    return (
        <div  className="flex flex-row flex-wrap  m-auto containerr">
            {renderPhotos()}
        </div>
    )

}

export default PhotoList;