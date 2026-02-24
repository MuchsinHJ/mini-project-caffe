export const fetchAPI = async (url: string, options: RequestInit) => {
  const response = await fetch(url, {
    headers:{
      'Content-Type': 'application/json',
    },
    ...options,
  })

  const result = await response.json();
  return result;
}
