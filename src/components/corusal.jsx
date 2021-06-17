import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Hotel3 from '../assets/hotel3.jpg'
import Hotel4 from '../assets/hotel4.jpg'
import Hotel5 from '../assets/hotel5.jpg'
import Hotel6 from '../assets/hotel6.jpg'

export default function Slider({urls, height}){
     
    let items = urls
   
    return (
        <Carousel indicators={false} navButtonsAlwaysVisible={true} animation="slide">
            {
                Object.entries(items).map( (item, i) =>  <img style={{width:'100%',height, marginBottom:'-5px'}} src={item[1]} /> )
            }
        </Carousel>
    )
}

