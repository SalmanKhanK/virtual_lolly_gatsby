const { ApolloServer, gql } = require('apollo-server-lambda')
const axios = require("axios")
const faunadb = require('faunadb'),
  q = faunadb.query;
const shortid = require('shortid');
const typeDefs = gql`
type Query {
  getVlolly: [Lolly!]
  getVlollyByslug(slug: String!): Lolly
}
  type Lolly {
    topColor:String!
    MidColor:String!
    BottomColor:String!
    To:String!
    Msg:String!
    From:String!
    slug:String!
  }
  type Mutation {
    addLolly(
      topColor:String!
      MidColor:String!
      BottomColor:String!
      To:String!
      Msg:String!
      From:String!
    ): Lolly 
  }
`

var adminClient = new faunadb.Client({ secret: 'fnAD92ORUHACB-5Rlv7tS-tNSyVyreWPPP20141u' });
const resolvers = {
  Query: {
    getVlolly:async () => {
      try{
      const result = await adminClient.query(
        q.Map(
          q.Paginate(q.Match(q.Index("all_lolly"))),
          q.Lambda((lolly) => q.Get(lolly))
        )
      );
      return result.data.map((lolly) => {
        return {
          To: lolly.data.To,
          Msg: lolly.data.Msg,
          From: lolly.data.From,
          topColor: lolly.data.topColor,
          MidColor: lolly.data.MidColor,
          BottomColor: lolly.data.BottomColor,
          slug: lolly.data.slug,
        };
      });
    }
    catch(error){
      return error.toString();
    }
    },
    getVlollyByslug: async (_,{slug})=>{
      console.log(slug,"slugggg")
              const result=await adminClient.query(
               q.Get(q.Match(q.Index("get-lolly-by-slug"), slug))
              );
              console.log(result,"Result")
              return result.data
},
 },

  Mutation:{
    addLolly:async (_,{topColor,MidColor,BottomColor,To,Msg,From})=>{
      console.log("==========================================")
         console.log(topColor,MidColor,BottomColor,To,Msg,From)
      const result=await adminClient.query(
          q.Create(
            q.Collection("Lolly"),
            {
              data:{
                topColor,
                MidColor,
                BottomColor,
                To,
                Msg,
                From,
                slug:shortid.generate()
              }
            }
          )
      )
  
      axios
      .post("https://api.netlify.com/build_hooks/6061a024c78bfb4d1ca57696")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });

      console.log("=========================")
      console.log(result.data)
      console.log("====================================")
      return result.data
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
