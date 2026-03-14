import {FaHeart,FaRegHeart} from "react-icons/fa";
function PhotoCard({photo,isFavourite,onToggleFavourite}){
    return(
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <img src={`https://picsum.photos/id/${photo.id}/300/200`} alt={photo.author}  className="h-52 w-full object-cover"/>
            <div className="flex items-center justify-between p-4">
                <p className="text-sm font-medium text-gray-800">{photo.author}</p>
                <button onClick={()=>onToggleFavourite(photo.id)} className="text-2xl">{isFavourite?<FaHeart className="text-red-500 text-xl"/>:<FaRegHeart className="text-xl"/>}</button>
            </div>
        </div>

    )
};
export default PhotoCard;