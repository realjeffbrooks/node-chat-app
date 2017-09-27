var expect = require('expect');

var {generateMessage} = require('./message');

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