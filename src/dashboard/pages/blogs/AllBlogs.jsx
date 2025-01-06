import { Link } from "react-router-dom";
import { blogsApi } from "../../../redux/apis/blogsApi";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const AllBlogs = () => {
    
   const {data: blogsData , refetch} = blogsApi.useGetAllBlogsQuery();
   const [deleteBlog ] = blogsApi.useDeleteBlogMutation();
   const blogs = blogsData?.data?.blogs || [];
  
   
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
        <div className=" w-full">
          <div className=" flex justify-between  md:px-4 mb-3 mt-4 ">
            <h3 className=" text-xl font-semibold">All blogs </h3>
            <Link to={`/dashboard/add-blog`} className=" px-2 py-1 bg-blue-500 hover:bg-blue-700 rounded text-white text-[16px]">Add New Blog</Link>
          </div>
      <div className="container overflow-x-auto">
       <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Si </th>
        <th>Image</th>
        <th>Title</th>
        <th>Category</th>
        <th>Author</th>
        <th>Created At</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
      blogs?.length > 0 ?  blogs?.map((blog, i) => (<tr key={blog?._id}>
        <th>
          { i + 1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={blog?.image}
                  alt="blog img" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
         { blog?.title }
        </td>
        <td>{blog?.categoryId?.name}</td>
        <td>
          {blog?.authorId?.name}
        </td>
        <td>
          {
          new Date(blog?.createdAt).toLocaleDateString()
          }
        </td>
        <td className=" flex gap-2">
          <Link to={`/dashboard/update-blog/${blog?._id}`}> <FaEdit className=" text-green-500 text-xl "/> </Link>
          <MdOutlineDeleteForever onClick={( ) => handleDeleteBlog(blog?._id, blog?.title)} className=" text-rose-600 text-xl"/>
     
        </td>
      </tr>)) :
         <p>Blogs not found</p>
     }

    </tbody>

  </table>
</div>
        </div>
    );
};

export default AllBlogs;