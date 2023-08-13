import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

const App = () => {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
      timeout: 3000,
    };
    
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";
  };

  return (
    <div className="app">
      <span className="logo"><a href="https://www.instagram.com/sophors1._.1/" target="_blank">IG: sophors1._.1</a></span>
      <section className="content">
        <h4 className="content_title">ទាញយកចម្រៀងពី YouTube ទៅជា MP3</h4>
        <p className="content_description">
          បម្លែង videos ក្នុង YouTube ទៅជា mp3 !
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="ដាក់ link videos នៅទីនេះ."
            className="form_input"
            type="text"
          />
          <button type="submit" className="form_button">
            ស្វែងរក
          </button>
        </form>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download_btn"
          >
            Download MP3
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default App;