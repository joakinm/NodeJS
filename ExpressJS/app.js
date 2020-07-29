const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
//----------Cargando template engine Handlebars
const expressHbs = require('express-handlebars');
const err404 = require('./controllers/404');
const app = express();
//-----------setteango template engine como handlebars
app.engine('hbs',expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
app.set('view engine','hbs');
app.set('views','views');

//---------creando las rutas
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//------------cargando CSS
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//------------no importa orden de los use, importa la direccion que se use
app.use('/admin',adminRoutes);
app.use(shopRoutes);

//---------- toda pagina que no este escrita cae a este middleware, que seria el error 404
app.use(err404.error404);


app.listen(3000); //ya hace el create server en puerto 3000