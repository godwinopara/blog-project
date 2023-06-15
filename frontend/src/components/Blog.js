import { useState } from "react";

const Blog = ({ blog }) => {
	const [showBlogDetails, setShowBlogDetails] = useState(false);

	return (
		<div style={{ border: "1px solid black", padding: "10px", width: "500px", marginTop: "20px" }}>
			<p>
				{blog.title} ---- {blog.author} <button onClick={() => setShowBlogDetails((prev) => !prev)}>{showBlogDetails ? "hide" : "show"}</button>
			</p>
			{showBlogDetails && (
				<>
					<p>{blog.url}</p>
					<p>{blog.likes}</p>
				</>
			)}
		</div>
	);
};

export default Blog;
