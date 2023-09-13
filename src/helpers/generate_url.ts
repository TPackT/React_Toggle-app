export const generateUrl = (path: string) =>
  process.env.NEXT_PUBLIC_API_URL + path + '?userName=' + process.env.NEXT_PUBLIC_USERNAME

export const generateLocalUrl = (path: string) =>
  'http://localhost:3000/api' + path