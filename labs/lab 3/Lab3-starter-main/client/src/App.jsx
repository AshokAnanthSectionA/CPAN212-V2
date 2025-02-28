import { useState, useEffect } from "react"; 

const App = () => {
  const [images, setImages] = useState([]);
  const [dogImage, setDogImage] = useState(null);
  const [selectedDogFile, setSelectedDogFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/multiple")
      .then((response) => response.json())
      .then((data) => setImages(data));
  }, []);

  const fetchDogImage = async () => {
    try {
      const response = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
      setMessage("Error fetching dog image.");
    }
  };

  const handleDogFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedDogFile(e.target.files[0]);
    } else {
      setSelectedDogFile(null);
    }
  };

  const handleUploadDogImage = async (e) => {
    e.preventDefault();
    if (!selectedDogFile) {
      setMessage("Please select a dog image before uploading.");
      return;
    }

    setUploading(true);
    setMessage("Uploading...");

    try {
      const formData = new FormData();
      formData.append("dogImage", selectedDogFile);

      const response = await fetch("/upload-dog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Dog image upload failed: ${response.status} - ${errorText}`);
      }

      setMessage("Dog image uploaded successfully!");
      setSelectedDogFile(null);
      e.target.reset();
    } catch (error) {
      setMessage(`Error uploading dog image: ${error.message}`);
      console.error("Error uploading dog image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <> {/* Use React.Fragment shorthand here */}
      <p>{message}</p>
      <h2>Multiple Images</h2>
      {images.map((image) => (
        <img key={image} src={`/file/${image}`} alt={image} />
      ))}

      <h2>Dog Image</h2>
      <button onClick={fetchDogImage}>Fetch Dog Image</button>
      {dogImage && <img src={dogImage} alt="Dog" />}

      <form onSubmit={handleUploadDogImage}>
        <h2>Upload Dog Image</h2>
        <input type="file" onChange={handleDogFileChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Dog Image"}
        </button>
      </form>
    </>
  );
};

export default App;
