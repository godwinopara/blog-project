import { useState } from "react";
import blogService from "../services/blogs";

const AddBlog = ({ showBlogForm }) => {
	const [blogDetails, setBlogDetails] = useState({ title: "", author: "", url: "" });

	const handleSubmit = async (e) => {
		e.preventDefault();
		await blogService.addBlog(blogDetails);
	};

	return (
		<>
			{showBlogForm && (
				<form onSubmit={handleSubmit}>
					<h2>Add New Blog</h2>
					<div>
						<label htmlFor="title">Title</label>
						<input type="text" name="title" id="title" value={blogDetails.title} onChange={(e) => setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value })} />
					</div>
					<div>
						<label htmlFor="title">Author</label>
						<input type="text" name="author" id="author" value={blogDetails.author} onChange={(e) => setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value })} />
					</div>
					<div>
						<label htmlFor="title">url</label>
						<input type="text" name="url" id="url" value={blogDetails.url} onChange={(e) => setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value })} />
					</div>

					<button>Create</button>
				</form>
			)}
		</>
	);
};

export default AddBlog;
