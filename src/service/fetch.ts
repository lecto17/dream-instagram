import { client } from "@/sanity/sanity";

type DataType = "USERS" | "AUTHORS" | "POSTS" | "CATEGORIES" | "FOLLOWINGS";
type QueryType = "FOLLOWINGS" | "FOLLOWINGS_POSTS";

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
