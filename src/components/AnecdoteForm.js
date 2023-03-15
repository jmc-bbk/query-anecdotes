import { useMutation, useQueryClient } from 'react-query'
import { newAnecdote } from '../requests'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(newAnecdote, {
    onSuccess: (data) => {
      const { content } = data
      queryClient.invalidateQueries('getAnecdotes')
      notificationDispatch({ type: 'SET', notification: `Anecdote ${content} was added!` })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      notificationDispatch({ type: 'SET', notification: `Error! ${errorMessage}.` })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
