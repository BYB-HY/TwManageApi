//验证码图片配置

let svgCaptcha = require('svg-captcha');

class Captcha{

    getCode(){
        let captcha = svgCaptcha.create({
            incerse: false, //翻转颜色
            fontSize: 48,//字体大小
            noise: 2,//噪声线条数
            width: 100,//宽度
            heigth: 40,//高度
            size: 4,//验证码长度
            ignoreChars: '0oli',//验证码字符中排除0oli
        });
        return captcha
    }
}



module.exports = Captcha