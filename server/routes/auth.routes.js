const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const config = require('config');
const authMiddleware = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');
const File = require('../models/File');

const router = new Router();

router.post('/reg', 
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', "Password must to be longer than 3 and less than 12").isLength({min: 3, max:12})
    ],
    async (req, res) => {
    
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.status(400).json({message: "Uncorrect request", errors});
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email});

        if(candidate) {
            return res.status(400).json({message: `User with email ${email} alredy exist`});
        }   
        const hashPass = await bcrypt.hash(password, 8);
        const user = new User({email, password: hashPass});
        await user.save();
        await fileService.createDir(new File({user: user.id, name: ''}));
        return res.json({message: 'User was created'});

    } catch (error) {
        console.log(error);
        res.send({message: 'Server Error'});
    }
})

router.post('/login', 
    async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(!user) {
                return res.status(404).json({message: "User not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password);
            if(!isPassValid){
                return res.status(400).json({message: "Invalid password"});
            }
            const token = jwt.sign({id: user.id},config.get("secretKey"), {expiresIn: '1h'});

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            });

        } catch (error) {
            console.log(error);
            res.send({message: 'Server Error'});
        }
})

router.get('/auth', authMiddleware, 
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const token = jwt.sign({id: user.id},config.get("secretKey"), {expiresIn: '1h'});

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            });
        } catch (error) {
            console.log(error);
            res.send({message: 'Server Error'});
        }
})

module.exports = router;
