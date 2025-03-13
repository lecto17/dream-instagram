import { client } from "@/sanity/sanity";

type DataType = "USERS" | "AUTHORS" | "POSTS" | "CATEGORIES" | "FOLLOWINGS";
type QueryType =
  | "FOLLOWINGS"
  | "FOLLOWINGS_POSTS"
  | "POST_DETAIL"
  | "SEARCH_USER"
  | "USER_ALL_INFO";

export const getQuery = (queryType: QueryType, payload: string) => {
  let query = "";

  switch (queryType) {
    case "FOLLOWINGS":
      query = `*[_type == "user" && username == '${payload}'][0]{
        ...,
        "id": _id,
        following[]-> {username,image},
        followers[]-> {username,image},
        "bookmarks":bookmarks[]->id
      }`;
      break;
    case "FOLLOWINGS_POSTS":
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
      query = `*[_type == "post" && author->username == "${payload}"
        || author._ref in *[_type == "user" && username == "${payload}"].following[]._ref] 
        | order(_createdAt desc){${simplePostProjection}}`;
      break;
    case "POST_DETAIL":
      query = `*[_type == "post" && _id == "${payload}"].comments[]{
          "image": author->image,
          "username": author->username,
          "comment": comment
      }`;
      break;
    case "SEARCH_USER":
      query = `*[_type == "user" && username match '${payload}*' || name match '${payload}*']{
        "following": count(following),
        "followers": count(followers),
        "name": name,
        "username": username,
        "image": image
      }`;
      break;
    case "USER_ALL_INFO":
      query = ``;
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
