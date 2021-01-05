document.getElementById("j").onclick = ()=>{
    var username = document.getElementById("um").value;
    var roomid = document.getElementById("rm").value;
    open(`https://vc-ayas-app.herokuapp.com/${roomid}`,"_self");
}
  document.getElementById("c").onclick = ()=>{
    // alert('gh');
    // var username = document.getElementById("um").value;
    document.getElementById("rm").value="_blank";
    open(`https://vc-ayas-app.herokuapp.com/create`,"_self");
  }