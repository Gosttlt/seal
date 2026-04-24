const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export', // Включает статический экспорт
  basePath: isProd ? '/seal' : '', // Замените 'seal' на имя вашего репозитория
  // assetPrefix: isProd ? '/seal/' : '', // То же имя
  images: {
    unoptimized: true, // Отключает оптимизацию изображений для статического экспорта
  },
}
