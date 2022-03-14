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
        text: 'There was an error',
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
        <h4>{blog.likes} likes <button>like</button></h4>
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