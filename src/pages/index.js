import React,{useState,useRef} from "react"
import {useQuery,useMutation} from '@apollo/client'
import gql from 'graphql-tag'
import {Lolly} from '../component/Lolly'
import { navigate } from "gatsby"
import './index.css'
const Add_vLolly=gql`
    mutation addLolly($topColor:String!,$MidColor:String!,$BottomColor:String!,$To:String!,
      $Msg:String!,
      $From:String!){
        addLolly( topColor:$topColor,MidColor:$MidColor,BottomColor:$BottomColor,To:$To,
          Msg:$Msg,
          From:$From){
                slug
        }
      }
     
`;
const Get_Vlolly=gql`
        {
          getVlolly{
            slug
          }
        }
          
`
const IndexPage = () => {
  const [TopColor, setTopColor] = useState("blue")
  const [MiddileColor, setMiddleColor] = useState("green")
  const [BottomColor, setBottomColor] = useState("red")
  const to=useRef();
  const from=useRef();
  const msg=useRef();
  const [addLolly] = useMutation(Add_vLolly);
  const handleSubmit=async ()=>{
   const result= await addLolly({
      variables: {
          topColor:TopColor, 
          MidColor:MiddileColor, 
          BottomColor:BottomColor,
          To:to.current.value,
          Msg:msg.current.value,
          From:from.current.value
      },
      refetchQueries: [{ query: Get_Vlolly }]
  });
  console.log(result,"Resultt")
  await navigate(`/vlolly/${result.data?.addLolly?.slug}`);
  }
  const {loading,error,data}=useQuery(Get_Vlolly);
  if(loading){
    return <h1>loading...</h1>
  }
  if(error){
    return <h1>Error :{error.message}</h1>
  }
  console.log(data)
  return (
    <div>
    <h3 className="heading">virtual lollipop</h3>
    <h5 className="reasonText">because we all know someone who deserves some sugar.</h5>
  <div className="container">
    <div>
     <Lolly top={TopColor} mid={MiddileColor} Bottom={BottomColor}></Lolly>
     <input  type="color" value={TopColor} name="TopColor" onChange={(ev)=>{setTopColor(ev.target.value)}} />  
     <input className="color2" type="color" value={MiddileColor} name="MiddleColor" onChange={(ev)=>{setMiddleColor(ev.target.value)}} />  
     <input className="color3" type="color" value={BottomColor} name="BottomColor" onChange={(ev)=>{setBottomColor(ev.target.value)}} />  
     </div>
     <div className="form-container">
         <input type="text" name="to" ref={to} placeholder="To" />  
         <textarea  name="msg" ref={msg} placeholder="message"  />  
         <input type="text"  name="from" ref={from}  placeholder="From" />  
         <button onClick={handleSubmit}
         style={{cursor:"pointer"}} >Freeze</button>
    </div>
  </div>
  </div>
  )
}
export default IndexPage
