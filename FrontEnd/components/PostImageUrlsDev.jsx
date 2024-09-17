import React from 'react';

const PostImageUrlsDev = ({ images, onImageChange }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-5 flex flex-col bg-white rounded-md shadow-md w-full max-w-md mx-auto">
        <label className="text-lg font-semibold mb-3 text-center">Image URLs: ( DEV ONLY) </label>
        {images.map((url, index) => (
          <input
            key={index}
            type="text"
            value={url}
            onChange={(e) => onImageChange(index, e.target.value)}
            placeholder={`Image URL ${index + 1}`}
            className="mb-2 p-2 border border-gray-300 rounded-md w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default PostImageUrlsDev;
