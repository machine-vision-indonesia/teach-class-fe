import React, { useEffect, useState, useMemo, useRef } from 'react'

import mqtt from 'mqtt'

import MqttContext from './Context'
import { Error, ConnectorProps, IMqttContext } from './types'
import { env } from 'next-runtime-env'

export default function Connector({ children, options = { keepalive: 0 }, parserMethod }: ConnectorProps) {
  const brokerUrl = env('NEXT_PUBLIC_SOCKET_URL') || ''

  // Using a ref rather than relying on state because it is synchronous
  const clientValid = useRef(false)
  const [connectionStatus, setStatus] = useState<string | Error>('Offline')
  const [client, setClient] = useState<mqtt.MqttClient | null>(null)

  useEffect(() => {
    if (!client && !clientValid.current && brokerUrl) {
      // This synchronously ensures we won't enter this block again
      // before the client is asynchronously set
      clientValid.current = true
      setStatus('Connecting')
      console.log(`attempting to connect to ${brokerUrl}`)
      const mqttCon = mqtt.connect(brokerUrl, options)
      mqttCon.on('connect', () => {
        console.debug('on connect')
        setStatus('Connected')

        // For some reason setting the client as soon as we get it from connect breaks things
        setClient(mqttCon)
      })
      mqttCon.on('reconnect', () => {
        console.debug('on reconnect')
        setStatus('Reconnecting')
      })
      mqttCon.on('error', (err: any) => {
        console.log(`Connection error: ${err}`)
        setStatus(err.message)
      })
      mqttCon.on('offline', () => {
        console.debug('on offline')
        setStatus('Offline')
      })
      mqttCon.on('end', () => {
        console.debug('on end')
        setStatus('Offline')
      })
    }
  }, [client, clientValid, brokerUrl, options])

  // Only do this when the component unmounts
  useEffect(
    () => () => {
      if (client && brokerUrl) {
        console.log('closing mqtt client')
        client.end(true)
        setClient(null)
        clientValid.current = false
      }
    },
    [client, clientValid]
  )

  // This is to satisfy
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
  const value: IMqttContext = useMemo<IMqttContext>(
    () => ({
      connectionStatus,
      client,
      parserMethod
    }),
    [connectionStatus, client, parserMethod]
  )

  return <MqttContext.Provider value={value}>{children}</MqttContext.Provider>
}
