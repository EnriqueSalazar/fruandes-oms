/**
 * Created by enriq on 20/06/16.
 */
console.info('Server environment', process.env.NODE_ENV);
let  isProduction = process.env.NODE_ENV === 'production';
let server;
let port;
if (isProduction){
   // server = 'localhost';
   server = '52.39.41.242';
   port = '80';
}else{
   server = 'localhost';
   port = '3000';
}
export default 'http://'+server+':'+port;
