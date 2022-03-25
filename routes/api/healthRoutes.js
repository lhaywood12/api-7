const express = require('express')
const router = express.Router()
const fetch =(...args)=> import('node-fetch').then(({default:fetch}) => fetch(...args))

//All health
router.get('/', (req, res)=> {
    const URL = `https://api.sampleapis.com/health/professions`

    fetch(URL)
    .then(res => res.json())
    .then(data => {
        res.render('pages/health', {
            title:'All Health',
            name: 'Health List',
            data
        })
    })
})

//Single Health
router.get('/:id', (req, res)=> {
    const id=  req.params.id
    const URL =`https://api.sampleapis.com/health/professions/${id}`

    fetch(URL)
    .then(res => res.json())
    .then(data => {

        if(Object.keys(data).length >=1){
            res.render('pages/single-health', {
                title:`${data.title}`,
                name:`${data.title}`,
                data
            })
        } else {
            res.render('pages/404', {
                title: '404 - Error',
                name: '404-Error',
            })
        }
    })
    .catch(error => {
        console.log('ERROR', error)
    })
})

module.exports = router