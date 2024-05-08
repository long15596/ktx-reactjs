import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDi3k1wLzdUDz_UPUeuKatQBGvdcuMjPrQ",
    authDomain: "case-md6-68a8f.firebaseapp.com",
    projectId: "case-md6-68a8f",
    storageBucket: "case-md6-68a8f.appspot.com",
    messagingSenderId: "175511547154",
    appId: "1:175511547154:web:57ebb36215dfe8983357cb",
    measurementId: "G-PM3PDD7DJT"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function FireUpload({onUpload}) {
    let [file, setFile] = useState(null)
    let [progress, setProgress] = useState(0)

    let handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    let handleClick = async () => {
        if (!file) {
            alert("Vui lòng chọn một tệp để tải lên.");
            return;
        }
        let storageRef = ref(storage, `files/${file.name}`)
        let uploadTask = uploadBytesResumable(storageRef, file)
        await new Promise((resolve, reject) => {
            uploadTask.on(
                `state_changed`,
                (snapshot) => {
                    setProgress((snapshot.bytesTransferred/snapshot.totalBytes)*100)
                },
                reject,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        onUpload(url)
                    }).catch(reject)
                }
            )
        })
    }
    return(
        <>
            <div className={`pt-2`}>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}}
                         aria-valuenow={progress}
                         aria-valuemin="0" aria-valuemax="100">${progress}%
                    </div>
                </div>
                <div className="input-group mb-3 pt-2">
                    <div className="input-group-prepend">
                        <button className="btn btn-outline-primary" type="button" id="inputGroupFileAddon03"
                                onClick={handleClick}>Tải Lên
                        </button>
                    </div>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile03"
                               aria-describedby="inputGroupFileAddon03" onChange={handleChange}/>
                        <label className="custom-file-label" htmlFor="inputGroupFile03">Chọn File</label>
                    </div>
                </div>
            </div>
        </>
    )
}