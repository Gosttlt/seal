interface LazyMapProps {
  src?: string
  width?: string
  height?: string
  title?: string
  className?: string
}

export default function LazyMap({
  src = 'https://yandex.ru/map-widget/v1/?um=constructor%3A163f5c6a6deee1d7c947872a6ad5bbca2d6669db99dab13b46d9e2ad74749c36&amp;source=constructor',
  width = '100%',
  height = '400',
  title = 'Карта с расположением нашей компании',
  className = 'rounded-lg shadow-lg w-full h-full',
}: LazyMapProps) {
  return (
    <div className='w-full mx-auto h-[400px]'>
      <iframe
        src={src}
        width={width}
        height={height}
        frameBorder='0'
        title={title}
        className={className}
        loading='lazy'
      />
    </div>
  )
}
