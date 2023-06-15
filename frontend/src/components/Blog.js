import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
	const [showBlogDetails, setShowBlogDetails] = useState(false);

	const handleClick = async () => {
		const blogToUpdate = { ...blog };
		blogToUpdate.likes += 1;
		const updateBlog = await blogService.updateBlog(blogToUpdate);
	};

	return (
		<div style={{ border: "1px solid black", padding: "10px", width: "500px", marginTop: "20px" }}>
			<p>
				{blog.title} ---- {blog.author} <button onClick={() => setShowBlogDetails((prev) => !prev)}>{showBlogDetails ? "hide" : "show"}</button>
			</p>
			{showBlogDetails && (
				<>
					<p>{blog.url}</p>
					<div>
						{blog.likes} <button onClick={handleClick}>Like</button>{" "}
					</div>
				</>
			)}
		</div>
	);
};

export default Blog;
