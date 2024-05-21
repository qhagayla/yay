import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "@/redux/video/videoSlice";
import convertDateTime from "@/utils/convertDateTime";


const formatMovementType = (movementType) => {
    return movementType
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

function VideoDashboard() {
    const dispatch = useDispatch();
    const [movementType, setMovementType] = useState('all');
    const { videos, isLoading, isError } = useSelector((state) => state.video);

    useEffect(() => {
        dispatch(fetchVideos(movementType));
    }, [dispatch, movementType]);

    const handleFilterChange = (type) => {
        setMovementType(type);
    };

    return (
        <div className="p-6">
            <div className="flex gap-2 mb-4">
                <button 
                    onClick={() => handleFilterChange('all')} 
                    className={`btn ${movementType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    All
                </button>
                <button 
                    onClick={() => handleFilterChange('run')} 
                    className={`btn ${movementType === 'run' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Run
                </button>
                <button 
                    onClick={() => handleFilterChange('gallop')} 
                    className={`btn ${movementType === 'gallop' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Gallop
                </button>
                <button 
                    onClick={() => handleFilterChange('hop')} 
                    className={`btn ${movementType === 'hop' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Hop
                </button>
                <button 
                    onClick={() => handleFilterChange('leap')} 
                    className={`btn ${movementType === 'leap' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Leap
                </button>
                <button 
                    onClick={() => handleFilterChange('horizontal_jump')} 
                    className={`btn ${movementType === 'horizontal_jump' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Horizontal Jump
                </button>
                <button 
                    onClick={() => handleFilterChange('slide')} 
                    className={`btn ${movementType === 'slide' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Slide
                </button>
                <button 
                    onClick={() => handleFilterChange('skip')} 
                    className={`btn ${movementType === 'skip' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out px-4 py-2 rounded`}
                >
                    Skip
                </button>
            </div>
            
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error loading videos</div>
            ) : videos.length === 0 ? (
                <div>Currently no available videos</div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <Link to={`/video-dashboard/watch/${video.id}`} key={video.id}>
                            <div className="p-3 border rounded-lg gap-2 flex flex-col">
                                <div className="cursor-pointer">
                                    <video src={video.video} type="video/mp4" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-2xl font-bold">
                                    {formatMovementType(video.movement_type)}
                                    </h3>
                                    <div className="flex flex-col">
                                        <span className="text-sm">
                                            {video.client_name}
                                        </span>
                                        <span className="text-sm">
                                            {convertDateTime(video.upload_date)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default VideoDashboard;
