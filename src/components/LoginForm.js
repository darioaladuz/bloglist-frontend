import blogService from '../services/blogs'

const LoginForm = ({ username, setUsername, password, setPassword, setUser, loginService, setMessage }) => {
    
    const updateUsername = (e) => {
        setUsername(e.target.value);
    } 

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const login = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            })
            blogService.setToken(user.token);
            setUser(user);
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            console.log(user);
            setMessage({
                text: 'Logged in succesfully',
                type: 'success'
            })
        } catch(error) {
            console.error(error);
            setMessage({
                text: 'Wrong credentials',
                type: 'error'
            })
        }

        setUsername('');
        setPassword('');
    } 

    return (
    <div style={{border: '1px solid black', width: '300px', padding: '32px'}}>
      <form onSubmit={login}>
        <input onChange={updateUsername} name="username" value={username} type="text" required placeholder="username" />
        <input onChange={updatePassword} name="password" value={password} type="password" required placeholder="password" />
        <button type="submit">log in</button>
      </form>
    </div>  
    )
  }
  
  export default LoginForm