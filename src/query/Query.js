import gql from 'graphql-tag'
export const Add_vLolly = gql`
mutation addLolly($topColor:String!,$MidColor:String!,$BottomColor:String!,$To:String!,
  $Msg:String!,
  $From:String!,$slug:String!){
    addLolly( topColor:$topColor,MidColor:$MidColor,BottomColor:$BottomColor,To:$To,
      Msg:$Msg,
      From:$From,slug:$slug){
        From
        Msg
        slug
        To
        MidColor
        topColor
        BottomColor
    }
  }
 
`;

export const Get_Vlolly = gql`
{
  getVlolly{
    slug
  }
}
  
`;