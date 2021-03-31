import React, { useState, useRef } from "react"
import { useQuery, useMutation } from '@apollo/client'
import { Lolly } from '../component/Lolly'
import {Add_vLolly,Get_Vlolly} from '../query/Query'
import short from 'shortid'
import './index.css'
import Newlolly  from "../component/Newlolly"
const shortId=short.generate();
const IndexPage = () => {
 
  const [TopColor, setTopColor] = useState("#400080")
  const [MiddileColor, setMiddleColor] = useState("#B8B52F")
  const [BottomColor, setBottomColor] = useState("#DE651B")
  const [createNewLolly, setcreateNewLolly] = useState(false);
  const [slugresult,Setslugresult]=useState({});
  const to = useRef();
  const from = useRef();
  const msg = useRef();
  const [addLolly] = useMutation(Add_vLolly);
  const handleSubmit = async (e) => {
    e.preventDefault() 
   const result= await addLolly({
      variables: {
        topColor: TopColor,
        MidColor: MiddileColor,
        BottomColor: BottomColor,
        To: to.current.value,
        Msg: msg.current.value,
        From: from.current.value,
        slug:shortId
      },
      // refetchQueries: [{ query: Get_Vlolly }],
    });
    
      console.log(result, "Resultt")
    Setslugresult(result)
    setcreateNewLolly(true)
  }
  console.log(createNewLolly, 'new lolly')
  const { loading, error, data } = useQuery(Get_Vlolly);
  if (loading) {
    return <h3 style={{color:"white"}}>loading...</h3>
  }
  if (error) {
    return <h3>Error :{error.message}</h3>
  }
  console.log(data)
  console.log(slugresult,"slugresulttt")
  return (

    <div>
      {!createNewLolly ?
        <div>
          <h3 className="title">virtual lollipop</h3>
          <h5 className="subtitle">because we all know someone <br/> who deserves some sugar.</h5>
          <div className="container">
            <div>
              <Lolly top={TopColor} mid={MiddileColor} Bottom={BottomColor}></Lolly>
                <input className="colorPicker" onChange={(ev) => setTopColor(ev.target.value) } type="color" value={TopColor} 
                name="topflavor" id="topflavor"  />
              <input className="colorPicker" type="color" value={MiddileColor} name="MiddleColor" onChange={(ev) =>setMiddleColor(ev.target.value) } />
              <input className="colorPicker" type="color" value={BottomColor} name="BottomColor" onChange={(ev) => setBottomColor(ev.target.value)} />
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
        
              <input type="text" name="to" ref={to} placeholder="To"  required/>
              <textarea name="msg" ref={msg} placeholder="message"  required/>
              <input type="text" name="from" ref={from} placeholder="From"  required/>
              <button type="submit" style={{cursor:"pointer"}}>Freeze</button>
        
            </form>
          </div>

        </div>
        : <Newlolly slug={slugresult} />
      }

    </div>
  )
}
export default IndexPage
