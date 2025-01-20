import { Link } from "react-router-dom";
import { blogsApi } from "../../../redux/apis/blogsApi";
// import { MdOutlineDeleteForever } from "react-icons/md";
// import Swal from "sweetalert2";
// import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useBaseRoute from "../../../hooks/useBaseRoute";

const AllBlogs = () => {
    
   const {data: blogsData , refetch} = blogsApi.useGetAllBlogsQuery();
   const [deleteBlog ] = blogsApi.useDeleteBlogMutation();
   const blogs = blogsData?.data?.blogs || [];
   const { baseRoute } = useBaseRoute();

   
  //  handle delte a blog
   const handleDeleteBlog = async (id, blogTitle) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert ${blogTitle}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(id).then((res) => {
          if (res?.data?.success)
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${blogTitle} has been deleted `,
              icon: "success",
            });
        });
      }
    });
  };
    return (
      <div className="w-full">
  <div className="flex justify-between px-4 mb-3 mt-4">
    <h3 className="text-xl font-semibold">All blogs</h3>
    <Link
      to={`${baseRoute}/add-blog`}
      className="px-3 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white text-sm"
    >
      Add New Blog
    </Link>
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse border border-gray-200">
      {/* Table Head */}
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Si</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs?.length > 0 ? (
          blogs.map((blog, i) => (
            <tr key={blog?._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg overflow-hidden">
                    <img
                      src={blog?.image}
                      alt="blog img"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">{blog?.title}</td>
              <td className="border border-gray-300 px-4 py-2">{blog?.categoryId?.name}</td>
              <td className="border border-gray-300 px-4 py-2">{blog?.authorId?.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(blog?.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2 flex gap-2">
                <Link to={`${baseRoute}/update-blog/${blog?._id}`}>
                  <span className="text-green-500 text-xl cursor-pointer hover:scale-110">✏️</span>
                </Link>
                <span
                  onClick={() => handleDeleteBlog(blog?._id, blog?.title)}
                  className="text-red-500 text-xl cursor-pointer hover:scale-110"
                >
                  🗑️
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center px-4 py-2">
              Blogs not found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    );
};

export default AllBlogs;