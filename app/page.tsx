'use client'

import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {motion, useScroll, useTransform, AnimatePresence} from 'framer-motion'
import {
  ChevronUp,
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Clock,
  Instagram,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import LazyMap from './components/Map'

// --- Вспомогательные компоненты анимации ---
const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => (
  <motion.div
    initial={{opacity: 0, y: 20}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    transition={{duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9]}}
  >
    {children}
  </motion.div>
)

// --- 1. Navbar ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}
    >
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
        <div
          className={`text-2xl font-light tracking-widest ${isScrolled ? 'text-black' : 'text-white'}`}
        >
          СЕАЛ
        </div>
        <div
          className={`hidden md:flex space-x-10 text-sm uppercase tracking-widest ${isScrolled ? 'text-zinc-600' : 'text-white/80'}`}
        >
          {['Преимущества', 'Прайс', 'Работы', 'Отзывы', 'Контакты'].map(
            item => (
              <a
                key={item}
                href={`#${item}`}
                className='hover:text-emerald-600 transition-colors cursor-pointer'
              >
                {item}
              </a>
            ),
          )}
        </div>
        <button className='bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95'>
          Записаться
        </button>
      </div>
    </nav>
  )
}

// --- 2. Hero Section ---
const Hero = () => {
  const {scrollY} = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 200])

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden bg-black'>
      <motion.div style={{y}} className='absolute inset-0 z-0 opacity-60'>
        <Image
          src='/header.jpg'
          alt='Dentistry'
          fill
          className='object-cover'
          priority
        />
      </motion.div>
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white z-10' />

      <div className='relative z-20 text-center px-4'>
        <FadeIn>
          <span className='text-white/70 uppercase tracking-[0.3em] text-sm mb-6 block'>
            Эстетическая стоматология
          </span>
          <h1 className='text-5xl md:text-8xl font-light text-white mb-8 tracking-tighter'>
            Искусство вашей <br />{' '}
            <span className='italic'>идеальной улыбки</span>
          </h1>
          <motion.button
            whileHover={{scale: 1.05}}
            className='bg-white text-black px-12 py-5 text-sm uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all duration-500'
          >
            Консультация эксперта
          </motion.button>
        </FadeIn>
      </div>
    </section>
  )
}

// --- 3. Benefits ---
const Benefits = () => (
  <section id='Преимущества' className='py-32 bg-white px-6'>
    <div className='max-w-7xl mx-auto'>
      <div className='grid md:grid-cols-2 gap-20 items-center'>
        <FadeIn>
          <div className='relative aspect-[4/5] overflow-hidden rounded-sm group'>
            <Image
              src='/me.jpg'
              alt='Dr. Borisov'
              fill
              className='object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100'
            />
          </div>
        </FadeIn>
        <div>
          <FadeIn delay={0.2}>
            <h2 className='text-4xl md:text-5xl font-light mb-8 text-zinc-900 leading-tight'>
              Борисов Борис Иванович — <br />{' '}
              <span className='text-emerald-700'>визионер</span> вашей
              уверенности
            </h2>
            <p className='text-zinc-500 text-lg mb-10 leading-relaxed font-light'>
              Основатель клиники «СЕАЛ». Мы создаем не просто зубы, мы
              проектируем гармонию лица, используя премиальные материалы и
              цифровое планирование.
            </p>
            <div className='space-y-6'>
              {[
                'Швейцарские импланты',
                'Цифровая диагностика 3D',
                'Безболезненное лечение',
              ].map((text, i) => (
                <div
                  key={i}
                  className='flex items-center space-x-4 border-b border-zinc-100 pb-4'
                >
                  <div className='w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center'>
                    <Check size={14} className='text-emerald-600' />
                  </div>
                  <span className='text-zinc-800 tracking-wide font-light'>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  </section>
)

// --- 4. Works (Галерея) ---
const Works = () => (
  <section id='Работы' className='py-32 bg-zinc-50'>
    <div className='max-w-7xl mx-auto px-6'>
      <div className='flex justify-between items-end mb-20'>
        <h2 className='text-6xl font-light tracking-tighter'>Кейсы</h2>
        <p className='text-zinc-400 uppercase tracking-widest text-xs mb-2'>
          Портфолио клиники
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-8'>
        {[1, 2, 3].map(item => (
          <motion.div
            key={item}
            whileHover={{y: -10}}
            className='bg-white p-4 group cursor-pointer shadow-sm'
          >
            <div className='relative aspect-square overflow-hidden mb-6'>
              <div className='absolute inset-0 bg-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity z-10' />
              <div className='w-full h-full bg-zinc-200' />{' '}
              {/* Заглушка для фото работ */}
            </div>
            <h3 className='text-xl font-light mb-2'>Виниры из E-max</h3>
            <p className='text-zinc-400 text-sm italic'>Срок работы: 14 дней</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// --- 5. Price Section ---
const PriceSection = () => (
  <section id='Прайс' className='py-32 bg-white px-6'>
    <div className='max-w-3xl mx-auto'>
      <h2 className='text-center text-5xl font-light mb-20'>
        Инвестиции в здоровье
      </h2>
      <div className='space-y-12'>
        {[
          {name: 'Консультация и 3D-план', price: 'от 5 000 ₽'},
          {name: 'Керамический винир (Швейцария)', price: 'от 55 000 ₽'},
          {name: 'Имплантация Nobel Biocare', price: 'от 85 000 ₽'},
          {name: 'Профессиональная гигиена', price: 'от 12 000 ₽'},
        ].map((service, i) => (
          <div
            key={i}
            className='flex justify-between items-end border-b border-zinc-100 pb-4 group'
          >
            <span className='text-xl font-light group-hover:text-emerald-700 transition-colors'>
              {service.name}
            </span>
            <div className='flex-1 border-b border-dotted border-zinc-300 mx-4 mb-1' />
            <span className='text-zinc-900 font-medium'>{service.price}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// --- 6. Contact & Map ---
const Contact = () => (
  <section
    id='Контакты'
    className='py-32 bg-zinc-900 text-white overflow-hidden'
  >
    <div className='max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20'>
      <div>
        <h2 className='text-6xl font-light mb-16 tracking-tighter italic'>
          Ждем вас
        </h2>
        <div className='space-y-10'>
          <div className='flex items-start space-x-6'>
            <MapPin className='text-emerald-500 mt-1' />
            <div>
              <p className='text-zinc-500 uppercase text-xs tracking-widest mb-2'>
                Адрес
              </p>
              <p className='text-xl font-light'>
                г. Тольятти, Центральная площадь, 8
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-6'>
            <Phone className='text-emerald-500 mt-1' />
            <div>
              <p className='text-zinc-500 uppercase text-xs tracking-widest mb-2'>
                Телефон
              </p>
              <p className='text-xl font-light'>+7 (927) 770-96-90</p>
            </div>
          </div>
          <div className='flex items-start space-x-6'>
            <Clock className='text-emerald-500 mt-1' />
            <div>
              <p className='text-zinc-500 uppercase text-xs tracking-widest mb-2'>
                График
              </p>
              <p className='text-xl font-light'>Пн-Пт: 09:00 – 18:00</p>
              <p className='text-zinc-500 text-sm'>Сб-Вс: выходной</p>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-[500px] bg-zinc-800 rounded-sm overflow-hidden  contrast-125'>
        {/* Здесь будет LazyMap, пока просто визуальный блок */}
        <div className='absolute inset-0 flex items-center justify-center text-zinc-600 italic'>
          <LazyMap />
        </div>
      </div>
    </div>
  </section>
)

// --- 7. Footer & Modals ---
const Footer = () => {
  const [modal, setModal] = useState<string | null>(null)

  return (
    <footer className='bg-zinc-950 py-20 px-6 border-t border-zinc-900'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0'>
        <div className='text-zinc-500 text-sm font-light'>
          © 2024 Стоматология «СЕАЛ». Все права защищены.
        </div>
        <div className='flex space-x-8 text-zinc-500 text-xs uppercase tracking-widest'>
          <button
            onClick={() => setModal('privacy')}
            className='hover:text-white transition-colors'
          >
            Политика
          </button>
          <button
            onClick={() => setModal('cookie')}
            className='hover:text-white transition-colors'
          >
            Cookies
          </button>
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6'
          >
            <motion.div
              initial={{scale: 0.9, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              className='bg-white p-12 max-w-2xl relative text-zinc-900'
            >
              <button
                onClick={() => setModal(null)}
                className='absolute top-6 right-6 text-zinc-400 hover:text-black'
              >
                <X size={24} />
              </button>
              <h3 className='text-2xl font-light mb-6 uppercase tracking-widest'>
                {modal === 'privacy' ? 'Конфиденциальность' : 'Cookie Policy'}
              </h3>
              <p className='text-zinc-500 leading-relaxed font-light'>
                {modal === 'privacy'
                  ? 'Мы используем ваши данные только для записи на прием. Ваши данные защищены в соответствии с ФЗ-152.'
                  : 'Мы используем файлы cookie, чтобы сделать ваш опыт использования сайта максимально комфортным.'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

// --- Main Page ---
export default function Home() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 1000)
    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  return (
    <main className='bg-white selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden'>
      <Navbar />
      <Hero />
      <Benefits />

      {/* Динамическая вставка Process */}
      <section className='py-32 bg-emerald-900 text-white'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h2 className='text-4xl font-light mb-16 tracking-widest uppercase'>
            Ваш путь к улыбке
          </h2>
          <div className='grid md:grid-cols-4 gap-12'>
            {['Диагностика', 'План лечения', 'Процедура', 'Контроль'].map(
              (step, i) => (
                <div key={i} className='relative group'>
                  <div className='text-8xl font-bold opacity-5 group-hover:opacity-10 transition-opacity absolute -top-10 left-1/2 -translate-x-1/2'>
                    {i + 1}
                  </div>
                  <p className='text-xl font-light tracking-wide'>{step}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Works />
      <PriceSection />

      {/* Testimonials */}
      <section id='Отзывы' className='py-32 bg-white'>
        <div className='max-w-4xl mx-auto px-6 text-center italic text-3xl font-light text-zinc-700 leading-relaxed'>
          "Лучшая клиника в Тольятти. Борис Иванович — настоящий перфекционист.
          Результат превзошел все мои ожидания."
          <div className='mt-8 not-italic text-sm uppercase tracking-widest text-emerald-600'>
            — Елена Воронова
          </div>
        </div>
      </section>

      <Contact />
      <Footer />

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className='fixed bottom-10 right-10 z-50 bg-white border border-zinc-100 shadow-2xl p-4 rounded-full hover:bg-zinc-50 transition-all group'
          >
            <ChevronUp
              size={20}
              className='text-zinc-400 group-hover:text-emerald-600 group-hover:-translate-y-1 transition-transform'
            />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}
