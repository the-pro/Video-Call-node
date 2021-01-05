document.getElementById("j").onclick = ()=>{
    var username = document.getElementById("um").value;
    var roomid = document.getElementById("rm").value;
    open(`http://localhost:3000/${roomid}`,"_self");
}
  document.getElementById("c").onclick = ()=>{
    // alert('gh');
    // var username = document.getElementById("um").value;
    document.getElementById("rm").value="_blank";
    open(`http://localhost:3000/create`,"_self");
  }