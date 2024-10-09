import { useState } from 'react';
import './App.css';
import logo from './gpt-logo.png';
import { Sidebar } from 'primereact/sidebar';

function App() {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    <Sidebar visible={visible} onHide={() => setVisible(false)}>
                        <div className="col-md-12 sidebar d-md-block">
                            <div className="col-md-12" style={{ marginTop: '10%', padding: '15px' }}>
                                <h6 className="text-secondary">Today</h6>
                                <ul className="list-unstyled" style={{ fontSize: '18px' }}>
                                    <li>Papa ki retirement invitation</li>
                                    < hr />
                                    <li>Responsive Industries Component</li>
                                    < hr />
                                    <li>Video Invitation Card Creation</li>
                                    < hr />
                                    <li>Table Footer Fixed Design</li>
                                    < hr />
                                </ul>
                            </div>
                        </div>
                    </Sidebar>


                    <div className="col-md-12 main-content d-md-block">
                        <div className="top-header d-flex justify-content-between align-items-center mb-4">
                            <button className="btn btn-light" onClick={() => setVisible(true)}><i className="fa-solid fa-bars"></i></button>
                            <button className="btn btn-light"><i className="fa-regular fa-pen-to-square"></i></button>
                        </div>
                        <div className="dropdown">
                            <ul className="dropdown-menu ">
                                <li><a className="dropdown-item" href="#">
                                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                                    <p>ChatGPT Plus</p>
                                    <button className="btn btn-light">Upgrade</button>
                                </a></li>
                                <li><a className="dropdown-item " href="#">
                                    <i className="fa-brands fa-react"></i>
                                    <p>ChatGPT</p>
                                    <i className="fa-solid fa-circle-check"></i>
                                </a></li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#">
                                    <i className="fa-regular fa-comment"></i>
                                    <p>Temporary Chat</p>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch"
                                            id="flexSwitchCheckDefault" />
                                        <label className="form-check-label" for="flexSwitchCheckDefault"></label>
                                    </div>
                                </a></li>
                            </ul>
                        </div>
                        <div className="logo text-center">
                            <img src={logo} width="100" height="100" alt="ChatGPT Logo"
                                className="logo" />

                        </div>

                        <div className="task-grid">
                            <div className="task-box text-start">
                                <i className="fa-solid fa-image" style={{ color: '#74C0FC' }}></i>
                                <p>Create an illustration for a bakery</p>
                            </div>
                            <div className="task-box text-start">
                                <i className="fa-regular fa-file-lines" style={{ color: '#74C0FC' }}></i>
                                <p>Design a fun coding game</p>
                            </div>
                            <div className="task-box text-start">
                                <i className="fa-solid fa-helicopter" style={{ color: '#FFD43B' }}></i>
                                <p>Explain nostalgia to a kindergartener</p>
                            </div>
                            <div className="task-box text-start">
                                <i className="fa-regular fa-lightbulb" style={{ color: '#FFD43B' }}></i>
                                <p>Write a report based on my data</p>
                            </div>
                        </div>

                        <div className="search-bar">
                            <div className="input-container">
                                <i className="fa-solid fa-paperclip fa-rotate-by  rotate-icon"></i>
                                <input type="text" placeholder="Message ChatGPT" />
                                <i className="fa-solid fa-arrow-up"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
