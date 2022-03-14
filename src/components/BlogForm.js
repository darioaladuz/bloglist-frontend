const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, likes, setLikes, setNewBlog, setMessage }) => {

  const updateTitle = (e) => {
    setTitle(e.target.value);
  }

  const updateAuthor = (e) => {
    setAuthor(e.target.value);
  }

  const updateUrl = (e) => {
    setUrl(e.target.value);
  }

  const updateLikes = (e) => {
    setLikes(Number(e.target.value));
  }

  const submitBlog = (e) => {
    e.preventDefault();
    const blog = {
      title,
      author,
      url,
      likes
    }
    setNewBlog(blog);
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
    setMessage({
      text: 'Blog added successfully',
      type: 'success'
    })
  }

  return (
    <div>
      <form onSubmit={submitBlog}>
        <input onChange={updateTitle} value={title} name="title" placeholder="Title" required />
        <input onChange={updateAuthor} value={author} name="author" placeholder="Author" required />
        <input onChange={updateUrl} value={url} name="url" placeholder="URL" required />
        <input onChange={updateLikes} value={likes} name="likes" placeholder="Likes" type="number" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
  
  export default BlogForm