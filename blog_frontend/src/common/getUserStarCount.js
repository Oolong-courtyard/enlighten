/*
获取用户点赞的文章
*/

export async function getUserStarCount(token, userId) {
//  token:用户认证token
//  userId:用户id
  console.log("走到了共通")
  let xToken = token ? token : localStorage.getItem('userToken');
  let xUserId = userId ? userId : localStorage.getItem("userId");
  this.$http.get(
    this.$getStarCount,
    {
      headers: {"x-token": xToken},
      params: {"user_id": xUserId},
    }).then(
    res => {
      //将获取到的点赞文章存入localStorage
      localStorage.setItem("userArticleStars", res.data.data);
      location.reload();
    }
  ).catch(
    err => {
      //TODO 处理失败
    }
  )
}
