import { LayoutActionType } from 'src/types/apps/layout'
import { useEffect, useReducer } from 'react'

interface State {
  path: string | null
  layout: LayoutActionType
}

type Action =
  | { type: 'SET_PATH'; payload: string }
  | { type: 'SET_LAYOUT'; payload: string }
  | { type: 'MODIFY_PATH'; payload: string }

const initialState: State = {
  path: null,
  layout: LayoutActionType.ADMIN
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATH':
      return { ...state, path: action.payload }
    case 'MODIFY_PATH':
      return { ...state, path: action.payload }
    case 'SET_LAYOUT':
      return { ...state, path: action.payload }
    default:
      return state
  }
}

const useProductLayout = () => {
  const currentPath = window.location.pathname
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleModuleChange = (LayoutActionType: LayoutActionType) => {
    const whitelist = ['/path1', '/path2']

    if (whitelist.includes(currentPath)) {
      localStorage.removeItem('layout')
    } else {
      localStorage.setItem('layout', LayoutActionType)
    }
    dispatch({ type: 'SET_LAYOUT', payload: LayoutActionType })
  }

  useEffect(() => {
    dispatch({ type: 'SET_PATH', payload: currentPath })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [currentPath])

  return { handleModuleChange, state }
}

export default useProductLayout
