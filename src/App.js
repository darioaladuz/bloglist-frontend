import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import './Message.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');
  const [newBlog, setNewBlog] = useState({});

  const isInitialMount = useRef(true);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user');
    if(loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [])

  useEffect(async () => {
    if(isInitialMount.current){
      isInitialMount.current = false;
    } else {
      console.log('hello');
      await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
    }
  }, [newBlog])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000)
  }, [message])

  const logout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    blogService.setToken(null);
    setMessage({
      text: 'Logged out',
      type: 'success'
    })
  }

  return (
    <div>
      {
        message === null
        ? ''
        : <Message message={message} />
      }
      {
        user === null 
        ? <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
        loginService={loginService}
        setMessage={setMessage}
      />
        : 
        <div>
          <p>{user.username} <button onClick={logout}>log out</button></p>
          <BlogForm 
        title={title} 
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        likes={likes}
        setLikes={setLikes}
        setNewBlog={setNewBlog}
        setMessage={setMessage}
      />
        </div>
      }
      
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={Math.random()} blog={blog} setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App
