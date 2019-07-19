import ms from 'ms';

export default {
  server: process.env.NODE_ENV === 'development' ? 'http://localhost:6190' : 'https://orcish-revenge.herokuapp.com',
  localstorageKey: 'PEHLLC-orcishRevenge-id_token',
  errorClearTime: ms('5s'),
}