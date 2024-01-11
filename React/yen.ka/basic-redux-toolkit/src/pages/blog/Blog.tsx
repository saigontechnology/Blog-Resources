import BlogList from 'components/BlogList'
import CreateBlog from 'components/CreateBlog'

const Blog = () => {
  return (
    <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
      <CreateBlog />
      <BlogList />
    </div>
  )
}

export default Blog
