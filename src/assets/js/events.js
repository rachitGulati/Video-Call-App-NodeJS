import helpers from './helpers.js';

window.addEventListener('load', ()=>{
    //When the chat icon is clicked
    document.querySelector('#toggle-chat-pane').addEventListener('click', (e)=>{
        let chatElem = document.querySelector('#chat-pane');
        let mainSecElem = document.querySelector('#main-section');

        if(chatElem.classList.contains('chat-opened')){
            chatElem.setAttribute('hidden', true);
            mainSecElem.classList.remove('col-md-9');
            mainSecElem.classList.add('col-md-12');
            chatElem.classList.remove('chat-opened');
        }

        else{
            chatElem.attributes.removeNamedItem('hidden');
            mainSecElem.classList.remove('col-md-12');
            mainSecElem.classList.add('col-md-9');
            chatElem.classList.add('chat-opened');          
        }

        //remove the 'New' badge on chat icon (if any) once chat is opened.
        setTimeout(()=>{
            if(document.querySelector('#chat-pane').classList.contains('chat-opened')){
                helpers.toggleChatNotificationBadge();
            }
        }, 300);
    });


    //When the video frame is clicked. This will enable picture-in-picture
    document.getElementById('local').addEventListener('click', ()=>{
        if (!document.pictureInPictureElement) {
            document.getElementById('local').requestPictureInPicture()
            .catch(error => {
                // Video failed to enter Picture-in-Picture mode.
                console.error(error);
            });
        } 
          
        else {
            document.exitPictureInPicture()
            .catch(error => {
                // Video failed to leave Picture-in-Picture mode.
                console.error(error);
            });
        }
    });


    //When the 'Create room" is button is clicked
    document.getElementById('create-room').addEventListener('click', (e)=>{
        e.preventDefault();

        let roomName = document.querySelector('#room-name').value;
        let yourName = document.querySelector('#your-name').value;

        if(roomName && yourName){
            //remove error message, if any
            document.querySelector('#err-msg').innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', yourName);

            //create room link
            let roomLink = `${location.origin}?room=${roomName.trim().replace(' ', '_')}_${helpers.generateRandomString()}`;

            //show message with link to room
            document.querySelector('#room-created').innerHTML = `Room successfully created. Click <a href='${roomLink}'>here</a> to enter room. 
                Share the room link with your partners.`;

            //empty the values
            document.querySelector('#room-name').value = '';
            document.querySelector('#your-name').value = '';
        }

        else{
            document.querySelector('#err-msg').innerHTML = "All fields are required";
        }
    });


    //When the 'Enter room' button is clicked.
    document.getElementById('enter-room').addEventListener('click', (e)=>{
        e.preventDefault();

        let name = document.querySelector('#username').value;

        if(name){
            //remove error message, if any
            document.querySelector('#err-msg-username').innerHTML = "";

            //save the user's name in sessionStorage
            sessionStorage.setItem('username', name);

            //reload room
            location.reload();
        }

        else{
            document.querySelector('#err-msg-username').innerHTML = "Please input your name";
        }
    });


    document.addEventListener('click', (e)=>{
        if(e.target && e.target.classList.contains('remote-video')){
            helpers.maximiseStream(e.target);
        }
    });


    //When 'close' is clicked to exit single peer video
    document.getElementById('close-single-peer-btn').addEventListener('click', (e)=>{
        //hide single-peer div and show div of all videos
        // document.querySelector('#videos').style.display = 'block';
        document.querySelector('#single-video-div').style.display = 'none';
        // document.querySelector('#single-peer-video').srcObject = null;

        e.classList.add('remote-video');
        e.classList.remove('single-peer-video');

        //show all remote video elements
        let remoteVideoElems = document.getElementsByClassName('remote-video');

        if(remoteVideoElems.length){
            for(let i = 0; i < remoteVideoElems.length; i++){
                remoteVideoElems[i].style.display = 'block';
            }
        }
    });
})