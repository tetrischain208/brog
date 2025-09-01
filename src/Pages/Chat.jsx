import React, { useEffect, useRef, useState } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardFooter,
    MDBIcon,
    MDBBtn,
    MDBInput,
    MDBInputGroup

} from "mdb-react-ui-kit";


import { TypeAnimation } from "react-type-animation";
import Markdown from 'react-markdown'

const baseUrlProd = "https://oriole-direct-obviously.ngrok-free.app";

export default function App() {
    const chatBox = useRef()
    const [isNew, setIsNew] = useState(true)
    const [text, setText] = useState("");
    const [isTyping, setTyping] = useState(false);

    function getTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    }

    const [messages, setMessage] = useState([])

    useEffect(() => {
        const time = getTime()
        const temp = {
            id: 69696969,
            name: 'Brog',
            type: 'bot',
            chat: [
                {
                    type: 'text',
                    text: 'GM ! Hi Hello, Ask me Anything!!',
                }
            ],
            profile: 'brog.jpeg',
            time: time,
            component: 'text'
        }

        setMessage([...messages, temp])

    }, [])

    useEffect(() => {
        chatBox.current.scrollTo(0, chatBox.current.scrollHeight)
    }, [messages])

    function setImage() {
        setText("Create Image ")
        chatBox.current.focus();
    }

    async function sendMessage(isImage = false) {
        if (text == "") return false
        if (isTyping) return false
        setTyping(true)
        const time = getTime()
        const temp = {
            id: 69696969,
            name: 'Hencet',
            type: 'user',
            message: text,
            profile: 'brog.jpeg',
            time: time,

        }
        setMessage(data => ([...data, temp]))

        fetch(`${baseUrlProd}/generateAI${text.includes("Create Image") ? '/image' : ''}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                isImage: isImage
            })
        }).then(response => response.json())
            .then(data => {
                setText("")
                const time = getTime()
                const temp = {
                    id: 69696969,
                    name: 'Hencet',
                    type: 'bot',
                    chat: data.map(e => ({
                        text: e.value,
                        type: e.type
                    })),
                    profile: 'brog.jpeg',
                    time: time,
                    component: data.type
                }
                console.log(temp);


                setMessage(data => ([...data, temp]))
                setTyping(false)
            })
            .catch(error => console.error(error));

        return false
    }

    function sendMessageImage() {

    }


    return (
        <MDBContainer fluid className="py-5" >
            <MDBRow className="d-flex justify-content-center">
                <MDBCol md="10" lg="8" xl="6">
                    <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
                        <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                            <h5 className="mb-0">Brog Wog here, at your service!</h5>
                            <MDBBtn color="primary" size="sm" rippleColor="dark">


                                <a style={{
                                    color: "#55acee",

                                }} href="https://x.com/BrogWogSol" target="_blank" >
                                    <i class="fab fa-twitter fa-lg"></i>
                                </a>


                            </MDBBtn>
                        </MDBCardHeader>
                        <div ref={chatBox} style={{
                            height: '70vh',
                            overflowY: 'scroll'
                        }}  >
                            <MDBCardBody>
                                {
                                    messages?.map((e, i) => (
                                        e.type == 'bot' ?
                                            (<div id={i} className="d-flex flex-row justify-content-start">
                                                <img
                                                    src="brog.jpeg"
                                                    alt="Brog"
                                                    style={{ width: "45px", height: "100%", borderRadius: '50%' }}
                                                />
                                                <div>
                                                    {
                                                        e.chat?.map((z, f) => z.type == 'text' ? (
                                                            <p
                                                                className="small p-2 ms-3 mb-1 rounded-3 bg-dark text-break"
                                                            >

                                                                <Markdown>
                                                                    {z.text}
                                                                </Markdown>

                                                            </p>
                                                        ) : (
                                                            <p
                                                                className="small p-2 ms-3 mb-1 rounded-3 bg-dark text-break"
                                                                style={{ maxWidth: '60%' }}
                                                            >

                                                                <img src={`data:image/png;base64, ${z.text}`} alt="Red dot" className="img-fluid shadow-4" />
                                                            </p>
                                                        ))
                                                    }

                                                    <p className="small ms-3 mb-3 rounded-3 text-muted">
                                                        {e.time}
                                                    </p>
                                                </div>
                                            </div>
                                            ) : (
                                                <div id={i} className="d-flex flex-row  justify-content-end mb-4 pt-1">
                                                    <div>
                                                        <p className="small p-2 me-3 mb-1 text-dark rounded-3 flex-wrap bg-light text-break">
                                                            {e.message}
                                                        </p>

                                                        <p className="small  mb-3 rounded-3 text-muted d-flex justify-content-end">
                                                            {e.time}
                                                        </p>
                                                    </div>

                                                </div>
                                            )
                                    ))
                                }
                                {
                                    isTyping && (
                                        <div className="d-flex flex-row justify-content-start">
                                            <img
                                                src="brog.jpeg"
                                                alt="Brog"
                                                style={{ width: "45px", height: "100%", borderRadius: '50%' }}
                                            />
                                            <div>
                                                <p
                                                    className="small p-2 ms-3 mb-1 rounded-3 bg-dark text-break"
                                                >

                                                    <TypeAnimation sequence={[
                                                        // Same substring at the start will only be typed once, initially
                                                        'Typing...',
                                                    ]}
                                                        speed={50}
                                                        style={{ fontSize: '1em' }}
                                                        repeat={3} />
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }

                            </MDBCardBody>
                        </div>

                        <MDBCardFooter>

                            <form onSubmit={() => { sendMessage; return false }} action="#"  >
                                <MDBInputGroup className="w-100" textBefore={<i className="fas fa-paper-plane trailing"></i>}>
                                    <div className="row w-100 align-items-start">

                                        <div className="col-lg-8 col-sm-12">

                                            <input value={text} onChange={e => setText(e.target.value)} className='form-control' ref={chatBox} contrast placeholder="Recipient's username" type='text' />
                                        </div>

                                        <div className="col-lg-4 col-sm-12">

                                            <MDBBtn disabled={isTyping} className="w-100 mt-2" type="submit" color='dark' onClick={e => sendMessage()} >
                                                Send Text
                                            </MDBBtn >
                                            <MDBBtn disabled={isTyping} type="submit" className="w-100 mt-2" color="dark" onClick={e => setImage(true)} >
                                                <MDBIcon fas icon="images" /> Image
                                            </MDBBtn>
                                        </div>
                                    </div>
                                </MDBInputGroup>
                            </form>


                        </MDBCardFooter>

                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}