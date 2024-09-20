import { env } from 'next-runtime-env'
import { useState } from 'react'
import useWebSocket from 'react-use-websocket'
import authConfig from 'src/configs/auth'

type Identifiable = {
  id: string | number
}

export type IQuery = {
  fields: string[]
  filter?: Record<string, any>
  sort: string[]
}

export type IResponse<T> = {
  data: T[]
  event: 'init' | 'create' | 'update' | 'delete'
  type: 'ping' | 'auth' | 'subscription'
  status: 'ok' | 'error'
}

/**
 *
 * @method GET
 * @param collection, query
 * @returns response array or object depend on your request <T>
 */
function useWebSocketClient<T extends Identifiable>(collection: string, query: IQuery) {
  // ** Define Socket Url

  const parseSocket = env('NEXT_PUBLIC_SOCKET_URL')!
  const socketUrl = process.env.NEXT_PUBLIC_DATACORE_SOCKET_URL || parseSocket

  // ** State Management
  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  /**
   *
   * @returns create websocket connection and define condition
   * for each status
   */
  const websocket = useWebSocket(socketUrl, {
    onOpen: () => {
      websocket.sendJsonMessage({
        type: 'auth',
        access_token: localStorage.getItem(authConfig.accessTokenKeyName)
      })
    },
    onMessage: e => {
      const data = JSON.parse(e.data)
      handleMessage(data)
    },
    onClose: () => {
      console.log('Connection closed')
    },
    onError(event) {
      console.log('WebSocket Error:', event)
    }
  })

  /**
   *
   * @returns handle socket message depends on data type
   */
  const handleMessage = (data: IResponse<T>) => {
    switch (data.type) {
      case 'ping':
        keepAlive()
        break
      case 'auth':
        if (data.status === 'ok') {
          setIsLoading(true)
          subscribe()
        }
        break
      case 'subscription':
        switch (data.event) {
          case 'init':
            setData(data.data)
            setIsLoading(false)
            break
          case 'create':
            setData(prev => [data.data[0], ...prev])
            break
          case 'update':
            setData(prev => prev.map(item => (item.id === data.data[0].id ? data.data[0] : item)))
            break
          case 'delete':
            setData(prev => prev.filter(item => item.id !== data.data[0].id))
            break
          default:
            break
        }
        break
      default:
        break
    }
  }

  /**
   *
   * @returns unsubscribe collection and query based on params
   */
  const unsubscribe = () => {
    setIsLoading(true)
    console.log('unsubscribe')
    websocket.sendJsonMessage({
      type: 'unsubscribe',
      collection: collection,
      uid: JSON.stringify(query)
    })
  }

  /**
   *
   * @returns subscibe collection and query based on params
   */
  const subscribe = () => {
    console.log('subscribe')
    websocket.sendJsonMessage({
      type: 'subscribe',
      collection: collection,
      query: query
    })
  }

  /**
   *
   * @returns check websocker connection
   */
  const keepAlive = () => {
    websocket.sendJsonMessage({
      type: 'pong chat'
    })
  }

  return {
    data,
    unsubscribe,
    subscribe,
    isLoading
  }
}

export default useWebSocketClient
