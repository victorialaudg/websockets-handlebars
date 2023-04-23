const {Router} = require('express')
const router = Router()

router.get('/',(req,res)=>{
    res.render('index',{
        name: 'Alex'
    })
})

module.exports = router