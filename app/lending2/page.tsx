// app/page.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import {motion, useScroll, useTransform, AnimatePresence} from 'framer-motion'
import {
  ArrowUp,
  Shield,
  Sparkles,
  Clock,
  Award,
  Users,
  Phone,
  MapPin,
  Calendar,
  Star,
  ChevronRight,
  X,
  Cookie,
  Heart,
  Activity,
  Smile,
  TrendingUp,
} from 'lucide-react'
import LazyMap from '../components/Map'
import Image from 'next/image'
const projects = [
  {
    before: 'header.jpg',
    after: 'header.jpg',
    title: 'Эстетическая реставрация',
  },
  {
    before: 'before2.jpg',
    after: 'header22.webp',
    title: 'Имплантация с немедленной нагрузкой',
  },
  {
    before: 'before3.jpg',
    after: 'header222.webp',
    title: 'Виниры - голливудская улыбка',
  },
]
// Компонент модального окна
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          onClick={onClose}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4'
        >
          <motion.div
            initial={{scale: 0.9, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.9, opacity: 0}}
            onClick={e => e.stopPropagation()}
            className='bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-t-4 border-blue-500'
          >
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-light tracking-wide'>{title}</h3>
              <button
                onClick={onClose}
                className='p-1 hover:bg-gray-100 rounded-full transition'
              >
                <X size={20} />
              </button>
            </div>
            <div className='text-gray-600 text-sm leading-relaxed'>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Карточка преимущества
const AdvantageCard = ({icon: Icon, title, desc, delay}: any) => (
  <motion.div
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true, margin: '-50px'}}
    transition={{duration: 0.6, delay}}
    className='group p-8 bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-blue-200'
  >
    <div className='mb-5 inline-flex p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300'>
      <Icon className='w-7 h-7 text-gray-800 group-hover:text-blue-600 transition-colors' />
    </div>
    <h3 className='text-xl font-medium mb-2 tracking-tight'>{title}</h3>
    <p className='text-gray-500 text-sm leading-relaxed'>{desc}</p>
  </motion.div>
)

// Карточка цены
const PriceCard = ({name, price, features, delay, popular}: any) => (
  <motion.div
    initial={{opacity: 0, scale: 0.95}}
    whileInView={{opacity: 1, scale: 1}}
    viewport={{once: true}}
    transition={{duration: 0.5, delay}}
    className={`relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border ${
      popular
        ? 'border-blue-400 shadow-xl'
        : 'border-gray-100 hover:border-blue-200'
    }`}
  >
    {popular && (
      <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-4 py-1 rounded-full font-medium'>
        Популярное
      </div>
    )}
    <h3 className='text-2xl font-light tracking-tight mb-2'>{name}</h3>
    <div className='text-4xl font-semibold my-4 tracking-tight'>
      {price} <span className='text-base font-normal text-gray-400'>₽</span>
    </div>
    <ul className='space-y-3 mb-8'>
      {features.map((f: string, i: number) => (
        <li key={i} className='text-gray-500 text-sm flex items-center gap-2'>
          <ChevronRight size={14} className='text-blue-500' /> {f}
        </li>
      ))}
    </ul>
    <button className='w-full py-3 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300'>
      Записаться
    </button>
  </motion.div>
)

// Отзыв
const ReviewCard = ({name, text, stars, delay}: any) => (
  <motion.div
    initial={{opacity: 0, x: 30}}
    whileInView={{opacity: 1, x: 0}}
    viewport={{once: true}}
    transition={{duration: 0.5, delay}}
    className='bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100'
  >
    <div className='flex items-center gap-1 mb-3'>
      {[...Array(stars)].map((_, i) => (
        <Star key={i} size={16} className='fill-blue-500 text-blue-500' />
      ))}
    </div>
    <p className='text-gray-700 text-sm italic mb-4 leading-relaxed'>
      "{text}"
    </p>
    <p className='font-medium text-gray-900 text-sm'>{name}</p>
  </motion.div>
)

export default function Home() {
  const [cookieOpen, setCookieOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const heroRef = useRef<HTMLElement>(null)
  const {scrollYProgress} = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150])

  // Навигация по якорям
  const sections = [
    'home',
    'advantages',
    'prices',
    'works',
    'process',
    'reviews',
    'contacts',
  ]

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)

      // Определение активной секции
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const {offsetTop, offsetHeight} = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

  const scrollToTop = () => window.scrollTo({top: 0, behavior: 'smooth'})

  const navItems = [
    {id: 'advantages', label: 'Преимущества'},
    {id: 'prices', label: 'Цены'},
    {id: 'works', label: 'Работы'},
    {id: 'process', label: 'Процесс'},
    {id: 'reviews', label: 'Отзывы'},
    {id: 'contacts', label: 'Контакты'},
  ]

  return (
    <div className='bg-white overflow-x-hidden'>
      {/* Навигационная панель (липкая) */}
      <motion.nav
        initial={{y: -100}}
        animate={{y: 0}}
        transition={{duration: 0.5}}
        className='fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
      >
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          {/* Логотип */}
          <motion.div
            whileHover={{scale: 1.05}}
            className='text-2xl font-light tracking-wider cursor-pointer'
            onClick={() => scrollToSection('home')}
          >
            <span className='font-bold text-blue-500'>СЕ</span>
            <span className='font-light'>АЛ</span>
          </motion.div>

          {/* Навигация (десктоп) */}
          <div className='hidden md:flex gap-8'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide transition-colors relative group ${
                  activeSection === item.id
                    ? 'text-blue-500'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 transition-transform duration-300 ${
                    activeSection === item.id
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Телефон */}
          <a
            href='tel:+79277709690'
            className='hidden md:block text-sm font-medium text-gray-700 hover:text-blue-500 transition'
          >
            +7 (927) 770-96-90
          </a>

          {/* Мобильное меню (упрощённое) */}
          <div className='md:hidden'>
            <button className='p-2 hover:bg-gray-100 rounded-lg'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section с параллакс-фоном */}
      <section
        id='home'
        ref={heroRef}
        className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'
      >
        <motion.div style={{y: parallaxY}} className='absolute inset-0 z-0'>
          <div
            className='absolute inset-0 bg-cover bg-center scale-105'
            style={{backgroundImage: "url('header.jpg')"}}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60' />
        </motion.div>

        <div className='relative z-10 text-center px-6 max-w-5xl mx-auto'>
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, ease: 'easeOut'}}
          >
            <motion.div
              animate={{scale: [1, 1.05, 1]}}
              transition={{repeat: Infinity, duration: 3, repeatDelay: 2}}
              className='inline-block mb-6'
            >
              <span className='Стоматология премиум-класса text-white text-sm tracking-[0.3em] uppercase font-light border border-white/30 px-4 py-1 rounded-full'>
                Стоматология
              </span>
            </motion.div>
            <h1 className='text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white drop-shadow-2xl'>
              Улыбка <span className='font-bold text-blue-400'>высшего</span>{' '}
              класса
            </h1>
            <p className='text-lg md:text-xl text-white/90 mt-6 max-w-2xl mx-auto font-light tracking-wide'>
              Прецизионная стоматология. Эстетика. Забота с 2005 года.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              whileTap={{scale: 0.98}}
              className='mt-10 bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:bg-blue-600 transition-all duration-300 inline-flex items-center gap-2 group'
            >
              Получить консультацию
              <ChevronRight
                size={18}
                className='group-hover:translate-x-1 transition'
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Индикатор скролла */}
        <motion.div
          animate={{y: [0, 10, 0]}}
          transition={{repeat: Infinity, duration: 1.5}}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm flex flex-col items-center gap-1 cursor-pointer'
          onClick={() => scrollToSection('advantages')}
        >
          <span className='text-xs tracking-wider'>SCROLL</span>
          <div className='w-px h-12 bg-white/50' />
        </motion.div>
      </section>

      {/* Преимущества */}
      <section id='advantages' className='py-28 px-6 max-w-7xl mx-auto'>
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className='text-center mb-16'
        >
          <span className='text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold'>
            Почему выбирают нас
          </span>
          <h2 className='text-4xl md:text-5xl font-light tracking-tight mt-3'>
            Наши <span className='font-bold text-blue-500'>преимущества</span>
          </h2>
        </motion.div>
        <div className='grid md:grid-cols-3 gap-8'>
          <AdvantageCard
            icon={Sparkles}
            title='Эстетика высшего уровня'
            desc='Используем керамику и цирконий премиум-класса'
            delay={0}
          />
          <AdvantageCard
            icon={Shield}
            title='100% стерильность'
            desc='Собственный контроль качества и одноразовые материалы'
            delay={0.1}
          />
          <AdvantageCard
            icon={Award}
            title='Врачи-эксперты'
            desc='Стаж от 10 лет, регулярное обучение за рубежом'
            delay={0.2}
          />
        </div>
      </section>

      {/* Прайс */}
      <section id='prices' className='py-28 bg-gray-50'>
        <div className='px-6 max-w-7xl mx-auto'>
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className='text-center mb-16'
          >
            <span className='text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold'>
              Инвестиция в здоровье
            </span>
            <h2 className='text-4xl md:text-5xl font-light tracking-tight mt-3'>
              Стоимость <span className='font-bold text-blue-500'>услуг</span>
            </h2>
          </motion.div>
          <div className='grid md:grid-cols-3 gap-8'>
            <PriceCard
              name='Диагностика'
              price='0'
              features={['3D КЛКТ', 'План лечения', 'Консультация хирурга']}
              delay={0}
            />
            <PriceCard
              name='Профессиональная гигиена'
              price='7 900'
              features={['AirFlow', 'Ультразвук', 'Полировка']}
              delay={0.1}
              popular
            />
            <PriceCard
              name='Керамический винир'
              price='35 000'
              features={['E-max', '3D моделирование', 'Гарантия 5 лет']}
              delay={0.2}
            />
          </div>
          <p className='text-center text-gray-400 text-xs mt-8'>
            *Точная стоимость после консультации
          </p>
        </div>
      </section>

      {/* Примеры работ */}
      <section id='works' className='py-28 px-6 max-w-7xl mx-auto'>
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className='text-center mb-16'
        >
          <span className='text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold'>
            Наши работы
          </span>
          <h2 className='text-4xl md:text-5xl font-light tracking-tight mt-3'>
            Примеры{' '}
            <span className='font-bold text-blue-500'>преображений</span>
          </h2>
        </motion.div>
        <div className='grid md:grid-cols-3 gap-6'>
          {projects.map(i => (
            <motion.div
              key={i.title}
              whileHover={{scale: 1.03, rotateX: 5}}
              className='group aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-lg cursor-pointer relative'
            >
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center'>
                <Image
                  src={i.after}
                  alt='Dr. Borisov'
                  fill
                  className='w-full h-32 bg-gray-300 rounded-lg mb-4  object-cover'
                />
              </div>
              <div className='w-full h-full flex items-center justify-center text-gray-500 text-sm'>
                Кейс #{i.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Процесс работы */}
      <section id='process' className='py-28 bg-gray-50'>
        <div className='px-6 max-w-7xl mx-auto'>
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className='text-center mb-16'
          >
            <span className='text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold'>
              Как мы работаем
            </span>
            <h2 className='text-4xl md:text-5xl font-light tracking-tight mt-3'>
              4 простых <span className='font-bold text-blue-500'>шага</span>
            </h2>
          </motion.div>
          <div className='grid md:grid-cols-4 gap-8 text-center'>
            {[
              {
                step: '01',
                icon: Activity,
                title: 'Консультация',
                desc: 'Диагностика и план лечения',
              },
              {
                step: '02',
                icon: Heart,
                title: 'Планирование',
                desc: '3D-моделирование улыбки',
              },
              {
                step: '03',
                icon: Smile,
                title: 'Лечение',
                desc: 'Прецизионная работа экспертов',
              },
              {
                step: '04',
                icon: TrendingUp,
                title: 'Результат',
                desc: 'Улыбка вашей мечты',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{delay: idx * 0.1}}
                viewport={{once: true}}
                className='group cursor-pointer'
              >
                <div className='relative inline-block mb-4'>
                  <div className='text-7xl font-black text-gray-200 group-hover:text-blue-200 transition-colors'>
                    {item.step}
                  </div>
                  <item.icon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors' />
                </div>
                <h3 className='text-xl font-medium mt-4 mb-2'>{item.title}</h3>
                <p className='text-gray-500 text-sm'>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id='reviews' className='py-28 px-6 max-w-7xl mx-auto'>
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className='text-center mb-16'
        >
          <span className='text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold'>
            Мнение пациентов
          </span>
          <h2 className='text-4xl md:text-5xl font-light tracking-tight mt-3'>
            Что <span className='font-bold text-blue-500'>говорят</span> о нас
          </h2>
        </motion.div>
        <div className='grid md:grid-cols-3 gap-8'>
          <ReviewCard
            name='Анна К.'
            text='Восстановила 2 зуба. Результат превзошёл ожидания! Очень бережное отношение.'
            stars={5}
            delay={0}
          />
          <ReviewCard
            name='Максим Д.'
            text='Имплантация прошла комфортно. Врачи — профессионалы с большой буквы.'
            stars={5}
            delay={0.1}
          />
          <ReviewCard
            name='Елена В.'
            text='Сделала виниры. Теперь улыбаюсь каждый день. Спасибо команде СЕАЛ!'
            stars={5}
            delay={0.2}
          />
        </div>
      </section>
      {/* Контакты */}
      <section id='contacts' className='py-28 bg-black text-white'>
        <div className='px-6 max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{opacity: 0, x: -30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
            >
              <span className='text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold'>
                Свяжитесь с нами
              </span>
              <h2 className='text-4xl md:text-5xl font-light tracking-tight mb-6 mt-3'>
                Контакты
              </h2>
              <div className='space-y-5 text-gray-300'>
                <div className='flex items-center gap-4 hover:text-blue-400 transition-colors group'>
                  <MapPin size={20} className='group-hover:text-blue-500' />
                  <span>Центральная площадь, 8, Тольятти</span>
                </div>
                <div className='flex items-center gap-4 hover:text-blue-400 transition-colors group'>
                  <Phone size={20} className='group-hover:text-blue-500' />
                  <a href='tel:+79277709690'>+7 (927) 770-96-90</a>
                </div>
                <div className='flex items-center gap-4 hover:text-blue-400 transition-colors group'>
                  <Clock size={20} className='group-hover:text-blue-500' />
                  <span>пн-пт 09:00–18:00, сб-вс выходной</span>
                </div>
                <div className='flex items-center gap-4 hover:text-blue-400 transition-colors group'>
                  <Users size={20} className='group-hover:text-blue-500' />
                  <span>Главный врач: Борисов Борис Иванович</span>
                </div>
              </div>
              <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.98}}
                className='mt-8 flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors'
              >
                <Calendar size={16} /> Записаться онлайн
              </motion.button>
            </motion.div>
            <motion.div
              initial={{opacity: 0, x: 30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className='rounded-2xl overflow-hidden shadow-2xl aspect-square bg-gray-800 flex items-center justify-center relative group'
            >
              <img
                src='me.jpg'
                alt='Борисов Борис Иванович'
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500' />
            </motion.div>
          </div>
        </div>
      </section>
      <LazyMap />

      {/* Footer */}
      <footer className='py-8 border-t border-gray-200 px-6 text-center text-sm text-gray-400 flex flex-wrap justify-center gap-6 bg-white'>
        <p>
          © {new Date().getFullYear()} СЕАЛ — премиальная стоматология в
          Тольятти
        </p>
        <button
          onClick={() => setPrivacyOpen(true)}
          className='hover:text-blue-500 transition'
        >
          Политика конфиденциальности
        </button>
        <button
          onClick={() => setCookieOpen(true)}
          className='hover:text-blue-500 transition'
        >
          Cookie
        </button>
      </footer>

      {/* Модалки */}
      <Modal
        isOpen={cookieOpen}
        onClose={() => setCookieOpen(false)}
        title='Использование Cookie'
      >
        Мы используем файлы cookie для улучшения работы сайта, анализа трафика и
        персонализации. Продолжая использование, вы соглашаетесь с их
        обработкой. Вы можете отключить cookie в настройках браузера.
      </Modal>
      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title='Политика конфиденциальности'
      >
        Ваши персональные данные защищены в соответствии с Федеральным законом №
        152-ФЗ «О персональных данных». Мы не передаём информацию третьим лицам
        без вашего согласия. Все данные используются исключительно для связи с
        вами и записи на приём.
      </Modal>

      {/* Кнопка наверх */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.8}}
            onClick={scrollToTop}
            className='fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-xl hover:bg-blue-600 transition-all z-40 hover:scale-110'
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
