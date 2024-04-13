const dirname = __dirname.replace('build', '')
module.exports = {
    entry: dirname + '/src/index.js',
    output: {
        filename: 'pdf_maker.js',
        clean:true,
        environment: {
            arrowFunction: false,
        },
    },
    resolve:{
        alias: {
            '@':'./src'
        },
    },
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        port: "8080",
        proxy: {
            "/api": {
                target: 'https://www.6pian.cn',
                changeOrigin: true,
                secure: true, // 如果是https接口，需要配置这个参数
                pathRewrite:{
                    '^/api':''
                },
                headers: {
                    'kan-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodW9kZSIsInN1YiI6IjE1OTY4NjU5MTY2IiwiYXVkIjoiMTQ5NDIxIiwiaWF0IjoxNjQ5NjQ4MzQyLCJzaWduIjoiOTk1ZWVmMjlhMGZjODk3NzJhZmY3N2FjZTJiMGYwY2IiLCJleHAiOjE2ODExODQzNDJ9.GB9LZAh8T6j6SPw2QHsOysSPHjQfa0ELJdS0j8KnYUA'
                }
            }
          },
    },
};