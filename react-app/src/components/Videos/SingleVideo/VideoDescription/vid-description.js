import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './desc-vid.css'

function VideoDescription() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { videoId } = useParams()

    const sessionUser = useSelector(state => state.session.user)
    const [users, setUsers] = useState([]);
    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]


    //Querrying for users and finding the user who uploaded this video
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);
    const findUser = users.filter(currUser => currUser.id === videoPlaying?.user_id);
    const user = findUser[0]


    const testText = () => {
        return (
            <span>
                After Watergate, many people withdrew from politics altogether.
                They turned instead to pop culture–easy to do in such a trend-laden, fad-happy decade.
                They listened to 8-track tapes of Jackson Browne, Olivia Newton-John, Donna Summer and Marvin Gaye.
                Disco rose and with it, the sounds of Abba, the Bee Gees and Donna Summer. On the rock front, bands like the Rolling Stones,
                Van Halen, Pink Floyd and Queen dominated airwaves.
                Additionally, the 1970s saw a return of handicrafts like latch-hook rugs and macramé,
                while sports like racquetball and yoga gained popularity.
                Many people read “I’m OK, You’re OK” and “The Joy of Sex,” experimented with wife-swapping parties and smoked pot.
                In general, by the end of the decade, many young people were using their hard-fought freedom to simply do as they pleased:
                to wear what they wanted, to grow their hair long, to have sex, to do drugs.
                Their liberation, in other words, was intensely personal.

            </span>
        )
    }
    const span = testText()
    console.log(span, "MMMMMMMdescription")

    //redirecting to the edit page for each video
    const navLink = () => {
        history.push(`/edit/${videoId}`)
    }


    return (
        <>
            {/* making sure the video has loaded into 
           state before loading the page to make sure the items display on reload */}

            {Object.values(Allvideos).length > 0 ?
                <>
                    <div className='descriptionTitle'>
                        <strong className='displayname'> {videoPlaying?.title}</strong>
                    </div>
                    <div className='bottom-line singleline'></div>

                    <div className='VideoInfo'>
                        <div>
                            <img className='avatar singleview' src={`${user?.avatar}`} />
                        </div>
                        <div className='fullname single'>
                            <strong > {user?.firstname} {user?.lastname} </strong>
                            {sessionUser.id === videoPlaying.user_id &&
                                <button onClick={navLink}
                                    className='editVideoBtn'
                                > Edit Video
                                </button>
                            }

                        </div>
                    </div>

                    <div className='videoDescription'>
                        <p> {testText()}</p>
                        {/* <p> {videoPlaying?.description}</p> */}
                        <button className='read-more-button'> Show More </button>
                    </div>


                </>
                :
                <>
                </>
            }

        </>
    )

}

export default VideoDescription;