// YOUR CODE HERE:

var app = {};
app.init = function(){

}
app.send = function(){
	var message = arguments[0];
	$.ajax({
	  // This is the url you should use to communicate with the parse API server.
	  url: 'https://api.parse.com/1/classes/messages',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    console.error('chatterbox: Failed to send message', data);
	  }
	});
};
app.fetch = function() {
	$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: app.server,
  type: 'GET',
  contentType: 'application/json',
  success: function (JSON) {
    console.log('message');
  },
  error: function (err) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
}
