import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, startEditingBlog } from 'redux/blog.slice'
import { RootState } from 'redux/store'
import BlogItem from '../BlogItem'

export interface IBlogListProps {}

export default function BlogList(props: IBlogListProps) {
  const blogList = useSelector((state: RootState) => state.blog.blogList)
  const dispatch = useDispatch()

  const handleDelete = (blogId: string) => {
    dispatch(deleteBlog(blogId))
  }

  const handleStartEditing = (blogId: string) => {
    dispatch(startEditingBlog(blogId))
  }

  return (
    <div className='bg-white'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Travel Blog</h2>
      <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {blogList.map((blog) => (
          <BlogItem blog={blog} key={blog.id} handleDelete={handleDelete} handleStartEditing={handleStartEditing} />
        ))}
      </div>
    </div>
  )
}
