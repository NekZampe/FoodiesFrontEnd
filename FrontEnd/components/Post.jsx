import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const Post = ({ post }) => {
  // Ensure ImageUrls is always an array
  const imageUrls = Array.isArray(post.imageUrls) ? post.imageUrls : [];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 max-w-xl mx-auto lg:max-w-2xl">
      {/* Header with publisher and date */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold text-xl">
            {post.publisher[0]}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-800">{post.publisher}</p>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      {/* Image carousel */}
      <div className="relative w-full h-80">
        {imageUrls.length > 0 ? (
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {imageUrls.map((url, index) => (
              url && (
                <SwiperSlide key={index}>
                  <img 
                    src={url} 
                    alt={`Post image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              )
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No images available</div>
        )}
      </div>

      {/* Post content */}
      <div className="p-4">
        <p className="text-gray-800 mb-2 font-semibold">{post.restaurantName}</p>
        <p className="text-gray-600 mb-2">{post.restaurantAddress}</p>
        <p className="text-gray-800 mb-4">{post.content}</p>
        <div className="text-gray-600 text-sm">
          {post.likeCount} likes
        </div>
      </div>
    </div>
  );
};

export default Post;
