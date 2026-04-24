'use client'
import {motion} from 'framer-motion'
import {ExternalLink} from 'lucide-react'

const StickySidebar = () => {
  // Определяем префикс: в проде /seal, в разработке — пусто
  const isProd = process.env.NODE_ENV === 'production'
  const prefix = isProd ? '/seal' : ''

  const sites = [
    {name: 'Lending 1', href: '/', color: 'bg-green-600'},
    {name: 'Lending 2', href: '/lending2', color: 'bg-blue-600'},
    {name: 'Lending 3', href: '/lending3', color: 'bg-red-600'},
    {name: 'Lending 4', href: '/lending4', color: 'bg-green-600'},
  ]

  return (
    <div className='fixed left-0 top-1/2 -translate-y-1/2 z-[60] hidden lg:flex flex-col gap-2'>
      {sites.map((site, idx) => {
        // Собираем правильный URL
        // Если href это '/', то получаем просто '/seal', иначе '/seal/lending2'
        const fullHref =
          site.href === '/' ? prefix || '/' : `${prefix}${site.href}`

        return (
          <motion.a
            key={idx}
            href={fullHref}
            initial={{x: -50, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{delay: 0.5 + idx * 0.1}}
            whileHover={{x: 5}}
            className='group flex items-center gap-3 bg-white/80 backdrop-blur-md shadow-xl border border-gray-100 p-4 rounded-r-2xl transition-all hover:bg-white'
          >
            <div
              className={`w-3 h-3 rounded-full ${site.color} group-hover:scale-125 transition-transform`}
            />
            <span className='text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden max-w-0 group-hover:max-w-[120px] transition-all duration-500 whitespace-nowrap text-black'>
              {site.name}
            </span>
            <ExternalLink
              size={12}
              className='text-gray-400 group-hover:text-red-600 transition-colors'
            />
          </motion.a>
        )
      })}
    </div>
  )
}
export default StickySidebar
