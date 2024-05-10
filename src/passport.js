//Immportar pacotes
const passport = require('passport');
const userService = require('./Services/userService');
const LocalStrategy = require('passport-local').Strategy;

//Configuração de Autenticação
passport.use(new LocalStrategy(
    {
        usernameField: 'CPF',
        passwordField: 'senha'
    },
    async (CPF, senha, done) => {
        try{
            const userData = await userService.carregarCPF(CPF);

            if(!userData || userData.senha !== senha){
                return done(null, false, {message: "CPF ou senha incorreto"});
            }

            return done(null, userData);
        } catch (error){
            return done(error);
        }
    }
));

// Serialize e deserialize o usuário para manter a sessão
passport.serializeUser((user, done) => {
    done(null, user.CPF);
  });
  
  passport.deserializeUser(async (CPF, done) => {
    try {
      // Carrega os dados do usuário pelo CPF
      const userData = await userService.carregarCPF(CPF);
      done(null, userData);
    } catch (error) {
      done(error);
    }
  });