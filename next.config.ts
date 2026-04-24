const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export', // Статический экспорт
  basePath: isProd ? '/seal' : '', // Имя вашего репозитория
  assetPrefix: isProd ? '/seal/' : '', // То же имя
  images: {
    unoptimized: true, // Отключаем оптимизацию для статического экспорта
  },
}
