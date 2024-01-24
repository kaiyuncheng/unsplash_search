import { FC, useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import CardImage from './components/CardImage';
import Loading from './components/Loading';
import SearchBox from './components/SearchBox';
import ModalImage from './components/ModalImage';
import useSearchAPI from './hooks/useSearchAPI';


export const App: FC = () => {
  const [keyword, setKeyword] = useState("fox");
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const listRef = useRef(null);
  const currentPage = useRef(1);

  const [imagesData, getImages ,getSingleImage, photoUrl] = useSearchAPI(setIsLoading, keyword, setModalShow, currentPage, setRemaining);


  const onSearchEnter = (e) => {
    console.log(e.target.value);
    if (e.key === "Enter") {
      setKeyword(e.target.value);
    }
  };

  useEffect(() => {
    const scrollEvent = (evt) => {
      const height =
        listRef.current.offsetHeight +
        listRef.current.offsetTop -
        window.innerHeight;
      if (!isLoading && window.scrollY > height && remaining > 1) {
        currentPage.current++;
        getImages(currentPage.current, false);
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [keyword]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (isLoading) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (

    <div className='m-3'>
      <Loading isLoading={isLoading} />
      <SearchBox onSearchEnterHandler={onSearchEnter}
        keyword={keyword} />
      <div className="row row-cols-2 g-3" ref={listRef}>
        {imagesData.map((item) => (
          <div className="col" key={item.id}>
            <CardImage item={item} getSingleImage={getSingleImage} />
          </div>
        ))}
      </div>
      
      <ModalImage modalShow={modalShow} setModalShow={setModalShow} photoUrl={photoUrl} />
    </div>
  );
};
