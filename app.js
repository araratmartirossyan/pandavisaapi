const app = require('./src/main')
// Start the server
const port = process.env.PORT || 3000
app.listen(port)
// eslint-disable-next-line no-console
console.log(`Server running at localhost:${port}`)
