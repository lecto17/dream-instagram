import { client } from "@/sanity/sanity";

type DataType = "USERS" | "AUTHORS" | "POSTS" | "CATEGORIES" | "FOLLOWINGS";
type QueryType = "FOLLOWINGS" | "FOLLOWINGS1";

export const getQuery = (queryType: QueryType, payload: string) => {
  let query = "";

  switch (queryType) {
    case "FOLLOWINGS":
      query = `*[_type == "user" && username == '${payload}'][0].following[]->{
        id,
        username,
        name,
        image,
        email
      }`;
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
