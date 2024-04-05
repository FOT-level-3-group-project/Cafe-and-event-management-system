import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function ManagerProfile() {
  const currentUser = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUplordingProcess, setImageFileUplordingProcess] = useState(0);
  const [imageFileUplordError, setImageFileUplordError] = useState(null);
  console.log(imageFileUplordError, imageFileUplordingProcess);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));

    }

  };
  useEffect(() => {
    if (imageFile) {
      uplodeImage();
    }
  }, [imageFile]);

  const uplodeImage = async () => {

    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read; 
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUplordError(null);
    console.log('uploading image');
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name; // crate uniqe file name
    const storageRef = ref(storage, fileName);
    const uplordTask = uploadBytesResumable(storageRef, imageFile);
    uplordTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUplordingProcess(progress.toFixed(0)
        );
        setImageFileUplordingProcess(null);
        setImageFile(null);
        setImageFileURL(null);
      },
      (error) => {
        setImageFileUplordError("Failed to upload image (File size must be less than 2MB)");

      },
      () => {
        getDownloadURL(uplordTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);

        });
      }
    );
  };


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>

          {imageFileUplordingProcess > 0 && (

            <CircularProgressbar value={imageFileUplordingProcess || 0}
              text={`${imageFileUplordingProcess}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${imageFileUplordingProcess / 100})`,
                },
              }} />

          )}
          {/* add the profile pic path */}
          <img src={imageFileURL || currentUser.profilePicture} alt='user' className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUplordingProcess &&
              imageFileUplordingProcess < 100 &&
              'opacity-60'
            }`}/>
        </div>
        {/* // profile image uplord error alert  */}
        {imageFileUplordError && (
          <Alert color='failure'>
            {imageFileUplordError}
          </Alert>
        )
        }

        < TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='password' id='password' placeholder='password' />
        <Button type='submit' gradientDuoTone='greenToBlue' outline >Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span></span>
        <span className='cursor-pointer'> Log out</span>
      </div>
    </div>
  )
}
