import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { MdDelete, MdEditDocument } from 'react-icons/md';

const PostComment = ({ recipe_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [error, setError] = useState(null);
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/comments/${recipe_id}`);
        if (!response.ok) {
          throw new Error('Error fetching comments. Please try again.');
        }
        const data = await response.json();
        setComments(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchComments();
  }, [recipe_id]);

  const isUnauthorized = () => {
    const accessToken = localStorage.getItem('access_token');
    return !accessToken;
  };

  const handleAddComment = (e) => {
    const accessToken = localStorage.getItem('access_token');
    e.preventDefault();
    
    // Perform the API call to add the comment
    fetch('https://dishi-tamu-webapp-backend.onrender.com/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        comment: newComment,
        recipe_id: recipe_id,
        user_name: "You"
        
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        return response.json();
      })
      .then(data => {
        // Update the comment with the actual data from the server
        setComments([...comments, data.comment]);
        setNewComment(''); // Clear the input field after successful post
      })
      .catch(error => {
        setError('Error adding comment. Please try again.');
      });
  };

  const handleDeleteComment = async (commentId) => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      setError('Token not found. Please login to delete comments.');
      return;
    }

    try {
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        setError(null);
        alert('Comment deleted successfully');
      } else {
        if (response.status === 401) {
          setError('Unauthorized to delete the comment.');
        } else {
          throw new Error('Error deleting comment. Please try again.');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditComment = (commentId, commentText) => {
    if (isUnauthorized()) {
      setError('Unauthorized to edit the comment.');
      return;
    }

    setNewComment(commentText);
    setEditingCommentId(commentId);
  };

  const handleSaveComment = async (commentId) => {
    const accessToken = localStorage.getItem('access_token');
    
    if (!accessToken) {
      setError('Token not found. Please login to edit comments.');
      return;
    }

    try {
      const response = await fetch(`https://dishi-tamu-webapp-backend.onrender.com/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          comment: newComment,
        }),
      });

      if (response.ok) {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId ? { ...comment, comment: newComment } : comment
        );
        setComments(updatedComments);
        setEditingCommentId(null);
        setError(null);
      } else {
        if (response.status === 401) {
          setError('Unauthorized to edit the comment.');
        } else {
          throw new Error('Error saving comment. Please try again.');
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setNewComment('');
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleDropdown = (index) => {
    setDropdown(dropdown === index ? null : index);
  };

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-lg relative">
          <p className="text-xl">
            {error}{' '}
            <span
              className="cursor-pointer absolute top-0 right-0 mr-2 mt-1"
              onClick={() => setError(null)}
            >
              &#10006;
            </span>
          </p>
        </div>
      )}

      <div className='border border-gray-300 py-8 px-4'>
        <h1 className='text-3xl mb-4 font-display font-semibold'>Comments Section</h1>
        <div className='grid gap-6'>
          {comments.map((item) => (
            <div className='bg-gray-200 py-4 px-4 rounded-md relative' key={item.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-4 ">
                  <FaUser />
                  <p className='text-lg '>{item.user_name}</p>
                </div>
                <div>
                  <BiDotsHorizontalRounded size={25} onClick={() => handleDropdown(item.id)} />
                </div>
              </div>
              {dropdown === item.id && (
                <div className='absolute top-0 right-4 p-4 bg-white grid gap-2 shadowy' onClick={() => setDropdown(null)}>
                  <button onClick={() => handleEditComment(item.id, item.comment)} className='flex gap-2 border border-orange-500 p-1 hover:bg-orange-200'><MdEditDocument />Edit</button>
                  <button onClick={() => handleDeleteComment(item.id)} className='flex gap-2 border border-orange-500 p-1 hover:bg-red-700'><MdDelete />Delete</button>
                </div>
              )}
              {editingCommentId === item.id ? (
                <div className='bg-gray-200 py-4 px-4 rounded-md relative'>
                  <textarea
                    value={newComment}
                    onChange={handleChange}
                    className='border border-orange-500 text-lg w-full bg-transparent p-4 focus:outline-none'
                  ></textarea>
                  <button onClick={() => handleSaveComment(item.id)} className='px-8 py-2 justify-end rounded bg-orange-500 text-white font-medium text-lg'>
                    Save
                  </button>
                  <button onClick={() => setEditingCommentId(null)} className='px-4 py-2 rounded bg-gray-500 text-white font-medium text-lg'>
        &#10006; {/* 'x' button */}
      </button>
                </div>
              ) : (
                <p className='font-display text-md'>{item.comment}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <h1 className='text-3xl mb-4 font-display font-semibold'>Write a comment</h1>
        <p>
          <span className='text-orange-500'>Login</span> to post comment
        </p>
      </div>

      <form onSubmit={handleAddComment} className='bg-gray-200 p-4 rounded'>
        <textarea
          name="comment"
          rows="3"
          value={newComment}
          onChange={handleChange}
          className='border text-lg w-full bg-transparent p-2 focus:outline-none'
          placeholder="you"
        > 
        
        </textarea>
        <div className='flex justify-end'>
          <button type='submit' className='px-8 py-2 justify-end rounded bg-orange-500 text-white font-medium text-lg'>
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
