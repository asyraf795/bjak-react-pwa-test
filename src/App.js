import React, { useState, useEffect } from "react";
import './App.css';


import Board from "./components/Board";

const App = () => {
  const [typeFilter, setTypeFilter] = useState("Multi-Title-Manual-Curation");
  const [loadMore, setLoadMore] = useState(true);
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20)


  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      if (!loadMore) {
        setPage(page => page + 1);
        setLoadMore(true);
      }
      
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    
  }, [page, loadMore]);


  useEffect(() => {
    const getData = (load) => {
      if (load) {
        const url = "https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page="+page+"&perPage="+perPage
        fetch(url)
          .then(res => {
            return !res.ok 
            ? res.json().then(e => Promise.reject(e)) 
            : res.json();
          })
          .then(res => {
            const data = res.data.filter(show => show.type === typeFilter)
            
            if (data.length > 0) {
              setLoadMore(false);
              setShows([...shows, ...data]);
            } else if (page < 100) {
              setPage(page => page + 1);
            } else if (page >= 100) {
              setLoadMore(false);
            }
          });
      }
    };
    getData(loadMore);

  }, [loadMore, page, perPage, shows, typeFilter]);

  const boardComponents = shows.map(board => (
    <Board name={board.row_name} data={board.data}  key={board.row_id}/>
  ));
  return (
    <div>
      {boardComponents}
    </div>
  );
};

export default App;

