export function formatParams(params?: IParams | string): string {
  let query = ''
  if (typeof params === 'object') {
    query += '?'
    const q: string[] = []
    Object.keys(params).forEach(param => {
      if (params[param as keyof IParams] || params[param as keyof IParams] === 0) {
        q.push(`${param}=${params[param as keyof IParams]}`)
      }
    })
    query += q.join('&')
  } else if (typeof params === 'string') {
    query += '?' + params
  }

  return query
}
