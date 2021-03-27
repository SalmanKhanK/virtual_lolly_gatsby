const path = require("path");
exports.createPages = async ({ actions, graphql }) => {
    const {data}=await graphql (`
    query MyQuery {
        Lolly {
          getVlolly {
            slug
          }
        }
      }
`)
console.log(JSON.stringify(data));
      data.Lolly.getVlolly.forEach(({slug})=>{
        actions.createPage({
          path:`vlolly/${slug}`,
          component:path.resolve(`./src/template/getlollybyslug.tsx`),
          context:{
            slug:slug
          }
        });
      });
    }