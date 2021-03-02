import { Link, Flex, Box, Button, Spacer, IconButton, Tag } from "@chakra-ui/react"
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {

    const CharacterIcon = () => {
        return (
            <IconButton 
            aria-label="Change Character"
            isRound={true} 
            size='lg'/>
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
                <CharacterIcon/>
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
            <Spacer/>
            <Box>
                {body}
            </Box>
        </Flex>
    )


}