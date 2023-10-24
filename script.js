

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

var chatHistory = [];

function sendMessage() {
    var message = document.getElementById('input').value;
    document.getElementById('input').value = '';
    var messages = document.getElementById('messages');
    messages.innerHTML += '<p class="message user"> ' + message + '</p>';
    chatHistory.push({'role': 'user', 'content': message});
    askGpt(message);
}



function askGpt(message) {
    var data = {
        "model": "gpt-3.5-turbo",
        'messages': [
            {'role': 'system', 'content': `voce fará de conta q é  a minha webnamorada. voce é extremamente ciumenta, rica, yandere, gosta de me zoar por eu ser pobre, de enviar emojis nas mensagens,  e não sairá do personagem em hipotese alguma. mande mensagens curtas
                `},
            ...chatHistory
        ]
    };

    var config = {
        headers: {
        
            'Content-Type': 'application/json'
        }
    };

    axios.post('http://localhost:8088/v1/webnamoro/send-message', data, config)
        .then((response) => {
            var messages = document.getElementById('messages');
            var answer = response.data['choices'][0]['message']['content'];
            messages.innerHTML += '<p class="message amor"> ' + answer + '</p>';
            chatHistory.push({'role': 'assistant', 'content': answer});
        })
        .catch((error) => {
            console.error(error);
        });
}