import { useFetchPhotos } from "./hooks/useFetchPhotos";
import {useEffect,useReducer,useState,useCallback,useMemo} from "react";
import { favouritesReducer } from "./reducer/favouritesReducer";
import PhotoGrid from "./components/PhotoGrid";
function App(){
  const {photos,loading,error}=useFetchPhotos();
  const [favourites,dispatch]=useReducer(favouritesReducer,[],()=>{
    try{
      const savedFavourites=localStorage.getItem("favourites");
      return savedFavourites?JSON.parse(savedFavourites):[];
    }catch(error){
      return [];
    }

  });
  const [searchTerm,setSearchTerm]=useState("");
  const handleSearchChange=useCallback((e)=>{
    setSearchTerm(e.target.value.toLowerCase());
  },[]);
  const handleToggleFavourite=(id)=>{
    dispatch({
      type:"TOGGLE_FAVOURITE",
      payload:id,
    })
  }
  const filteredPhotos=useMemo(()=>{
    return photos.filter((photo)=>
    photo.author.toLowerCase().includes(searchTerm));

  },[photos,searchTerm])
  
  useEffect(()=>{
    localStorage.setItem("favourites",JSON.stringify(favourites));
  },[favourites]);
  
  if(loading){
    return (
      <div className="min-h-screen flex items-center justify-center gap-2">
       <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600">
        </div> 
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    )
  };
  if(error){
    return (
      <div className="min-h-screen flex items-center justify-center">
       <h1 className="text-2xl font-semibold">{error}</h1>
      </div>
    )
  }
  return(
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Photo Gallery</h1>
        <div className="mb-6 flex flex-col gap-4">
          <input 
            type="text"
            placeholder="Search by author"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500" />
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm sm:text-base">
              <p className="font-medium">Photos found:{filteredPhotos.length}</p>
              <p className="font-medium">Favourites:{favourites.length}</p>
            </div>
        </div>
        {filteredPhotos.length==0?(
          <p className="text-center text-lg font-medium">No photos found</p>):
          (
            <PhotoGrid photos={filteredPhotos} favourites={favourites} onToggleFavourite={handleToggleFavourite} />

          )
        }
      </div>

    </div>
  )

}
export default App;