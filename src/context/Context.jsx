import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, next) => {
        setTimeout(() => {
            setResultData(prev => prev + next);
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);

    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response = "";
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }

        else {
            setRecentPrompt(input);
            setPreviousPrompt((prev => [...prev, input]));
            response = await run(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }

            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        newResponse = newResponse.split("*").join("<br/>");

        // setResultData(newResponse);
        const newResponseArray = newResponse.split(" ");

        for (let i = 0; i < newResponseArray.length; i++) {
            const next = newResponseArray[i];
            delayPara(i, next + " ");
        }
        setLoading(false);
    }

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;