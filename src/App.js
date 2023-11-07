import axios from "axios";
import * as React from "react";
import Intro from "./components/Intro";
import UploadBox from "./components/UploadBox";
import Navbar from "./components/Navbar";

const BACKEND_ADDRESS = "http://localhost:8000";

const title1 = "Query to summarize the number of subjects available in each condition";
const title2 = "Query that returns all melanoma PBMC samples at baseline (time_from_treatment_start is 0) from patients who have treatment tr1";
const title3 = "Number of samples from each project";
const title4 = "Responders and Non Responders";
const title5 = "Number of males and females per age group";

function App() {
  const [showUploadBox, setShowUploadBox] = React.useState(false);
  const [uploadResponseData, setUploadResponseData] = React.useState(null);
  const [title, setTitle] = React.useState(null);

  const [data, setData] = React.useState([]);

  const toggleUpload = () => {
    setShowUploadBox(!showUploadBox);
  }

  const handleUploadResponse = (responseData) => {
    setUploadResponseData(responseData);
    setData([]);
    setTitle(null)
  };

  const handleClick = React.useCallback(async (route) => {
    try {
      const response = await axios.get(`${BACKEND_ADDRESS}/${route}`);
      console.log(response.data.message);
      setData(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App h-[100vh]">
      <Navbar />

      <Intro />

      <div className="w-full mx-20">
        <div className="flex gap-4 flex-wrap">
          <button className="btn" onClick={toggleUpload}>Upload a new file!</button>
          <button className="btn" onClick={() => { handleClick('api/subject-count/'); setTitle(title1); setShowUploadBox(false) }}>Get Subject Count by Condition</button>
          <button className="btn" onClick={() => { handleClick('api/melanoma-pmbc/'); setTitle(title2); setShowUploadBox(false) }}>Get Melanoma PMBC</button>
          <button className="btn" onClick={() => { handleClick('api/sample-count/'); setTitle(title3); setShowUploadBox(false) }}>Sample Count</button>
          <button className="btn" onClick={() => { handleClick('api/responder-count/'); setTitle(title4); setShowUploadBox(false) }}>Responder/ Non Responders</button>
          <button className="btn" onClick={() => { handleClick('api/gender-count'); setTitle(title5); setShowUploadBox(false) }}>Gender Count</button>
        </div>

        <br />
        {showUploadBox && (
          <div className="">
            <h1 className="text-2xl font-medium">Please upload a csv file to analyze</h1>
            <br />
            <UploadBox
              onUploadResponse={handleUploadResponse}
            />
            <br />
            {uploadResponseData && (
              <div>
                {uploadResponseData.analysis.map(item => (
                  <li key={item.id}>
                    {item}
                  </li>
                ))}
                <br />
                {uploadResponseData.image_urls.map(url => (
                  <img src={`${BACKEND_ADDRESS}/${url}`} alt="box-plot" />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="pt-10">
          <p className="text-xl font-medium">{title}</p>
          <br />
          <ul>
            {data.map(item => (
              <li key={item.id}>
                {JSON.stringify(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
