import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { Omit } from '@reduxjs/toolkit/dist/tsHelpers'
import { initialBlogList } from 'constants/blog'
import { Blog } from 'types/blog.type'

interface BlogState {
  blogList: Blog[]
  editingBlog: Blog | null
}

const initialState: BlogState = {
  blogList: initialBlogList,
  editingBlog: null
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    deleteBlog: (state, action: PayloadAction<string>) => {
      const blogId = action.payload
      const foundBlogIndex = state.blogList.findIndex((blog) => blog.id === blogId)

      if (foundBlogIndex !== -1) {
        state.blogList.splice(foundBlogIndex, 1)
      }
    },
    startEditingBlog: (state, action: PayloadAction<string>) => {
      const blogId = action.payload
      const foundBlog = state.blogList.find((blog) => blog.id === blogId) || null
      state.editingBlog = foundBlog
    },
    cancelEditingBlog: (state) => {
      state.editingBlog = null
    },
    finishEditingBlog: (state, action: PayloadAction<Blog>) => {
      const blogId = action.payload.id
      state.blogList.some((blog, index) => {
        if (blog.id === blogId) {
          state.blogList[index] = action.payload

          return true
        }

        return false
      })

      state.editingBlog = null
    },
    addBlog: {
      reducer: (state, action: PayloadAction<Blog>) => {
        const blog = action.payload
        state.blogList.push(blog)
      },
      prepare: (blog: Omit<Blog, 'id'>) => ({
        payload: {
          ...blog,
          id: nanoid()
        }
      })
    }
  }
})

export const { addBlog, cancelEditingBlog, deleteBlog, startEditingBlog, finishEditingBlog } = blogSlice.actions
const blogReducer = blogSlice.reducer

export default blogReducer
