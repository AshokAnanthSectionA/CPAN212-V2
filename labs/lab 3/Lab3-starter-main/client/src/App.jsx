import { useState } from "react";

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState(null);
  const [message, setMessage] = useState("");

  const fetchDogImage = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();

      setDisplayDogImage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const submitDogImage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(displayDogImage);
      const data = await response.blob();
      const formData = new FormData();
      formData.append("file", data, "dogo.jpg");

      const uploadFile = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });

      const responseData = await uploadFile.json();
      setMessage(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMultipleImages = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/multiple");
      const data = await response.json();
      console.log(data);

      const filePromises = data.map(async (filename) => {
        const fetchFile = await fetch(`http://localhost:8000/fetch/file/${filename}`);
        const fileBlob = await fetchFile.blob();
        console.log(fileBlob);

        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch("http://localhost:8000/fetch/single");

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch("http://localhost:8000/save/single", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // fetch functions -> fetch multiple [TODO]
  // fetch functions -> fetch dog image [TODO]
  // fetch functions -> save dog image [TODO]

  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displayImage}
            alt="Display Image"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      <button onClick={fetchMultipleImages}>Fetch Multiple Images</button>
      {displayImages.length > 0 ? (
        displayImages.map((imageUrl, index) => (
          <div key={index}>
            <img
              src={imageUrl}
              alt={`Fetched ${index}`}
              style={{ width: "200px", height: "200px", margin: "10px" }}
            />

            <button onClick={fetchDogImage}>Get the Dog</button>
            {displayDogImage && (
              <div>
                <h3> AMAZING DOG</h3>
                <img src={displayDogImage} style={{ width: "300px" }} />
                <button onClick={submitDogImage}>Submit to server</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>no image to display yet</p>
      )}
    </div>
  );
};

export default App;