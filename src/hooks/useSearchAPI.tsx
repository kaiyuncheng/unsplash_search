import { useEffect, useState } from "react";
import axios from "axios";

const api = "https://api.unsplash.com/";

export default function useSearchAPI(setIsLoading, keyword, setModalShow, currentPage, setRemaining) {
  const [imagesData, setImagesData] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  
  async function getSingleImage(id) {
    try {
      const result = await axios(
        `${api}photos/${id}?client_id=${process.env.REACT_APP_ACCESS_KEY}`
      );
      setPhotoUrl(result.data.urls.regular);
      // 打開 Modal
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }

  };

  async function getImages(page = 1, isNew = true) {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${api}search/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${keyword}&page=${page}`
      );
      // console.log('result', result);
      setImagesData((preData) => {
        // console.log("更新資料觸發");
        if (isNew) {
          return [...result.data.results];
        }
        return [...preData, ...result.data.results];
      });
      currentPage.current = page;
      setRemaining(result.headers["x-ratelimit-remaining"]);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages(1, true);
  }, [keyword]);

  return [imagesData, getImages, getSingleImage ,photoUrl] as const
}




// export default function useSearchAPI(setLoading) {
//   const [postId, setPostId] = useState(1)
//   const [error, setError] = useState<Error | null>(null)
//   // const [loading, setLoading] = useState(false)
//   const [data, setData] = useState([] as Comment[])

//   const api = "https://api.unsplash.com/search/photos/";
// const accessKey = process.env.ACCESS_KEY
// // https://api.unsplash.com/search/photos?query=scuba&page=1&client_id=V-ZzZeewB2huE-NyBO2XwmBM_I9WSVqbYMDHMy3MtJI


//   async function fetchData(id: number) {
//     setLoading(true)
//     try {
//       const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
//       const resData = await res.json() as Comment[]
//       setData(resData)
//     } catch (error) {
//       setError(error as Error)
//     }
//     setLoading(false)
//   }

//   useEffect(() => {
//     fetchData(postId)
//   }, [postId])

//   return [data, loading, error, setPostId] as const
//   // return {data, loading, error, setPostId}
// }

