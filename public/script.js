document.getElementById("j").onclick = (e)=>{
    e.preventDefault();
    var username = document.getElementById("um").value;
    var roomid = document.getElementById("rm").value;
    createRoom(roomid);
    
}

var div,main,chat,chatInput,chatSend;

function createRoom(ROOM_ID){
        document.body.innerHTML='';
        // document.body.style.backgroundColor="black";
        // document.body.style.color="white";
        // const ROOM_ID=data.roomID;
        div=document.createElement('div');
        const h=document.createElement('div');
        h.style.width='100%';
        h.style.padding='5px';
        h.innerHTML=`Room Id: ${ROOM_ID}`;
        div.id='video-grid';
        main=document.createElement('div');
        chat=document.createElement('div');
        chatInput=document.createElement('input');
        chatInput.id='chatInput'
        chatSend=document.createElement('button');
        chatSend.innerText='Send'
        chatSend.id='chatSend'

        chat.id='chat';
        main.id='main';
        chat.appendChild(h);
        chat.appendChild(chatInput)
        chat.appendChild(chatSend);
        main.appendChild(div);
        main.appendChild(chat);
        document.body.appendChild(main);
        const e=document.getElementById('video-grid');
        createVideo(ROOM_ID);


}


function createVideo(ROOM_ID) {
  // const { renderFile } = require("ejs")

  const socket = io('/')
  const videoGrid = document.getElementById('video-grid')
  const myPeer = new Peer(undefined, {
    host: 'localhost',
    port: '3001',
    path:'/'
  })
  const myVideo = document.createElement('video')
  myVideo.muted = true
  const peers = {}
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
      call.answer(stream)
      const video = document.createElement('video')
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      })
    })

    socket.on('user-connected', userId => {
      connectToNewUser(userId, stream)
      notify(`${userId} connected`)

    })
  })

  socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
  })

  myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
  })

  function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
      video.remove()
    })

    peers[userId] = call
  }

  function notify(message){
    const notification=document.createElement('div')
    notification.style.backgroundColor='grey'
    notification.style.width='100%'
    notification.innerText=`${message}`
    chat.appendChild(notification)

    
  }

  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }

}
  document.getElementById("c").onclick = (e)=>{
    e.preventDefault();
    // alert('gh');
    var username = document.getElementById("um").value;
    document.getElementById("rm").value="_blank";
    fetch("http://localhost:3000/create",{
      method:"POST",
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({
        username:username
        

      })
    }).then(
      data=> data.json()
      ,
      (error)=>{
        console.log(error);
      }
    ).then(
      (data)=>{
        console.log(data);
        createRoom(data.roomID);


      }
    )
  }