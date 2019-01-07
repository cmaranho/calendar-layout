import React from 'react';
import { Text } from 'react-native';

const TextCard = ({size = 12, weight = '100', children}) => {
    
    return(
    <Text style={{fontSize: size, fontWeight: weight}}>{children}</Text>
);}

export default TextCard;
