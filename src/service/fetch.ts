import { client } from "@/sanity/sanity";

type DataType = "USERS" | "AUTHORS" | "POSTS" | "CATEGORIES" | "FOLLOWINGS";
type QueryType =
  | "FOLLOWINGS"
  | "FOLLOWINGS_POSTS"
  | "POST_DETAIL"
  | "SEARCH_USER"
  | "USER_ALL_INFO"
  | "USER_PROFILE_TAB";

export const getQuery = (queryType: QueryType, payload: string) => {
  let query = "";
  const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo.asset->url,
    "likes": likes[]->username,
    "text": contents,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt
  `;

  switch (queryType) {
    case "FOLLOWINGS":
      query = `*[_type == "user" && username == $name][0]{
        ...,
        "id": _id,
        following[]-> {"id": _id, username,image},
        followers[]-> {username,image},
        "bookmarks": bookmarks[]->_id
      }`;
      break;
    case "FOLLOWINGS_POSTS":
      query = `*[_type == "post" && author->username == "${payload}"
        || author._ref in *[_type == "user" && username == "${payload}"].following[]._ref] 
        | order(_createdAt desc){${simplePostProjection}}`;
      break;
    case "POST_DETAIL":
      query = `*[_type == "post" && _id == "${payload}"].comments[]{
          "user": {
            "id": _id,
            "image": author->image,
            "username": author->username,
          },
          "comment": comment
      }`;
      break;
    case "SEARCH_USER":
      const projection = `
        "following": count(following),
        "followers": count(followers),
        "name": name,
        "username": username,
        "image": image
      `;
      query = `*[_type == "user" && username match "${payload}*" || name match "${payload}*"]{
        ${projection}
      }`;
      break;
    case "USER_ALL_INFO":
      query = `
        *[_type == "user" && username == $username][0]{
          "id": _id,
          "following": count(following),
          "followers": count(followers),
          "name": name,
          "username": username,
          "image": image,
          "posts": (count(*[_type == "post" && author->username == $username]))
      }`;
      break;
    case "USER_PROFILE_TAB":
      const parsedPayload = payload.split("|");
      // 작성 posts: 모든 post 중 author 자기자신
      // bookmark: user 내에서 북마크
      // likes: 모든 posts 중 likes 내에 자기가 있는 post
      if (parsedPayload[1] === "posts") {
        query = `*[_type == "post" && author->username == "${parsedPayload[0]}"]
          | order(_createdAt desc) { 
            ${simplePostProjection}
        }`;
      } else if (parsedPayload[1] === "saved") {
        query = `*[_type == "user" && username == "${parsedPayload[0]}"].bookmarks[]
          | order(_createdAt desc) { 
            "username": @->author->username,
            "userImage": @->author->image,
            "likes": @->likes[]->username,
            "text": @->contents,
            "comments": count(@->comments),
            "createdAt": @->_createdAt,
            "id": @->_id,
            "image": @->photo.asset->url
        }`;
      } else {
        query = `*[_type == "post" && likes[]->username match "${parsedPayload[0]}"]
          | order(_createdAt desc) { 
            ${simplePostProjection}
        }`;
      }
      break;
    default:
      break;
  }

  return query;
};

export const fetchAllData = async <T>(dataType: DataType): Promise<T[]> => {
  let query = "";
  switch (dataType) {
    case "USERS":
      query = `*[_type == "user"]{ username, name, email, image, following, followers }`;
      break;
    case "FOLLOWINGS":
      // query =
      break;
    case "CATEGORIES":
      query = `*[_type == "categories"]{ username, name, email, image, following, followers }`;
      break;
    default:
      break;
  }
  return await client.fetch(query);
};
