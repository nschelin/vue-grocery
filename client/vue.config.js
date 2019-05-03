module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: process.env.PROXY_URL,
				changeOrigin: true
			}
		}
	}
};
