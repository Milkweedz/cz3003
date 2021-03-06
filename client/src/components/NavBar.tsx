import { Link, Flex, Box, Button, Spacer, IconButton, Tag, Image } from "@chakra-ui/react"
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation, useGetCharacterQuery } from "../generated/graphql";
import { render } from "react-dom";

interface NavBarProps {

}
const imageList = [...Array(8)].map((_, i) => `icons/${i+1}.png`)

export const NavBar: React.FC<NavBarProps> = ({}) => {

    var SetIcon = ({userName}) => {
        var [{data}] = useGetCharacterQuery({
          variables: {username: userName}
        });
        var imageId
        if (data?.getCharacter) {
            imageId = data.getCharacter.characterId
        } else {
            imageId = 0
        }
        return(
                <Image
                  borderRadius="full"
                  boxSize="45px"
                  src={imageList[imageId]}
                  />
              )          
    }

    const isServer = () => typeof window ==="undefined";
    const [{fetching: logoutFetching},logout] = useLogoutMutation()
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    });
    let body = null
    
    //data is loading
    if (fetching){

    // user not logged in
    } else if (!data?.me){
    // user is logged in
    } else {
        body = (
            <Flex>
                <Button  mr={3}
                    onClick={() => {
                        logout();
                    }} 
                    isLoading= {logoutFetching}
                    color="whiteAlpha.700"
                    variant="link">Logout</Button>
                <Tag backgroundColor={"transparent"} mr={2}>{data.me.username}</Tag>
                <NextLink href={"/character"}>
                    <Link alignContent='center' color={"white"} mr={2}><SetIcon userName={data.me.username} /></Link>
                </NextLink>
            </Flex>
        )   
    }

    return(
        <Flex bg='tomato' p={2} width={"full"}>
            <Box p={2}>
                <NextLink href={"/"}>
                    <Link alignContent='center' color={"white"} mr={2}>Home</Link>
                </NextLink>
            </Box>
            {/* <Box p={2}>
                <NextLink href={"/game"}>
                    <Link alignContent='center' color={"white"} mr={2}>Game</Link>
                </NextLink>
            </Box> */}
            <Box p={2}>
                <NextLink href={"/leaderboard"}>
                    <Link alignContent='center' color={"white"} mr={2}>Leaderboard</Link>
                </NextLink>
            </Box>
            <Box p={2}>
                <NextLink href={"/teacher"}>
                    <Link alignContent='center' color={"white"} mr={2}>Teacher</Link>
                </NextLink>
            </Box>
            <Box p={2}>
                <NextLink href={"/profile"}>
                    <Link alignContent='center' color={"white"} mr={2}>Profile</Link>
                </NextLink>
            </Box>
            <Spacer/>
            <Box>
                {body}
            </Box>
        </Flex>
    )
}

 