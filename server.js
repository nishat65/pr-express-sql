const app = require('./src');
const swaggerDocs = require('./swagger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    swaggerDocs(app);
    console.log('server started on port: ' + PORT);
});
