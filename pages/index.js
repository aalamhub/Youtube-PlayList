import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {YouTubePlayer} from '../component/youtubePlayer'
import {useState} from "react"
import {Box,Heading,SimpleGrid,Center, Button} from '@chakra-ui/react'


export default function Home({data}) {
  console.log("test console",data.items )
const [currentVideo,setCurrentVideo]=useState(data.items[0])
const [playing,setPlaying] =useState(false)

return(
<div>
  <Box width="100%" mx="auto" my={4}>
<Heading my={8} textAlign="center">Youtube Player </Heading>
<Box maxWidth="720px" mx="auto" p={4} borderRadious="lg" boxShadow="2x1" my={8}>
<YouTubePlayer id={currentVideo.snippet.resourceId.videoId}
  playing={playing}/>
</Box>
</Box>
<SimpleGrid colums={[1,2,3]} spacing={8}>
<div style={{display: 'grid', padding: '6px 6px', gridTemplateColumns: 'repeat(4, 1fr)',margin: 'auto auto',}}>

  {data && data.items.map((video)=>{
    return(
      <div id={video.id} style={{margin:'10px auto'}}>
      {/* <Box id={video.id} mx={4}> */}
           <Image src={video.snippet.thumbnails.maxres.url} 
           width={280}
           height={120} 
           alt={video.snippet.title} />
           <Heading as="h5" fontSize="sm" textAlign="left" noOfLines={1} mb={2}>{video.snippet.title}</Heading>
           <Center>
             <Button mx="auto" my={4} colorScheme="red"
             onClick={()=>{
               setCurrentVideo(video);
               setPlaying(true)
             }}>click to play</Button>
           </Center>
      {/* </Box> */}
      </div>
    )
  })}
  </div>
</SimpleGrid>
</div>
 
)


}


// export default function Home({data}) {
//   console.log("test --->",data)
//   return (

    
//     <div className={styles.container}>
// {/* <main className={styles.main}> */}
// <div>
// <h1 className={styles.title}>
//           Welcome to Our Playlist
//         </h1>
//         <br/>
//         <br/>
//         <br/>
//         <br/>

//         <div>
//       <ul className={styles.grid}>
//   {data.items.map(({ id, snippet = {} }) => {
//     const { title, thumbnails = {}, resourceId = {} } = snippet;
//     const { medium } = thumbnails;
//     return (
//       <li key={id} className={styles.card}>
//         <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
//           <p>
//             <img width={medium.width} height={medium.height} src={medium.url} alt="" />
//           </p>
//           <h3>{ title }</h3>
//         </a>
//       </li>
//     )
//   })}
// </ul>
// </div>
// {/* </main> */}
// </div>
    
    
//     </div>
//   )
// }


const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const API_KEY='AIzaSyCCbTNrEL_7HtPXSMbTezlyNrvLgpmECy0'
const PlayListId='PLYxzS__5yYQmpzsVeR7-KnX2li19KZhxE'
export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${PlayListId}&key=${API_KEY}`)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}
