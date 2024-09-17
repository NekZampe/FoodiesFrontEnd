import React, { useState } from 'react';

const PostDescription = ({ description = '', onDescriptionChange, maxLength = 100 }) => {
  const [remainingCharacters, setRemainingCharacters] = useState(maxLength);

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setRemainingCharacters(maxLength - newDescription.length);
    // Notify parent component about the change
    onDescriptionChange(newDescription);
  };

  return (
    <div className='p-5 flex flex-col'>
      <label className='font-bold mb-2'>Image Description:</label>
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter image description"
        maxLength={maxLength}
        className='border border-gray-300 p-2 rounded-md w-full'
      />
      <p className='text-sm text-gray-500 mt-2'>{remainingCharacters} characters remaining</p>
    </div>
  );
};

export default PostDescription;
