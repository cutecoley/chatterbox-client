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
 
 url: app.server,
 type: 'GET',
 data: JSON.stringify(message),
 contentType: 'application/json',
 success: function (data) {
   console.log('chatterbox: Message sent');
 },
 error: function (data) {
  
   console.error('chatterbox: Failed to send message', data);
 }
});
};

app.clearMessages = function () {
 $('#chats').empty();

};

app.renderMessage = function (message) {
  $('#chats').prepend("<li class='list-group-item'>" + "<strong class='username'>" + app.escapeHtml(message.username) + "</strong>: " + app.escapeHtml(message.text)  + "</li>");
};

app.escapeHtml = function (string) {
  var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};

app.renderRoom = function (room) {
  $('#roomSelect').append('<li>' + room + '</li>');
};
