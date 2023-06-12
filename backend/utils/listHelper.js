const totalLikes = (blogs) => {
	return blogs.reduce((acc, blog) => blog.likes + acc, 0);
};

const favoriteBlog = (blogs) => {
	return blogs.reduce((acc, blog) => (acc.likes > blog.likes ? acc : blog));
};

module.exports = {
	totalLikes,
	favoriteBlog,
};
