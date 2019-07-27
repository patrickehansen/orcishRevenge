const chai = require('chai');
const spies = require('chai-spies');
const client = require('socket.io-client');
const moment = require('moment');

const database = require('../src/data/database');
const dataManager = require('../src/data/dataManager');
const socketServer = require('../src/socket/socketServer');
const token = require('../src/util/token');

chai.use(spies);
const expect = chai.expect;

const server = new socketServer();

let socketClient;
const testAccount = {
  Username: 'testAccount',
}

let idtoken;

describe('chatRoll', () => {
  before(() => {
    return new Promise(async (resolve, reject) => {
      while(!database.Ready) {
        await new Promise(res => setTimeout(res, 100))
      }

      console.log('database ready')
      await dataManager.CreateAccount(testAccount.Username, 'no', 'no').catch(error => {
        console.error('Error creating account', error);
      })

      idtoken = token.createToken(testAccount)

      resolve();
    });
  })

  it('connects to the socket server', (done) => {
    const socketClient = client('http://0.0.0.0:5000');
  
    const connectSpy = chai.spy(() => {
      expect(connectSpy).to.have.been.called;
      socketClient.disconnect();
      done();
    });

    socketClient.on('connect', connectSpy)
  })

  it('registers with a token', (done) => {
    let socketClient = client('http://0.0.0.0:5000');

    const onChat = (data) => {
      expect(data.Type).to.equal('chat');
      expect(data.Sent).to.not.be.null;
      expect(data.Message).to.equal(`${testAccount.Username} has joined the game.`)

      expect(chatSpy).to.have.been.called.once;
      socketClient.disconnect();
      socketClient = null;
      done();
    }

    const chatSpy = chai.spy(onChat);
    socketClient.on('connect', () => {
      socketClient.emit('register', {token: idtoken})
    })

    socketClient.on('chat', chatSpy);
  })

  it('receives a chat message', (done) => {
    const socketClient = client('http://0.0.0.0:5000');

    const onChat = (data) => {
      expect(data.Type).to.equal('chat');
      expect(data.Sent).to.not.be.null;
      expect(typeof data.Message).to.equal('string');

      if (data.Message.includes('has joined the game.')) {
        expect(data.Message).to.equal(`${testAccount.Username} has joined the game.`)
        socketClient.emit('chat', {
          message: 'another chat message!',
          sent: moment(),
        })
      }else if (data.Message === 'another chat message!') {
        socketClient.disconnect();

        expect(chatSpy).to.have.been.called.twice;
        done();
      }
    }

    const chatSpy = chai.spy(onChat);
    socketClient.on('connect', () => {
      socketClient.emit('register', {token: idtoken})
    })

    socketClient.on('chat', chatSpy);
  })

  it('receives a roll message', (done) => {
    const socketClient = client('http://0.0.0.0:5000');

    const onChat = (data) => {
      if (data.Type === 'roll') {
        expect(data.Type).to.equal('roll');
        expect(data.Sent).to.not.be.null;
        expect(typeof data.Roll).to.equal('object');  

        expect(data.Roll).to.have.nested.property('dice')
        expect(data.Roll).to.have.nested.property('sum')
        expect(data.Roll).to.have.nested.property('count')
        expect(data.Roll).to.have.nested.property('size')
        expect(data.Roll).to.have.nested.property('post')
        expect(data.Roll).to.have.nested.property('operator')
        expect(data.Roll).to.have.nested.property('raw')
        expect(data.Roll).to.have.nested.property('total')

        expect(chatSpy).to.have.been.called.twice;

        const calcSum = data.Roll.dice.reduce((a,b) => a + b, 0);

        expect(calcSum).to.be.equal(data.Roll.sum);
        expect(data.Roll.dice.length).to.be.equal(data.Roll.count);

        socketClient.disconnect();
        done();
      }else{
        socketClient.emit('chat', {
          message: '/roll 3d6-12',
          sent: moment(),
        })
      }
    }

    const chatSpy = chai.spy(onChat);
    socketClient.on('connect', () => {
      socketClient.emit('register', {token: idtoken})
    })

    socketClient.on('chat', chatSpy);
  })

  it('receives an emote message', (done) => {
    const socketClient = client('http://0.0.0.0:5000');

    const onChat = (data) => {
      if (data.Type === 'emote') {
        expect(data.Type).to.equal('emote');
        expect(data.Sent).to.not.be.null;
        expect(data.Sender).to.equal(testAccount.Username);
        expect(data.Message.slice(0,4)).to.equal('/me ');  

        expect(chatSpy).to.have.been.called.twice;

        socketClient.disconnect();
        done();
      }else{
        socketClient.emit('chat', {
          message: '/me has a baby',
          sent: moment(),
        })
      }
    }

    const chatSpy = chai.spy(onChat);
    socketClient.on('connect', () => {
      socketClient.emit('register', {token: idtoken})
    })

    socketClient.on('chat', chatSpy);
  })

  after((done) => {

    done();
  })
})