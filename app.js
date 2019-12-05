var request=require('request');

var keywords='周杰伦';
var num=30;
var url1=encodeURI('http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key='+keywords+'&pn=1&rn='+num);

function start(url){
    var option={
        method: 'GET',
        url:url,
        headers: { 
            'referer' : 'http://www.kuwo.cn/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
            'Cookie': 'uname3=%u5929%u4F7F%u7684%u70E4%u7FC5%u8180; t3kwid=495639722; userid=495639722; websid=2004954303; pic3=""; t3=weixin; nickName=""; pic=""; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1572268550; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1572268550; kw_token=2BDZ9DMOQBH',
            'csrf': '2BDZ9DMOQBH'
        }
    }
    request(option,function(err,res,body){
        if(!err&&res.statusCode==200){
            var code=JSON.parse(body).data.list;
            var songinfo = [];
            for(var i=0;i<code.length;i++){
                songinfo.push({
                    'musicrid':code[i].rid,
                    'name':code[i].name,
                    'artist':code[i].artist,
                    'pic':code[i].pic,
                });
            }
            for(var j=0;j<songinfo.length;j++){
                (function(j){
                    setTimeout(function(){
                        getmusic(songinfo[j]);
                    },j*1500);
                 })(j);
            }
        }else{
            console.log(err);
        }
    });
}

function getmusic(info){
    var option2={
        method: 'GET',
        url:'http://www.kuwo.cn/url?format=mp3&rid='+info.musicrid+'&response=url&type=convert_url3&br=320kmp3',
        headers: { 
            'referer' : 'http://www.kuwo.cn/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36',
            'Cookie': 'uname3=%u5929%u4F7F%u7684%u70E4%u7FC5%u8180; t3kwid=495639722; userid=495639722; websid=2004954303; pic3=""; t3=weixin; nickName=""; pic=""; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1572268550; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1572268550; kw_token=2BDZ9DMOQBH',
            'csrf': '2BDZ9DMOQBH'
        }
    }
    request(option2,function(err,res,body){
        if(!err&&res.statusCode==200){
            var a=JSON.parse(body).url;
            console.log('歌曲名：'+info.name+'\n歌手：'+info.artist+'\n地址：'+a+'\n----------------------------------------------------------------------------------');
        }else{
            console.log(err);
        }
    });
}
start(url1);