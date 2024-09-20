import { useState } from 'react'
import useWebSocket from 'react-use-websocket'
import authConfig from 'src/configs/auth'

export default function useSocketChat({ query = {}, collection }: { query?: any; collection?: string }) {
  const restURL = new URL(process.env.NEXT_PUBLIC_REST_API_URL!)
  const devsocketUrl = `ws://${restURL.hostname}/websocket`
  const socketUrl = process.env.NEXT_PUBLIC_DATACORE_SOCKET_URL || devsocketUrl

  const [lastJsonCreateMessage, setLastCreateMessage] = useState<any>(null)

  const { sendJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {
    onOpen: () => {
      sendJsonMessage({
        type: 'auth',
        access_token: localStorage.getItem(authConfig.accessTokenKeyName)
      })
    },

    onMessage: e => {
      const data = JSON.parse(e.data)

      if (data.type === 'ping') {
        sendJsonMessage({
          type: 'pong chat'
        })
      }

      if (data.type === 'auth' && data.status === 'ok') {
        sendJsonMessage({
          type: 'subscribe',
          collection,
          event: 'create',
          uid: JSON.stringify(query),
          query
        })
      }

      if (data.type === 'subscription' && data.event === 'create') {
        const [newMessage] = data?.data
        setLastCreateMessage(newMessage)
      }
    }
  })

  const unsubscribe = () => {
    sendJsonMessage({
      type: 'unsubscribe',
      collection,
      event: 'create',
      uid: JSON.stringify(query)
    })
  }

  return {
    sendJsonMessage,
    readyState,
    lastJsonCreateMessage,
    unsubscribe,
    getWebSocket
  }
}
