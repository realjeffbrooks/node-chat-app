var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'jeff';
    var text = 'text';

    var message = generateMessage(from, text);

    expect(message.from).toEqual(from);
    expect(message.text).toEqual(text);
    expect(message.createdAt).toBeA('number');
    
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object',() => {
    var from = 'Admin';
    var lat = 1;
    var long = 1;
    var url = `https://www.google.com/maps?q=${lat},${long}`

    var locationMessage = generateLocationMessage(from, lat, long)

    expect(locationMessage.from).toEqual(from);
    expect(locationMessage.url).toEqual(url);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage).toInclude({from,url});

  });
});