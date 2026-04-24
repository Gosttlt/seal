const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  output: 'export',
  basePath: isProd ? '/seal' : '', // Укажите явно
  images: {
    unoptimized: true,
  },
}
