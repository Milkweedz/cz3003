import React, {Component} from 'react'
import {Box} from "@chakra-ui/react";


export default class BoardCharacter extends Component {

    
    render(){
        return(
            <div>
                <Box color="black" bg="green.300" px={4} fontSize="16px"> 
                    <b> Player  {this.props.character.characterId} </b>    
                </Box>
                <Box bg ="yellow" fontSize="16px" px={4}>
                     Coins: {this.props.character.playerCoins}  Sausages:  {this.props.character.playerSausage}
                </Box>         
                
                <br></br>
                {/* debugging reasons */}
                {/* <Box as="button" style={ButtonStyle}  px={4} mr="10px"
                onClick={() => this.props.decreaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Decrease
                </Box>
                <Box as="button" style={ButtonStyle} px={4} mr="10px"
                onClick={() => this.props.increaseCoins(this.props.character)}
                className="btn btn-secondary btn-sm"
                >
                    Increase
                </Box> */}
            </div>
        );
    }
}
