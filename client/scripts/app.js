// YOUR CODE HERE:
var app = {


};
app.server = 'https://api.parse.com/1/classes/messages';
app.roomNames = {};


app.init = function() {

  // Creating our listeners
  $( '.submit' ).on( 'click', app.handleSubmit);

  // Delegate handlers to the friend class
  $( "#chats" ).on( "click", "strong", app.handleUsernameClick);

  // Add handler to room dropdown menu
  $('#roomSelect').on('change', function(event) {
    if ($(this).val() === 'CREATE NEW ROOM') {
      // create a new room
      var newRoom = prompt('Enter the name of your new room');
      $('#roomSelect').append('<option value=' + newRoom + '>' + newRoom + ' </option>');
      $('#roomSelect').val(newRoom);
    }
  });

};

app.handleUsernameClick = function(event) {
  $(this).addClass('friend');
};

app.handleSubmit = function(event) {
  event.preventDefault(); // prevents default behavior of refreshing the page
  var username = app.getParameterByName('username');
  var message = $('#message').val();
  var message = {
    username: username,
    text: message,
    roomname: 'lobby' // TODO remove hardcoding
  };
  app.send(message);
};


app.send = function(message) {
  $.ajax({
    url: app.server,
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
    data: { order: '-createdAt' },
    success: function (data) {
      app.displayMessages(data);
      app.getRoomNames(data);
    },
    error: function (data) {

      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.getRoomNames = function(data) {
  data.results.forEach(function(value) {
    app.roomNames[value.roomname] = value.roomname;
  });

  for (var key in app.roomNames) {
    $('#roomSelect').append('<option value=' + key + '>' + key + ' </option>');
  }
};

app.displayMessages = function(data) {
  // get results array
  var $chats = $('#chats');
  app.clearMessages();

  // // Filter by messages in the current chat room
  // var filteredResults = _.filter(data.results, function(element) {
  //   return element.roomname === $('#roomSelect').val();
  // });

  var results = data.results;

  results.forEach(function(element, index) {
    app.renderMessage(element);
    //$chats.append('<div class="chat">' + element.username + ':<div class="username">' + element.text + '</div</div>');
  });
};

app.clearMessages = function () {
  $('#chats').empty();

};

app.renderMessage = function (message) {
  $('#chats').append("<li class='list-group-item'>" + "<strong class='username'>" + app.escapeHtml(message.username) + "</strong>: " + app.escapeHtml(message.text)  + "</li>");
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



app.getParameterByName = function(name, url) { // TODO figure out exactly how this regex works
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) {
    return null;
  } 

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

$( document ).ready(function() { // can only manipulate the page once the document is ready
  app.init();
  app.fetch();

});

// Get all the roomnames in the objects
// Populate the dropdown list with unique roomnames
// 


