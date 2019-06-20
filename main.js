var request = require("request")
var cheerio = require("cheerio")
var async = require("async")

const Post = require('./classes/post')
const Utils = require('./classes/utils')

// URL a ser consultada
const URI = "https://cortex-intelligence.com/blog/"
// Número de páginas a serem buscadas no blog
const NUMBER_OF_PAGES = 1
// Número de posts por página
const POSTS_PER_PAGE = 0

async function retriveLinks(startingPage, numLinks = 0){
    return new Promise(async function(resolve, reject){
        request({
            uri: startingPage,
        }, async function(error, response, body) {
            
            if(error != null){
                return reject(error)
            }
            try{    
                var links = []
                var $ = cheerio.load(body)
                
            
                $(".post-title a").each(async function() {
                    if(links.length < numLinks || numLinks == 0){
                        var post = $(this);
                        var link = post.attr("href")
                        
                        links.push(link)
                    }          
                })
                
                resolve(links)
            }catch(e){
                console.log(e)
                reject(e)
            }
        })
    })
}


async function crawl(link){
    return new Promise(async function(resolve, reject){
        request({
            uri: link,
        }, async function(error, response, body) {
            
            if(error != null){
                return reject(error)
            }
            try{    
                var posts = []
                var $ = cheerio.load(body)

                var postBlock = $(".share-simple");
                var title = postBlock.find(".entry-title").text()
                var subtitle = postBlock.find(".resumo p").text()
                var author = postBlock.find(".post-meta .author-date .author-info a").text()
                var postDate = postBlock.find(".post-meta .author-date .post-date").text()
                postDate = Utils.formatDate(postDate)

                var imgs = []
                var vids = []
    
                $(".wp-block-image img").each(function(){
                    imgs.push($(this).attr("src"))
                })
                
                $("iframe").each(function(){
                    vids.push($(this).attr("src"))
                })

                var p = new Post(title, subtitle, author, postDate, imgs, vids)
                resolve(p)


            }catch(e){
                console.log(e)
                reject(e)
            }
        })        
    })
}


async function main(){

    try{
        var links = []
        for (i = 1; i <= NUMBER_OF_PAGES; i++){
            const receivedLinks = await retriveLinks(URI + "page/" + NUMBER_OF_PAGES, POSTS_PER_PAGE)
            if (links.length == 0){
                links = receivedLinks
            }else{
                links = links.concat(receivedLinks)
                
            }
        }
        
        var posts = []
    
        await async.forEach(links, async function(l, callback){
            const p = await crawl(l)
            posts.push(p)    
        })    
        
        //console.log(posts.length)
        console.log(JSON.stringify(posts))
    }catch(e){
        console.log(e)
    }
}

main()
