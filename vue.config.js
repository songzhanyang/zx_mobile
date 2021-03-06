
const pxRem = require("postcss-pxtorem")

module.exports = {
    publicPath: './',
    css:{
        loaderOptions:{
            postcss: {
                //selectorBlackList正则过滤，符合的class不进行rem转化
                //单个的css语句需过滤的情况下，可以使用PX或Px单位
                plugins:[pxRem({
                    autoprefixer:{},
                    rootValue: 75,
                    propList: ["*"],
                    selectorBlackList:[".ig-",".dp-","ivu-"]
                })]
            }
        }
    },
    devServer: {
        port: 8081,
        hotOnly: false,
        disableHostCheck: true,
        proxy: {
            '/': {  //代理地址
                target: 'http://api.kaoshi.kanee.top/api',  //需要代理的地址
                changeOrigin: true,  //是否跨域
            }
        }
    }
}