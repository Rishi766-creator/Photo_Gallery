import PhotoCard from "./PhotoCard";
function PhotoGrid({photos,favourites,onToggleFavourite}){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {photos.map((photo)=>(
                <PhotoCard key={photo.id} photo={photo} isFavourite={favourites.includes(photo.id)} onToggleFavourite={onToggleFavourite} />

            ))}
        </div>
    )
};
export default PhotoGrid;