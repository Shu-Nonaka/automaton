module.exports = {
  mode: 'development',
  entry: './resources/ts/index.ts',
  output: {
    path: `${__dirname}/docs/js/dist`,
    filename: 'life-game.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}