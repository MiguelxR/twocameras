
import React, {useRef, useEffect, useState} from "react";

function App() {
  const videoRef = useRef(null);
  const videoRef2 = useRef(null);
  const photoRef = useRef(null);
  const photoRef2 = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false)

  const [hasPhoto2, setHasPhoto2] = useState(false)

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ 
      video: { width: 1920, height: 1080 } 
    })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {console.error(err)});
  }

  const getVideo2 = () => {
    navigator.mediaDevices.getUserMedia({ 
      video: { width: 1520, height: 800 } 
    })
    .then(stream => {
      let video = videoRef2.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {console.error(err)});
  }

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0 , 0, width, height); 
    let myImage = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");


    window.location.href=myImage;

    setHasPhoto(true);
  }

  const takePhoto2 = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef2.current;
    let photo = photoRef2.current;

    photo.width = width;
    photo.height = height;

  
    console.log(photo);

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0 , 0, width, height); 
    let myImage2 = photo.toDataURL("image/png").replace("image/png", "image/octet-stream");

//     var data = canvas.toDataURL('image/png');
    window.location.href=myImage2;

    setHasPhoto2(true);
  }


  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  }


  const closePhoto2 = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto2(false);
  }

  useEffect(() => {
    getVideo();
    getVideo2();
  }, [videoRef])

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}>
        </video>
          <button onClick={takePhoto}  >SNAP!</button>
      </div>
      <div className="camera2">
        <video ref={videoRef2}>
        </video>
          <button onClick={takePhoto2} >SNAP!</button>
      </div>
      <div className={'result ' + (hasPhoto ? 'hasPhoto' : '' )}>
          <canvas ref={photoRef} ></canvas>
          <button onClick={closePhoto} >CLOSE!</button>
          {console.log(photoRef)}
      </div>
      <div className={'result ' + (hasPhoto2 ? 'hasPhoto' : '' )}>
          <canvas ref={photoRef2} ></canvas>
          <button onClick={closePhoto2} >CLOSE!</button>
      </div>
    </div>
  );
}

export default App;
