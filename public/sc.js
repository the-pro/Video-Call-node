document.getElementById("j").onclick = ()=>{
    var username = document.getElementById("um").value;
    var roomid = document.getElementById("rm").value;
    fetch(`http://localhost:3000/${roomid}`,{
      method:"GET",
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'Application/json'
      }
    }).then(
      data=> data.json()
      ,
      (error)=>{
        console.log(error);
      }
    ).then(
      (data)=>{
        console.log(data);
        document.body.innerHTML='';
        document.body.style.backgroundColor="black";
        document.body.style.color="white";
        const ROOM_ID=data.roomId;
        const div=document.createElement('div');
        div.id='video-grid';
        document.body.appendChild(div);
        createVideo(ROOM_ID);


      }
    )
    
}


function createVideo(ROOM_ID) {
  // const { renderFile } = require("ejs")

  const socket = io('/')
  const videoGrid = document.getElementById('video-grid')
  const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
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

  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }
}
  document.getElementById("c").onclick = ()=>{
    // alert('gh');
    // var username = document.getElementById("um").value;
    document.getElementById("rm").value="_blank";
    fetch("http://localhost:3000/create",{
      method:"POST",
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-Type':'Application/json'
      },
      body:JSON.stringify({
        

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
        document.body.innerHTML='';
        document.body.style.backgroundColor="black";
        document.body.style.color="white";
        const ROOM_ID=data.roomId;
        const div=document.createElement('div');
        div.id='video-grid';
        document.body.appendChild(div);
        createVideo(ROOM_ID);


      }
    )
  }