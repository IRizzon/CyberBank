const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('./Services/userService');

passport.use(new LocalStrategy(
    {
        usernameField: 'CPF',
        passwordField: 'senha'
    },
    async (CPF, senha, done) => {
        try {
            const userData = await userService.carregarCPF(CPF);

            if (!userData || userData.senha !== senha) {
                return done(null, false, { message: "CPF ou senha incorreto" });
            }

            return done(null, userData);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.CPF);
});

passport.deserializeUser(async (CPF, done) => {
    try {
        const userData = await userService.carregarCPF(CPF);
        done(null, userData);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;