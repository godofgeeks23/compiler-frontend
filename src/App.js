import React, { useState } from "react";
import axios from "axios";
import AceEditor from "react-ace";

function App() {
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState("cpp");

    const myStyle = {
        color: "white",
        backgroundColor: "#181D31",
        padding: "5px",
        borderRadius: '10px',
        width: "90%",
        border: "solid"
    };

    const acestyle = {
        color: "white",
        backgroundColor: "#181D31",
        padding: "5px",
        borderRadius: '10px',
        width: "95%",
        border: "solid",
    };

    const myStyle1 = {
        color: "#181D31",
        backgroundColor: "#A8E6CF",
        padding: "5px",
        fontFamily: "Calibri",
        margin: "auto",
        textAlign: "center",
        padding: "10px",
    };
    const myStyle2 = {
        borderRadius: '10px',
        color: "white",
        backgroundColor: "#181D31",
        fontSize: "16",
        fontFamily: "Calibri",
        border: "solid",
        // width: "95%",
        height: "70vh",
        textAlign: "left",
        flexGrow: "1",
        padding: "10px"
    };
    const dflex = {
        display: "flex",
        padding: "10px"
    }
    const editorpane = {
        flexGrow: "1"
    };
    const handleSubmit = async () => {
        console.log(code);
        const payload = {
            language: language,
            code,
        };
        try {
            const { data } = await axios.post(
                "http://localhost:5000/run",
                payload
            );
            setOutput(data.output);
        } catch ({ response }) {
            if (response) {
                const errMsg = response.data.err.stderr;
                setOutput(errMsg);
            } else {
                setOutput("Error connecting to server!");
            }
        }
    };
    return (
        <div className="" style={myStyle1} >
            <h1 style={{}}>ONLINE CODE COMPILER</h1>
            <select style={myStyle} value={language} onChange={(e) => {
                                setLanguage(e.target.value);
                            }} >
                            <label >Language : </label>
                            <option value="C">C</option>
                            <option value="C++">C++</option>
                            <option value="Python">Python</option>
                            <option value="JavaScript">Javascript</option>
            </select>
            <div style={dflex}>
                    <div style={editorpane}>
                        <AceEditor
                            mode="javascript"
                            theme="google"
                            value={code}
                            height='50vh'
                            style={acestyle}
                            onChange={(e) => {
                                setCode(e);
                            }}
                            fontSize={16}
                            showPrintMargin={true}
                            showGutter={true}
                            useWrapMode={true}
                            highlightActiveLine={true}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showLineNumbers: true,
                                tabSize: 100,
                            }}
                        />
                    </div>
                <div style={myStyle2}>{output}</div>
            </div>
            <button onClick={handleSubmit} style={myStyle}>Submit</button>
        </div>
    );
}
export default App;