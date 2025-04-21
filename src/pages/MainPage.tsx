import CardVideo from '@/others/CardVideo';
import ErrorPage from './ErrorPage';
import { useMain } from '@/hooks/api/mainPage';

const MainPage = () => {
  const { videoList, isLoading, isFetching, isError, error } = useMain()

  if (isError) return <ErrorPage error={error as { message: string }}/>

  return (
    <div className="min-h-screen p-4 500res:px-0">
      <div className="grid grid-cols-6 2230res:grid-cols-5 1900res:grid-cols-4 1580res:grid-cols-3 1000res:grid-cols-2 500res:grid-cols-1 gap-x-[.1vw] gap-y-[.7vw] 1000res:gap-x-[.5vw]  500res:gap-x-0 540res:gap-y-[7vw]">
        {isLoading
          ? [...Array(32)].map((_, index) => <CardVideo key={index} type="video" isLoad />)
          : videoList.map((item, index) =>
              item.id.kind !== 'youtube#channel' && item.id.kind !== 'youtube#playlist' ? (
                <CardVideo item={item} key={index} index={index} type="video" />
              ) : item.id.kind === 'youtube#playlist' && (
                <CardVideo item={item} key={index} type="playlist" />
              )
            )}
        {window.innerWidth >= 550 && [...Array(6)].map((_, index) => <CardVideo key={index} type="video" isLoad />)}
      </div>
      {isFetching && <p className="text-white text-center mt-4">Загрузка...</p>}
    </div>
  );
};

export default MainPage;