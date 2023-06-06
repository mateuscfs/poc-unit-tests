import 'reflect-metadata';
import app from './app';

const PORT = process.env.PORT || 3000;

async function startServer() {
    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Test Service running on port ${PORT}`);
    });
}
startServer();
