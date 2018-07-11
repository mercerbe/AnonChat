//connect to server
const socket = io.connect("http://localhost:8080");
socket.on('connect', data => {
  socket.emit('join', 'client connected to server')
})

//update messages on thread event
socket.on('thread', data => {

  let allMessages = $(".all_messages");
  let messageDisplay = $("<div class='ui middle aligned animated list'></div>");
  let item = $("<div class='item'></div>");
  let image = $("<img class='ui avatar image' src='./images/avatar2.png'>");
  let content = $("<div class='content'></div>");
  let header = $("<div class='header'>" + 'user:' + "</div>");
  let messageText = $("<div class='description'>" + data + "</div>");

  messageDisplay.append(item);
  item.append(image);
  item.append(content);
  content.append(header);
  content.append(messageText);

  allMessages.prepend(messageDisplay);


})

//send messages, clear form
$("form").submit( (event) => {
  event.preventDefault();
  let message = $("#message_body").val();
  socket.emit('messages', message);
  clearForm();
})

//clear form
function clearForm() {
  let messageArea = $("#message_body");
  messageArea.val('');
}
