var expect = require('expect');

var {
    genarateMessage
} = require('./message');

describe('genarateMessage', () => {
    it('should genarate correct message object', () => {
        var from = 'Udara';
        var text = 'this is a Sample text';
        var message = genarateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});
