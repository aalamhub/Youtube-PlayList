import ReactPlayer from 'react-player/youtube'
import {Box} from '@chakra-ui/react'

const YouTubePlayer =(props) =>{
    const {id,playing} =props;
    const url=`https://www.youtube.com/watch?v=${id}`
    return(
        <Box className="player-wrapper">
            <ReactPlayer className="react-player" url={url} playing={playing} 
            width="100%" height="100%"/>

        </Box>
    )
}

export {YouTubePlayer}