import { Dispatch, useEffect, useState } from "react"
import { postToAPIFunc } from "../utils";
import { firestore } from "../../utils/firebaseInit";
import { DocumentData, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

interface InputState {
    title?: string,
    body?: string,
}

async function getCurrentDailyNotification() {

    const ref = doc(firestore, "NotificationMessage/NotificationMessage");
    const document = await getDoc(ref);
    return document.data();

}

function updateStoredNotificationMessage(title: string, body: string) {

    const ref = doc(firestore, "NotificationMessage/NotificationMessage");
    updateDoc(ref, { title, body });

}

export const CustomNotifications = () => {


    
    const [inputState, setInputState] = useState<InputState>({ body: undefined, title: undefined, });
    const [notificationType, setNotificationType] = useState<number>(0);
    const [dataDoc, setDataDoc] = useState<DocumentData | undefined>();
    
    useEffect(() => {

        onSnapshot(doc(firestore, "/NotificationMessage/NotificationMessage"), (doc) => {
            // let source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            // console.log(source, " data: ", doc.data());
            setDataDoc(doc);
        });

    }, [])
    
    // defn state updating functions
    function setTitle(title: string): void {
        setInputState({ ...inputState, title })
    }

    function setBody(body: string): void {
        setInputState({ ...inputState, body })
    }

    function anyUndefined(): boolean {
        return Object.values(inputState)
            .map(val => val == undefined)
            .reduce((b1, b2) => b1 || b2);
    }

    return (
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <h1>Push Notification Creator</h1>
            <div style={{ display: "inline-flex", flexDirection: "column" }}>
                <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", marginBottom: 10, }}>
                    <LabeledTextInput label={"Title"} setText={setTitle} />
                    <LabeledTextInput label={"Body"} setText={setBody} />
                </div>
                <div style={{ marginBottom: 10, }}>
                    <select style={{ fontSize: 20, border: "none", padding: 10, borderRadius: 15, }} onChange={(e) => {
                        setNotificationType(parseInt(e.target.value));
                    }}>
                        <option value={0} label="Send to All Users" />
                        <option value={1} label="Set Daily Push Notifications" />
                    </select>
                </div>
                <div>
                    <SpotButton disabled={anyUndefined()} text={"Submit"} fontSize={30} onClick={() => {
                        if (!anyUndefined()) {
                            if (notificationType == 0) {
                                postToAPIFunc("sendNotificationToAllUsers", "", {
                                    title: inputState.title,
                                    body: inputState.body,
                                })
                            } else if (notificationType == 1) {
                                updateStoredNotificationMessage(inputState.title || "", inputState.body || "");
                            }
                        }
                    }} />
                </div>
            </div>
            <p>Current daily notification: {JSON.stringify(dataDoc?.data())}</p>
        </div>
    )

}

export const TextInputArea = (props: { setText?: (input: string) => void }) => {

    const { setText } = props;
    return (
        <div style={{ display: "inline-flex", height: 50, width: 500, }}>
            <textarea style={{
                display: "inline-flex",
                flex: 1,
                backgroundColor: "#F3F2F2",
                border: "none",
                resize: "none",
                borderRadius: 15,
                padding: 10,
            }} onChange={(e) => {
                if (setText) setText(e.target.value);
            }} />
        </div>
    )

}

const SpotButton = (props: { text: string, fontSize: number, disabled?: boolean, onClick?: Function, clickText?: string }) => {

    const { text, fontSize, disabled, onClick, clickText } = props;
    const [showClickText, setShowClickText] = useState<boolean>(false);

    return (
        <div>
            <button disabled={disabled} style={{
                border: "none",
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "#E48B08",
                fontSize: fontSize || 20,
            }} onClick={() => { if (onClick) onClick(); }}>{text}</button>
            <p>{showClickText && clickText}</p>
        </div>
    );

}

const LabeledTextInput = (props: { setText?: Dispatch<string>, label: string, }) => {

    const { setText, label, } = props;
    return (
        <div style={{ flexDirection: "column", width: "min-content", }}>
            <p style={{ margin: 0, marginBottom: 10, textAlign: "left", fontSize: 30, }}>{label}</p>
            <TextInputArea setText={setText} />
        </div>
    );

}
