import React from 'react'
import { Lolly } from '../component/Lolly';
import '../template/getlolly.css'
const Newlolly = ({ slug }) => {
    const data = slug.data.addLolly;

    return (
        <div>
            New lolly create
           
            <h3 className="heading">virtual lollipop</h3>
            <h5 className="reasonText">because we all know someone <br/> who deserves some sugar.</h5>
            <div className="container">
                <div>
                   <Lolly top={data.topColor} mid={data.MidColor} Bottom={data.BottomColor}></Lolly>
                </div>
                <div className="user_responce">
                    <p style={{ textAlign: "center" }}>Your lolly is freezing. Share it with this link:</p>
                    <p>{`https://vlolly12e.netlify.app/vlolly/${data.slug}`}</p>
                    <div className="form_responce">
                        <h3 style={{ color: 'white' }}>{data.To}</h3>
                        <h4 style={{ color: 'white' }}>{data.Msg}</h4>
                        <h5 style={{ color: 'white' }}>{data.From}</h5>
                    </div>
                    <div style={{marginTop:"60px"}}>
                            <p style={{fontSize:"20px"}}>{data.From} made this virtual lollipop for you. You can make your own to send to a friend who <br/> deserve some sugary treat which won't rot their teeth...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Newlolly;
