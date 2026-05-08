import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import contentService from '../services/content.service';

const PublicLive = () => {
  const { teacherId } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchLiveContent = async () => {
    try {
      const response = await contentService.getLiveContent(teacherId);
      setContent(response.content);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };
  
  useEffect(() => {
    fetchLiveContent();
    const interval = setInterval(fetchLiveContent, 30000);
    return () => clearInterval(interval);
  }, [teacherId]);
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold">Live Broadcast</h1><p className="text-gray-600">Teacher ID: {teacherId}</p></div>
        {!content ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center"><div className="text-6xl mb-4">📺</div><h2 className="text-2xl font-semibold">No Content Available</h2><p className="text-gray-600">No active content broadcasting at the moment.</p></div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden relative">
            <img src={content.fileUrl} alt={content.title} className="w-full h-96 object-cover" />
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2"><div className="w-2 h-2 bg-white rounded-full animate-pulse"></div><span>LIVE</span></div>
            <div className="p-6"><h2 className="text-2xl font-bold">{content.title}</h2><p className="text-gray-600 mb-2">Subject: {content.subject}</p><p>{content.description}</p>
            <div className="mt-4 pt-4 border-t"><div className="flex justify-between text-sm text-gray-500"><span>Teacher: {content.teacherName}</span><span>Duration: {content.rotationDuration}s</span></div></div></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLive;