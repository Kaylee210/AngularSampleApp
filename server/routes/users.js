const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken');
const config = require('../config');

router.post('/login', function(req, res) {
    const { email, password } = req.body
    if(!email ){
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
    }
    if(!password ){
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
    }

    // findOne関数を使えば、1つでも同じデータが見つかったら検索を止める関数
    User.findOne({email}, function(err, foundUser){
        if(err){
            return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]})
        }
        if(!foundUser){
            return res.status(422).send({errors: [{title: 'User error', detail: 'User is not exist!'}]})
        }

        if(!foundUser.hasSamePassword(password)){
            return res.status(422).send({errors: [{title: 'User error', detail: 'Incorrect password!'}]})
        }

        const token = jwt.sign({
            userId: foundUser.id,
            username: foundUser.username
          }, config.SECRET, { expiresIn: '1h' });

        return res.json(token)

    })
})

router.post('/register', function(req, res) {
    const { username, email, password, comfirmPassword } = req.body

    /* // 登録と変数が同じメンバ名ならば、上記のような書き方も可能
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const comfirmPassword = req.body.comfirmPassword*/

    if(!username){
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill username!'}]})
    }
    if(!email ){
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill email!'}]})
    }
    if(!password ){
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please fill password!'}]})
    }
    if( password !== comfirmPassword ){
        return res.status(422).send({errors: [{title: 'User error', detail: 'Please check password!'}]})
    }
    // findOne関数を使えば、1つでも同じデータが見つかったら検索を止める関数
    User.findOne({email}, function(err, foundUser){
        if(err){
            return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]})
        }
        if(foundUser){
            return res.status(422).send({errors: [{title: 'User error', detail: 'User already exist!'}]})
        }
        const user = new User({username, email, password})
        user.save(function(err){
            if(err){
                return res.status(422).send({errors: [{title: 'User error', detail: 'Something went wrong'}]})
            }
            return res.json({"registerd": true})
        })
    })
})

module.exports = router