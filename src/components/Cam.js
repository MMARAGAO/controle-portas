import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cam = () => {
    const [cameraSrc, setCameraSrc] = useState([]);
    const [portSrc, setPortSrc] = useState([]);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [fullScreenImg, setFullScreenImg] = useState(null);

    useEffect(() => {
        const fetchStatus = () => {
            axios.get('http://localhost:3001/status')
                .then((response) => {
                    setData(response.data.result1);
                    setData2(response.data.result2);
                });
        };

        fetchStatus();

        const intervalId = setInterval(fetchStatus, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCameraSrc([
            { id: 1, url: 'http://10.19.1.232:5000/video_feed1' },
            { id: 2, url: 'http://10.19.1.232:5000/video_feed2' },
        ]);

        setPortSrc([
            { id: 3, url: 'http://10.19.1.232:5000/video_feed3' },
            { id: 5, url: 'http://10.19.1.232:5000/video_feed4' },
            { id: 15, url: 'http://10.19.1.232:5000/video_feed5' },
            { id: 4, url: 'http://10.19.1.232:5000/video_feed6' },
            { id: 14, url: 'http://10.19.1.232:5000/video_feed7' },
            { id: 8, url: 'http://10.19.1.232:5000/video_feed8' }
        ]);
    }, []);

    const handleImageDoubleClick = (url) => {
        setFullScreenImg(url);
    };

    const handleCloseFullScreenImg = () => {
        setFullScreenImg(null);
    };

    const renderImage = (item, index, idKey, isData2) => {
        if (item.status === (idKey === 'id' ? 1 : 0) && item[idKey] !== 8) {
            const video = (isData2 ? cameraSrc : portSrc).find(video => video.id === item[idKey]);
            return video && (
                <img
                    key={index}
                    src={video.url}
                    className={`w-full rounded-xl ${fullScreenImg === video.url ? 'fixed top-0 h-screen w-full cursor-pointer' : 'cursor-pointer'}`}
                    onDoubleClick={() => handleImageDoubleClick(video.url)}
                />
            );
        }
    };

    return (
        <div className='lg:w-3/4 w-full px-2 lg:px-0'>
            <div className='dark:bg-gray-700 bg-gray-100 shadow-inner p-4 rounded-xl space-y-4'>
                {fullScreenImg && (
                    <img
                        src={fullScreenImg}
                        alt='Full Screen Image'
                        className='fixed top-0 left-0 h-screen w-full cursor-pointer'
                        onDoubleClick={handleCloseFullScreenImg}
                    />
                )}
                <img src={portSrc.find(video => video.id === 8)?.url} alt='Camera 8' className='w-full rounded-xl cursor-pointer' onDoubleClick={() => handleImageDoubleClick(portSrc.find(video => video.id === 8)?.url)} />
                {data2.map((item, index) => renderImage(item, index, 'id', true))}
                {data.map((item, index) => renderImage(item, index, 'id_port', false))}
            </div>
        </div>
    );
};

export default Cam;
