
const ErrorPage: React.FC<{error?: {message: string}}> = ({error}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Ошибка: {error?.message || '404 Not Found'}</p>
      </div>
  )
}

export default ErrorPage
