import "./App.css";
import { useState } from "react";
import { tutorial } from "./tutorial";
import ReactMarkdown from "https://esm.sh/react-markdown@7";
import ResizeButton from "./components/ResizeButton";

function App() {
  const [text, setText] = useState(tutorial);

  const [resizeEditor, setResizeEditor] = useState({
    show: true,
    style: "textarea-default",
  });

  const [resizePreviewer, setResizePreviewer] = useState({
    show: true,
  });

  const showHideEditor = () => {
    if (resizeEditor.style === "textarea-default") {
      setResizeEditor({ show: true, style: "textarea-max" });
      setResizePreviewer({ show: false });
    } else {
      setResizeEditor({ show: true, style: "textarea-default" });
      setResizePreviewer({ show: true });
    }
  };

  const showHidePreviewer = () => {
    resizeEditor.show
      ? setResizeEditor({ show: false, style: "textarea-default" })
      : setResizeEditor({ show: true, style: "textarea-default" });
  };

  return (
    <>
      {resizeEditor.show ? (
        <div className="modal">
          <p className="modal-title">Editor</p>
          <ResizeButton onClick={showHideEditor} />
          <button
            className="button-style modal-button"
            onClick={() => {
              setText("");
            }}
          >
            Clear Editor
          </button>
          <textarea
            id="editor"
            className={`textarea ${resizeEditor.style}`}
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          >
            {text}
          </textarea>
        </div>
      ) : (
        ""
      )}
      <br />
      {resizePreviewer.show ? (
        <div className="modal">
          <p className="modal-title">Previewer</p>
          <ResizeButton onClick={showHidePreviewer} />
          <div id="preview" className="markdown">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
