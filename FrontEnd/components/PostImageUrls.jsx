import React, { useState } from 'react';

const PostImageUrls = ({ onImagesUpload }) => {
  const [base64Images, setBase64Images] = useState([]);

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    const images = await Promise.all(Array.from(files).slice(0, 3).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Base64 string
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));

    setBase64Images(images); // Update state with base64 images
    onImagesUpload(images);  // Pass images to parent form
  };

  // Calculate the percentage of image capacity filled
  const capacityFilled = (base64Images.length / 3) * 100;

  return (
    <div className='p-5 flex flex-col'>
      <label>Upload Images (Max 3):</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />

      <div className='mt-3'>
        <div 
          className='w-full h-6 bg-gray-200 border rounded relative'
        >
          <div 
            className='h-full bg-green-500 text-center text-white'
            style={{ width: `${capacityFilled}%`, backgroundColor: capacityFilled === 100 ? 'green' : 'gray' }}
          >
            {base64Images.length}/3
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostImageUrls;
