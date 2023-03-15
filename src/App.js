import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (data) => {
      const { content } = data
      queryClient.invalidateQueries('getAnecdotes')
      notificationDispatch({ type: 'SET', notification: `You voted for ${content}!` })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
    }
  })

  const res = useQuery(
    'getAnecdotes',
    getAnecdotes
  )

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote)
  }

  if (res.isLoading) {
    return <div>Loading!</div>
  }

  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
