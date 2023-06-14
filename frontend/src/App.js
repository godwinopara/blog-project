import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import authService from "./services/auth";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [userDetails, setUserDetails] = useState({ username: "", password: "" });
	const [isloggedIn, setIsloggedIn] = useState(false);
	const [user, setUser] = useState(null);

	/* =======================================  */
	/* ======================================= */

	useEffect(() => {
		getUserData();
	}, [isloggedIn]);

	/* =======================================  */
	/* ======================================= */

	async function getUserData() {
		const userData = JSON.parse(localStorage.getItem("userToken"));

		if (userData) {
			setIsloggedIn(true);
			setUser(userData);
			blogService.getAll().then((blogs) => setBlogs(blogs));
		}
	}

	/* =======================================  */
	/* ======================================= */

	const displayBlogs = () => {
		return blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
	};

	/* =======================================  */
	/* ======================================= */

	const handleOnChange = (e) => {
		setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
	};

	/* =======================================  */
	/* ======================================= */

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const logUserIn = await authService.login(userDetails);
			// blogService.setToken(logUserIn.token);
			localStorage.setItem("userToken", JSON.stringify(logUserIn));
			setUserDetails({ username: "", password: "" });
			setIsloggedIn(true);
		} catch (error) {
			console.error(error);
		}
	};

	/* =======================================  */
	/* ======================================= */

	const handleLogout = () => {
		localStorage.removeItem("userToken");
		setIsloggedIn(false);
	};

	/* =======================================  */
	/* ======================================= */

	return (
		<div>
			{!isloggedIn && <Login onSubmit={handleSubmit} onChange={handleOnChange} username={userDetails.username} password={userDetails.password} />}
			{isloggedIn && (
				<div>
					<h2>blogs</h2>
					<div>
						{user?.name} Logged In <button onClick={handleLogout}>Logout</button>
					</div>
					<br />
					<div>{displayBlogs()}</div>
				</div>
			)}
		</div>
	);
};

export default App;
