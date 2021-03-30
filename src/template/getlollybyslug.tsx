import React from 'react'
import {graphql} from 'gatsby'
import {Lolly} from '../component/Lolly';
import './getlolly.css'
export const query=graphql`
    query MyQuery($slug:String!) {
        Lolly {
        getVlollyByslug(slug:$slug) {
            From
            Msg
            slug
            To
            MidColor
            topColor
            BottomColor
        }
        }
    }
`
const isBrowser = () => typeof window !== "undefined";
export default ({data: {Lolly: {getVlollyByslug},},}) => {
    return (
        <div>
        <h3 className="heading">virtual lollipop</h3>
        <h5 className="reasonText">because we all know someone <br/> who deserves some sugar.</h5>
        <div className="container">
        <div>
         <Lolly top={getVlollyByslug.topColor} mid={getVlollyByslug.MidColor} Bottom={getVlollyByslug.BottomColor}></Lolly>
         </div>
         <div className="user_responce">
         <p style={{textAlign:"center"}}>Your lolly is freezing. Share it with this link:</p> 
         <p>{`${isBrowser() ? location.origin : ""}/vlolly/${
                getVlollyByslug.slug
              }`}</p>
         <div className="form_responce">
              <h2 style={{color:'white'}}>{getVlollyByslug.To}</h2>
              <h3 style={{color:'white'}}>{getVlollyByslug.Msg}</h3>
              <h4 style={{color:'white'}}>___{getVlollyByslug.From}</h4>
         </div>
        <div className="form_responce">
         <p>{getVlollyByslug.From} made this virtual lollipop for you. You can make your own to send to a friend who deserve some sugary treat which won't rot their teeth...</p>
        </div>
      </div>
    </div>
    </div>
    )
}
