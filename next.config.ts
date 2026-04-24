const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export',
  basePath: '/seal', // Укажите явно
  images: {
    unoptimized: true,
  },
}
