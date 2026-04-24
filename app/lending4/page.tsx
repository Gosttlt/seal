'use client'

import React, {useState, useEffect, useRef} from 'react'
import {motion, useScroll, useTransform, AnimatePresence} from 'framer-motion'
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2,
  ArrowUp,
  Menu,
  X,
} from 'lucide-react'
import LazyMap from '../components/Map'

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 bg-white/90 backdrop-blur-md py-4 shadow-sm'}`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        <div className='text-2xl font-bold tracking-tighter flex items-center gap-2'>
          <span className='w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center text-white text-xs'>
            S
          </span>
          СЕАЛ
        </div>
        <div className='hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest'>
          {['Услуги', 'Прайс', 'Работы', 'Отзывы', 'Контакты'].map(item => (
            <a
              key={item}
              href={`#${item}`}
              className={`hover:text-emerald-700 transition-colors `}
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href='tel:+79277709690'
          className='hidden md:flex items-center gap-2 font-semibold'
        >
          <Phone size={16} /> +7 (927) 770-96-90
        </a>
        <Menu className='md:hidden' />
      </div>
    </nav>
  )
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const {scrollY} = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])

  const slides = [
    {
      label: 'Премиальная стоматология в Тольятти',
      title: 'Эстетика',
      italic: 'вашей улыбки',
    },
    {
      label: 'Инновации в СЕАЛ',
      title: 'Цифровая',
      italic: 'точность лечения',
    },
    {
      label: 'Доверие и комфорт',
      title: 'Забота',
      italic: 'о каждом пациенте',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden '>
      {/* Фоновое изображение с параллаксом */}
      <motion.div style={{y: y1}} className='absolute inset-0 '>
        <img
          src='header1.jpg'
          alt='Clinic'
          className='w-full h-full object-cover'
        />
      </motion.div>

      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white' />

      <div className='container mx-auto px-6 relative z-10 text-white'>
        <div className='max-w-4xl'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentSlide}
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -20}}
              transition={{duration: 0.8, ease: 'circOut'}}
            >
              <span className='uppercase tracking-[0.3em] text-sm mb-6 block text-emerald-200'>
                {slides[currentSlide].label}
              </span>
              <h1 className='text-6xl md:text-8xl font-light leading-tight mb-8'>
                {slides[currentSlide].title} <br />
                <span className='font-serif italic text-emerald-100'>
                  {slides[currentSlide].italic}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5}}
            className='flex gap-4 items-center'
          >
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              className='bg-white text-black px-10 py-5 rounded-full font-medium uppercase tracking-wider text-sm hover:bg-emerald-50 transition-colors shadow-2xl'
            >
              Записаться на прием
            </motion.button>

            {/* Индикаторы слайдов */}
            <div className='flex gap-2 ml-8'>
              {slides.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Боковая надпись для "живого" эффекта */}
      <div className='absolute right-10 bottom-20 vertical-rl hidden lg:block'>
        <p className='text-[10px] uppercase tracking-[1em] text-white/40 rotate-180'>
          Seal Clinic • Tolyatti • 2024
        </p>
      </div>
    </section>
  )
}

const Benefits = () => (
  <section id='Услуги' className='py-32 bg-white'>
    <div className='container mx-auto px-6'>
      <div className='grid md:grid-cols-3 gap-16'>
        {[
          {
            title: 'Технологии',
            desc: 'Оборудование последнего поколения для точной диагностики.',
          },
          {
            title: 'Комфорт',
            desc: 'Лечение без стресса в атмосфере пятизвездочного отеля.',
          },
          {
            title: 'Экспертность',
            desc: 'Врачи с международной сертификацией и многолетним опытом.',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: i * 0.2}}
            className='border-t border-gray-100 pt-8'
          >
            <span className='text-emerald-800 font-serif italic text-2xl mb-4 block'>
              0{i + 1}
            </span>
            <h3 className='text-xl font-bold mb-4 uppercase tracking-tight'>
              {item.title}
            </h3>
            <p className='text-gray-500 leading-relaxed'>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Works = () => (
  <section id='Работы' className='py-32 bg-gray-50'>
    <div className='container mx-auto px-6'>
      <h2 className='text-5xl font-light mb-20 text-center uppercase tracking-tighter'>
        Наши работы
      </h2>
      <div className='grid md:grid-cols-2 gap-8'>
        {[1, 2].map(item => (
          <motion.div
            key={item}
            whileHover={{y: -10}}
            className='relative h-[500px] overflow-hidden group cursor-pointer'
          >
            <img
              src={`header.jpg`}
              alt='Work'
              className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl'
            />
            <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
              <span className='text-white border border-white px-8 py-3 rounded-full backdrop-blur-sm'>
                Смотреть кейс
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

const Process = () => (
  <section className='py-32 bg-emerald-950 text-white overflow-hidden'>
    <div className='container mx-auto px-6'>
      <div className='grid md:grid-cols-2 gap-20 items-center'>
        <div>
          <h2 className='text-5xl font-light mb-12 uppercase'>
            Путь к совершенству
          </h2>
          <div className='space-y-12'>
            {['Консультация', 'План лечения', 'Процесс', 'Результат'].map(
              (step, i) => (
                <div key={i} className='flex gap-6 items-start'>
                  <span className='w-10 h-10 rounded-full border border-emerald-700 flex items-center justify-center text-sm shrink-0'>
                    {i + 1}
                  </span>
                  <div>
                    <h4 className='text-xl font-bold mb-2'>{step}</h4>
                    <p className='text-emerald-200/60 font-light'>
                      Индивидуальный подход и внимание к каждой детали вашего
                      здоровья.
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
        <div className='relative'>
          <motion.div
            animate={{rotate: 360}}
            transition={{duration: 50, repeat: Infinity, ease: 'linear'}}
            className='absolute -inset-20 border border-emerald-800 rounded-full'
          />
          <img
            src='me.jpg'
            alt='Doctor Borisov'
            className='relative z-10 w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl'
          />
          <div className='mt-8'>
            <p className='text-2xl font-serif italic italic text-emerald-200'>
              Борисов Борис Иванович
            </p>
            <p className='uppercase tracking-[0.2em] text-xs opacity-50'>
              Главный врач, основатель клиники
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const PriceSection = () => (
  <section id='Прайс' className='py-32 bg-white'>
    <div className='container mx-auto px-6 max-w-4xl'>
      <h2 className='text-5xl font-light mb-20 text-center uppercase tracking-tighter'>
        Услуги и стоимость
      </h2>
      <div className='divide-y divide-gray-100'>
        {[
          {name: 'Профессиональная гигиена', price: 'от 5 000 ₽'},
          {name: 'Отбеливание ZOOM 4', price: '35 000 ₽'},
          {name: 'Установка виниров (1 ед.)', price: 'от 45 000 ₽'},
          {name: 'Имплантация под ключ', price: 'от 60 000 ₽'},
        ].map((item, i) => (
          <div
            key={i}
            className='py-8 flex justify-between items-center group cursor-pointer'
          >
            <span className='text-xl group-hover:translate-x-4 transition-transform duration-300'>
              {item.name}
            </span>
            <span className='font-bold text-emerald-900'>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section id='Отзывы' className='py-32 bg-gray-50'>
    <div className='container mx-auto px-6'>
      <div className='flex flex-col items-center text-center'>
        <Star className='text-emerald-800 mb-8' fill='currentColor' size={40} />
        <h2 className='text-4xl font-light max-w-3xl mb-12'>
          «Это лучшая клиника, в которой я когда-либо был. Отношение к деталям и
          комфорту пациента просто на заоблачном уровне.»
        </h2>
        <p className='font-bold uppercase tracking-widest text-sm'>
          — Александр В., предприниматель
        </p>
      </div>
    </div>
  </section>
)

const Contact = () => (
  <section id='Контакты' className='py-32 bg-white'>
    <div className='container mx-auto px-6'>
      <div className='grid md:grid-cols-2 gap-20'>
        <div>
          <h2 className='text-5xl font-light mb-12 uppercase'>Контакты</h2>
          <div className='space-y-8'>
            <div className='flex gap-4'>
              <MapPin className='text-emerald-800' />
              <div>
                <p className='font-bold'>Адрес</p>
                <p className='text-gray-500'>
                  Тольятти, Центральная площадь, 8
                </p>
              </div>
            </div>
            <div className='flex gap-4'>
              <Phone className='text-emerald-800' />
              <div>
                <p className='font-bold'>Телефон</p>
                <p className='text-gray-500'>+7 (927) 770-96-90</p>
              </div>
            </div>
            <div className='flex gap-4'>
              <Clock className='text-emerald-800' />
              <div>
                <p className='font-bold'>График</p>
                <p className='text-gray-500'>
                  Пн-Пт: 09:00 – 18:00 | Сб-Вс: Выходной
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-50 p-12 rounded-2xl'>
          <form className='space-y-6'>
            <input
              type='text'
              placeholder='Ваше имя'
              className='w-full bg-transparent border-b border-gray-300 py-4 outline-none focus:border-emerald-800 transition-colors'
            />
            <input
              type='tel'
              placeholder='Номер телефона'
              className='w-full bg-transparent border-b border-gray-300 py-4 outline-none focus:border-emerald-800 transition-colors'
            />
            <button className='w-full bg-emerald-950 text-white py-5 rounded-full uppercase text-xs tracking-widest mt-8 hover:bg-black transition-colors'>
              Записаться на консультацию
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
)

const Footer = () => {
  const [showCookies, setShowCookies] = useState(true)
  const [modal, setModal] = useState<null | 'privacy'>(null)

  return (
    <footer className='bg-white border-t border-gray-100 py-20'>
      <div className='container mx-auto px-6 text-center'>
        <p className='text-gray-400 text-sm mb-8'>
          © 2024 Стоматология СЕАЛ. Все права защищены.
        </p>
        <div className='flex justify-center gap-8 text-xs uppercase tracking-widest text-gray-500'>
          <button
            onClick={() => setModal('privacy')}
            className='hover:text-black'
          >
            Политика конфиденциальности
          </button>
          <a href='#' className='hover:text-black uppercase'>
            Instagram
          </a>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{y: 100}}
            animate={{y: 0}}
            exit={{y: 100}}
            className='fixed bottom-8 right-8 z-[100] bg-black text-white p-6 rounded-2xl max-w-sm shadow-2xl'
          >
            <p className='text-xs mb-4'>
              Мы используем cookie, чтобы сделать ваш опыт использования сайта
              лучше.
            </p>
            <button
              onClick={() => setShowCookies(false)}
              className='bg-emerald-700 text-white px-6 py-2 rounded-full text-xs'
            >
              Согласен
            </button>
          </motion.div>
        )}

        {modal === 'privacy' && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed inset-0 z-[110] bg-white flex items-center justify-center p-6'
          >
            <button
              onClick={() => setModal(null)}
              className='absolute top-10 right-10'
            >
              <X />
            </button>
            <div className='max-w-2xl text-sm leading-relaxed'>
              <h3 className='text-3xl mb-8 uppercase font-light'>
                Политика конфиденциальности
              </h3>
              <p>
                Мы заботимся о ваших данных. Клиника СЕАЛ обязуется использовать
                полученную информацию исключительно для записи на прием и
                улучшения качества обслуживания...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])

  return (
    <motion.button
      animate={{opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8}}
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className='fixed bottom-10 left-10 z-50 bg-white border border-gray-100 p-4 rounded-full shadow-xl'
    >
      <ArrowUp size={20} />
    </motion.button>
  )
}

// --- Main Page ---

export default function Home() {
  return (
    <main className='overflow-x-hidden bg-white text-emerald-950 antialiased selection:bg-emerald-900 selection:text-white'>
      <Navbar />
      <Hero />
      <Benefits />
      <Works />
      <Process />
      <PriceSection />
      <Testimonials />
      <Contact />
      <LazyMap />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
