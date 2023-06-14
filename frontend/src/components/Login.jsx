const Login = ({ username, password, onChange, onSubmit }) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor="username">Username</label>
				<br />
				<input type="text" name="username" id="username" onChange={onChange} value={username} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<br />
				<input type="password" name="password" id="password" onChange={onChange} value={password} />
			</div>
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
