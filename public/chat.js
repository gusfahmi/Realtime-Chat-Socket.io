var io = io();

const messageInput = document.getElementById('message'),
    nameInput = document.getElementById('handle'),
    btn = document.getElementById('btn'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', ()=>{ 

    let name = nameInput.value.trim();
    let msg = messageInput.value.trim();

    //if user hit the button, set the name input to readonly
    if(name !== ''){
        nameInput.setAttribute('readonly', 'true');
    } 

    
    if(msg !== '' && name !== ''){
        io.emit('chat', {
            message: msg,
            name: name
        });
        messageInput.value = '';
    }
});


messageInput.addEventListener('keypress', ()=>{   
    io.emit('typing', nameInput.value); 
});




//listen broadcast typing..
io.on('typing', (name)=>{ 
    feedback.innerHTML = '<p><em>'+ name +'</em> is typing...</p>';
}); 

//listen back response from server and show the chat data.
io.on('chat', (data)=>{
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>'+data.name+'</strong> : '+data.message+'</p>';
})