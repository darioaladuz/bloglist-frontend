import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({blog, setMessage, blogs, setBlogs}) => {
  const [view, setView] = useState(false);

  const updateView = () => {
    setView(!view);
  }

  const handleDeleteBlog = async () => {
    console.log(blog);
    try {
      await blogService.deleteBlog(blog);
      setMessage({
        text: 'Blog deleted successfully',
        type: 'success'
      })
      const newBlogs = blogs.filter(b => b._id !== blog._id)
      setBlogs(newBlogs);
    } catch(error) {
      setMessage({
        text: 'You can only delete your own blogs',
        type: 'error'
      })
    }
  }


  // bug:
  // I passed the entire blog object including id
  // that threw a casterror
  // fix:
  // create new object without id, just body

  const handleLike = async () => {
    blog.likes = blog.likes + 1;
    const likedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
    console.log(blog);
    try {
      await blogService.update(likedBlog, blog._id);
      setBlogs(b => b._id !== blog._id ? b : blog);
      setMessage({
        text: 'Blog updated successfully',
        type: 'success'
      })
    } catch(error) {
      console.error(error);
      setMessage({
        text: error.message,
        type: 'error'
      })
    }
  }

  return (
    <div style={{border: '1px solid black', width: '300px', padding: '32px'}}>
      {
      view 
    ? <>
        <button onClick={updateView}>hide</button>
        <h2>{blog.title}</h2>
        <p>
          <a href={blog.url}>Link</a>
        </p>
        <h3>
          {blog.author}
        </h3>
        <h4>{blog.likes} likes <button onClick={handleLike}>like</button></h4>
      </>
    : <>
      <button onClick={updateView}>view</button>
      <h2>{blog.title}</h2>
    </>
    }
    <button onClick={handleDeleteBlog}>delete</button>
  </div> 
  )
}

export default Blog