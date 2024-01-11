import { Blog } from 'types/blog.type'

export interface IBlogItemProps {
  blog: Blog
  handleDelete: (blogId: string) => void
  handleStartEditing: (blogId: string) => void
}

export default function BlogItem({ blog, handleDelete, handleStartEditing }: IBlogItemProps) {
  return (
    <>
      <div className='group'>
        <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
          <img
            src={blog.featureImage}
            alt={blog.title}
            className='h-full w-full object-cover object-center lg:h-full lg:w-full'
          />
        </div>
        <div className='mt-4 flex justify-between'>
          <div>
            <h3 className='text-sm text-gray-700'>
              <a href='#'>
                <span aria-hidden='true' />
                {blog.title}
              </a>
            </h3>
            <p className='mt-1 text-sm text-gray-500'>{blog.description}</p>
          </div>
        </div>
        <div className='flex items-center py-2'>
          <button
            type='button'
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            onClick={() => handleStartEditing(blog.id)}
          >
            Edit
          </button>
          <button
            type='button'
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded ml-2'
            onClick={() => handleDelete(blog.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}
