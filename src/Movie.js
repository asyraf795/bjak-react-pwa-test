import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import ReactHLS from 'react-hls-player';

import { isBrowser, isConsole, isAndroid, isIOS } from "react-device-detect";

const Movie = props => {
    const [state, setState] = useState({});
    const [doneLoading, setDoneLoading] = useState(false);
    const handleOnDragStart = e => e.preventDefault()

    useEffect(() => {
        
        const getData = load => {
            
            const url = "https://cdn-discover.hooq.tv/v1.2/discover/titles/" + props.match.params.id;
            fetch(url)
              .then(res => {
                return !res.ok
                  ? res.json().then(e => Promise.reject(e))
                  : res.json();
              })
              .then(res => {
                setState(res.data);
                setDoneLoading(true);
              });
        };
        getData();
        
    }, [props]);



    return(
        <div>
            <div>
                <h2 className="text-light">
                    {state.title + " "}
                    <span className="badge badge-pill badge-warning">
                        {state.as}
                    </span>
                    {' '}   
                    <span className="badge badge-pill badge-primary">
                        {doneLoading && state.meta.ageRating}
                    </span> 
                    {' '} 
                    <span className="badge badge-pill badge-info">
                        {doneLoading && state.meta.releaseYear}
                    </span>  
                </h2>
            </div>

            {doneLoading && <AliceCarousel>
                {state.images !== null && state.images.map(image => <div className="d-flex justify-content-center" onDragStart={handleOnDragStart}><img className="img-fluid" key={image.id} src={image.url} alt={image.type}/></div>)}
            </AliceCarousel>}
            <div className="d-flex justify-content-center">
                <div>
                    <div>
                        {state.downloadable && <button type="button" className="btn btn-success  btn-block">DOWNLOAD</button>}
                        {state.streamable && <button type="button" className="btn btn-danger  btn-block">STREAM</button>}
                    </div>
                    <div className="card text-light bg-secondary ">
                        <div className="card-body">
                            <h5 className="card-title">Synopsis</h5>
                            <p className="card-text">{state.description || state.short_description}</p>
                        </div>
                    </div>
                    <div className="card text-light bg-secondary ">
                        <div className="card-body">
                            <h5 className="card-title">Seasons</h5>
                            {doneLoading && state.seasons !== null && state.seasons.map(season => <h5 className="d-inline card-text"><span className="badge badge-light">{season}</span><span>{' '}</span></h5> )}
                        </div>
                    </div>
                    <div className="card text-light bg-secondary ">
                        <div className="card-body">
                            <h5 className="card-title">CASTS</h5>
                            {doneLoading && state.people !== null && state.people.filter(person => person.role === "CAST").map(person => <h5 className="d-inline card-text"><span className="badge badge-light">{person.name}</span><span>{' '}</span></h5> )}
                            <h5 className="card-title">DIRECTORS</h5>
                            {doneLoading && state.people !== null && state.people.filter(person => person.role === "DIRECTOR").map(person => <h5 className="d-inline card-text"><span className="badge badge-light">{person.name}</span><span>{' '}</span></h5> )}                       
                        </div>
                    </div>
                    <div className="card text-light bg-secondary ">
                        <div className="card-body">
                            <h5 className="card-title">Audios</h5>
                            {doneLoading && state.audios !== null && state.audios.map(audio => <h5 className="d-inline card-text"><span className="badge badge-pill badge-danger">{audio}</span><span>{' '}</span></h5> )}
                            <h5 className="card-title">Subtitles</h5>
                            {doneLoading && state.languages !== null && state.languages.map(language => <h5 className="d-inline card-text"><span className="badge badge-pill badge-success">{language}</span><span>{' '}</span></h5> )}
                        </div>
                    </div>
                    <div className="card text-light bg-secondary">
                        <div className="card-body">
                            <h5 className="card-title font-italic">#hashtags</h5>
                            {doneLoading && state.tags !== null && state.tags.map(tag => <h5 className="d-inline card-text"><span className="badge badge-pill badge-warning">{"#" + tag.tag}</span><span>{' '}</span></h5> )}
                        </div>
                    </div>
                    <div className="card text-light bg-secondary">
                        <div className="card-body">
                            <h5 className="card-title">Trailers</h5>
                            {doneLoading && isBrowser && state.trailers !== null && state.trailers.webClient.map(url => <div className="d-flex justify-content-center"><ReactHLS url={url} /></div> )}
                            {doneLoading && isIOS && state.trailers !== null && state.trailers.iosmobile.map(url => <div className="d-flex justify-content-center"><ReactHLS url={url} /> </div> )}
                            {doneLoading && isAndroid && state.trailers !== null && state.trailers.androidmobile.map(url =><div className="d-flex justify-content-center"> <ReactHLS url={url} /></div>  )}
                            {doneLoading && isConsole && state.trailers !== null && state.trailers.androidmediaconsole.map(url => <div className="d-flex justify-content-center"><ReactHLS url={url} /></div>  )}
                        </div>
                    </div>
                </div>
            </div>      
        </div> 
    );
}

export default Movie;

