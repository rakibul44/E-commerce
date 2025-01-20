import { Link } from 'react-router-dom';
import { blogsApi } from '../redux/apis/blogsApi';

const Blog = () => {
  const {data: blogsData } = blogsApi.useGetAllBlogsQuery();
  const blogs = blogsData?.data?.blogs || [];


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Blog</h1>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.length > 0 && blogs?.map(blog => (
          <div key={blog?._id} className="border rounded-lg shadow-lg overflow-hidden" >
            <img src={blog?.image} alt={blog?.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{blog?.title}</h2>
              <p className="text-gray-600 mb-4">{blog?.shortDescription?.length > 200 ? blog?.shortDescription?.slice(0,200) + "..": blog?.shortDescription }</p>
              <Link to={"/product"} className="text-blue-500 hover:underline">View more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
