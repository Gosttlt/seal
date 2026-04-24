// app/page.tsx
'use client'

import {useState, useEffect, useRef} from 'react'
import {motion, useScroll, useTransform, AnimatePresence} from 'framer-motion'
import {
  ArrowUp,
  ChevronRight,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Calendar,
  Shield,
  Sparkles,
  Zap,
  Quote,
  CheckCircle,
  Menu,
  X,
  ExternalLink,
  Cookie,
  FileText,
} from 'lucide-react'

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{duration: 0.6}}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className='container mx-auto px-6 flex justify-between items-center'>
        <div className='text-2xl font-light tracking-wider text-gray-900'>
          SE<span className='font-bold text-red-600'>AL</span>
        </div>

        <div className='hidden md:flex space-x-12'>
          {' '}
          {['Услуги', 'Работы', 'Процесс', 'Отзывы', 'Контакты'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-bold hover:text-red-600 transition-colors text-sm tracking-wide ${
                scrolled ? 'text-black' : 'text-white'
              }
              `}
            >
              {item}
            </a>
          ))}
        </div>

        <button className='hidden md:block bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-red-600 transition-all duration-300'>
          Записаться
        </button>

        <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: 'auto'}}
            exit={{opacity: 0, height: 0}}
            className='md:hidden bg-white/95 backdrop-blur-lg border-t'
          >
            <div className='flex flex-col space-y-4 p-6'>
              {['Услуги', 'Работы', 'Процесс', 'Отзывы', 'Контакты'].map(
                item => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className='text-gray-800 hover:text-red-600'
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ),
              )}
              <button className='bg-black text-white px-6 py-2 rounded-full w-full'>
                Записаться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({x: e.clientX, y: e.clientY})
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      {/* Parallax Background */}
      <div
        className='absolute inset-0 bg-cover bg-center scale-110'
        style={{
          backgroundImage: "url('/header.jpg')",
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
        }}
      />
      <div className='absolute inset-0 bg-black/40' />

      <div className='relative z-10 text-center text-white px-6'>
        <motion.div
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
        >
          <span className='text-sm tracking-[0.3em] uppercase bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-6'>
            Cтоматология
          </span>
          <h1 className='text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight'>
            Заботимся о каждом зубе
            <br />
            <span className='font-bold text-red-500'>
              чтобы вы чаще улыбались
            </span>
          </h1>
          <p className='text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light'>
            Более 30 лет опыта, безупречный сервис и эстетика высшего уровня
          </p>
          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            className='group bg-white text-black px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto hover:bg-red-600 hover:text-white transition-all duration-300'
          >
            Получить консультацию
            <ChevronRight
              className='group-hover:translate-x-1 transition-transform'
              size={20}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{y: [0, 10, 0]}}
        transition={{repeat: Infinity, duration: 1.5}}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-white'
      >
        <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white rounded-full mt-2 animate-bounce' />
        </div>
      </motion.div>
    </section>
  )
}

const Benefits = () => {
  const benefits = [
    {
      icon: Award,
      title: '5 лет гарантии',
      desc: 'На все виды работ',
      color: 'text-red-500',
    },
    {
      icon: Zap,
      title: 'Цифровая диагностика',
      desc: '3D сканирование и AI анализ',
      color: 'text-black',
    },
    {
      icon: Shield,
      title: 'Безопасность',
      desc: 'Европейские стандарты',
      color: 'text-gray-700',
    },
    {
      icon: Sparkles,
      title: 'Эстетика',
      desc: 'Индивидуальный дизайн улыбки',
      color: 'text-red-600',
    },
  ]

  return (
    <section className='py-28 bg-white' id='услуги'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className='text-center mb-20'
        >
          <span className='text-red-500 text-sm tracking-wider uppercase'>
            Преимущества
          </span>
          <h2 className='text-4xl md:text-5xl font-light mt-2'>
            Почему выбирают нас
          </h2>
          <div className='w-20 h-1 bg-red-500 mx-auto mt-6' />
        </motion.div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: index * 0.1}}
              whileHover={{y: -10}}
              className='text-center group cursor-pointer'
            >
              <div className='bg-gray-50 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-50 transition-colors'>
                <item.icon size={40} className={item.color} />
              </div>
              <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
              <p className='text-gray-500'>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Works = () => {
  const projects = [
    {
      before: '/before1.jpg',
      after: '/after1.jpg',
      title: 'Эстетическая реставрация',
    },
    {
      before: '/before2.jpg',
      after: '/after2.jpg',
      title: 'Имплантация с немедленной нагрузкой',
    },
    {
      before: '/before3.jpg',
      after: '/after3.jpg',
      title: 'Виниры - голливудская улыбка',
    },
  ]

  return (
    <section className='py-28 bg-gray-50' id='работы'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className='text-center mb-16'
        >
          <span className='text-red-500 text-sm tracking-wider uppercase'>
            Портфолио
          </span>
          <h2 className='text-4xl md:text-5xl font-light mt-2'>
            Примеры работ
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-6'>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{delay: idx * 0.1}}
              whileHover={{scale: 1.02}}
              className='group relative overflow-hidden rounded-2xl shadow-lg bg-white'
            >
              <div className='aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                <div className='text-center p-6'>
                  <div className='text-sm text-gray-400 mb-2'>До/После</div>
                  <div className='w-full h-32 bg-gray-300 rounded-lg mb-4 animate-pulse' />
                  <p className='font-medium'>{project.title}</p>
                </div>
              </div>
              <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <button className='bg-white text-black px-6 py-2 rounded-full'>
                  Смотреть кейс
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Process = () => {
  const steps = [
    {
      num: '01',
      title: 'Диагностика',
      desc: '3D-сканирование и планирование лечения',
      icon: '🔍',
    },
    {
      num: '02',
      title: 'План лечения',
      desc: 'Прозрачная смета и график',
      icon: '📋',
    },
    {
      num: '03',
      title: 'Лечение',
      desc: 'Комфорт и контроль на каждом этапе',
      icon: '⚕️',
    },
    {num: '04', title: 'Результат', desc: 'Гарантия и поддержка', icon: '✨'},
  ]

  return (
    <section className='py-28 bg-white' id='процесс'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className='text-center mb-16'
        >
          <span className='text-red-500 text-sm tracking-wider uppercase'>
            Как мы работаем
          </span>
          <h2 className='text-4xl md:text-5xl font-light mt-2'>
            Процесс лечения
          </h2>
        </motion.div>

        <div className='flex flex-col md:flex-row justify-between relative'>
          <div className='absolute left-8 md:left-1/4 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block' />
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, x: -20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.2}}
              className='relative z-10 flex-1 text-center mb-12 md:mb-0'
            >
              <div className='bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg'>
                {idx + 1}
              </div>
              <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
              <p className='text-gray-500 max-w-xs mx-auto'>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Екатерина С.',
      text: 'Лучшая клиника в городе! Результат превзошёл ожидания, персонал вежливый и профессиональный.',
      rating: 5,
      role: 'Блогер',
    },
    {
      name: 'Алексей К.',
      text: 'Делал имплантацию - всё прошло безболезненно и быстро. Очень доволен сервисом и подходом.',
      rating: 5,
      role: 'Бизнесмен',
    },
    {
      name: 'Марина П.',
      text: 'Поставила виниры - улыбка мечты! Спасибо команде за чуткость и профессионализм.',
      rating: 5,
      role: 'Дизайнер',
    },
  ]

  return (
    <section className='py-28 bg-black text-white' id='отзывы'>
      <div className='container mx-auto px-6'>
        <motion.div
          initial={{opacity: 0, y: 50}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className='text-center mb-16'
        >
          <span className='text-red-400 text-sm tracking-wider uppercase'>
            Отзывы
          </span>
          <h2 className='text-4xl md:text-5xl font-light mt-2'>
            Что говорят пациенты
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.1}}
              whileHover={{y: -5}}
              className='bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10'
            >
              <Quote className='text-red-400 mb-4' size={32} />
              <p className='text-gray-300 mb-6 leading-relaxed'>{t.text}</p>
              <div className='flex justify-between items-center'>
                <div>
                  <h4 className='font-semibold'>{t.name}</h4>
                  <p className='text-sm text-gray-400'>{t.role}</p>
                </div>
                <div className='flex text-yellow-400'>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill='currentColor' />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface LazyMapProps {
  src?: string
  width?: string
  height?: string
  title?: string
  className?: string
}

interface LazyMapProps {
  src?: string
  width?: string
  height?: string
  title?: string
  className?: string
}

function LazyMap({
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

const Contact = () => {
  const [formData, setFormData] = useState({name: '', phone: '', email: ''})

  return (
    <section className='py-28 bg-white' id='контакты'>
      <div className='container mx-auto px-6'>
        <div className='grid md:grid-cols-2 gap-16'>
          <motion.div
            initial={{opacity: 0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
          >
            <span className='text-red-500 text-sm tracking-wider uppercase'>
              Связь
            </span>
            <h2 className='text-4xl md:text-5xl font-light mt-2 mb-6'>
              Запишитесь на приём
            </h2>
            <p className='text-gray-600 mb-8'>
              Оставьте заявку и наш администратор свяжется с вами в течение 15
              минут.
            </p>

            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Phone className='text-red-500' />
                <div>
                  <p className='font-semibold'>+7 (927) 770-96-90</p>
                  <p className='text-sm text-gray-500'>
                    <b>пн-пт</b> 9:00 - 18:00
                  </p>
                  <p className='text-sm text-gray-500'>
                    <b>сб-вс</b> выходной
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <Mail className='text-red-500' />
                <div>
                  <p className='font-semibold'>info@seal.ru</p>
                  <p className='text-sm text-gray-500'>Ответ в течение часа</p>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <MapPin className='text-red-500' />
                <div>
                  <p className='font-semibold'>
                    Тольятти, ул. Ленинградская, 70
                  </p>
                  <p className='font-semibold'>
                    Тольятти, Центральная площадь, 8
                  </p>
                </div>
              </div>
            </div>

            <div className='mt-12 m-auto'>
              <img
                src='/me1.jpg'
                alt='Директор клиники'
                className='w-32 h-32 rounded-full object-cover border-4 border-red-300 shadow-lg'
              />
              <p className='mt-4 font-semibold'>Борисов Борис Иванович</p>
              <p className='text-sm text-gray-500'>
                Главный врач, основатель клиники
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{opacity: 0, x: 50}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            className='space-y-6'
            onSubmit={e => e.preventDefault()}
          >
            <input
              type='text'
              placeholder='Ваше имя'
              className='w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-red-300 transition'
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input
              type='tel'
              placeholder='Телефон'
              className='w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-red-300 transition'
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-red-300 transition'
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <motion.button
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              className='w-full bg-black text-white p-4 rounded-xl font-semibold hover:bg-red-600 transition'
            >
              Отправить заявку
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  const [showCookie, setShowCookie] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowCookie(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <footer className='bg-gray-900 text-gray-400 py-12'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-8 mb-8'>
          <div className='text-2xl font-light tracking-wider text-white mb-4 md:mb-0'>
            SE<span className='text-red-500 font-bold'>AL</span>
          </div>
          <div className='flex gap-8'>
            <button
              onClick={() => setShowPrivacy(true)}
              className='hover:text-white transition'
            >
              Политика конфиденциальности
            </button>
            <button
              onClick={() => setShowCookie(true)}
              className='hover:text-white transition'
            >
              Cookie
            </button>
          </div>
        </div>
        <div className='text-center text-sm'>
          © 2025 SEAL Premium Clinic. Все права защищены.
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl shadow-2xl p-6 z-50'
          >
            <div className='flex justify-between items-start mb-3'>
              <h3 className='font-bold text-black'>Cookie</h3>
              <button onClick={() => setShowCookie(false)}>
                <X size={18} />
              </button>
            </div>
            <p className='text-sm text-gray-600 mb-4'>
              Мы используем cookie для улучшения работы сайта. Продолжая
              использовать сайт, вы соглашаетесь с этим.
            </p>
            <button
              onClick={() => setShowCookie(false)}
              className='bg-black text-white px-4 py-2 rounded-full text-sm w-full'
            >
              Принять
            </button>
          </motion.div>
        )}
        {showPrivacy && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50'
          >
            <div className='bg-white max-w-lg rounded-2xl p-8 relative'>
              <button
                onClick={() => setShowPrivacy(false)}
                className='absolute top-4 right-4'
              >
                <X />
              </button>
              <h3 className='text-2xl font-bold mb-4'>
                Политика конфиденциальности
              </h3>
              <p className='text-gray-600'>
                Ваши данные защищены в соответствии с ФЗ-152. Мы не передаём
                информацию третьим лицам без вашего согласия.
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
    const toggle = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggle)
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0}}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className='fixed bottom-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-black transition z-40'
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Main Page
export default function Home() {
  return (
    <main className='overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Benefits />
      <Works />
      <Process />
      <Testimonials />
      <Contact />
      <LazyMap />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
