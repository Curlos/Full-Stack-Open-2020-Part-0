import React from 'react';
import { Text } from 'react-native';

const RepositoryItem = ({ repository }) => {

    return (
        <Text>
            {"\n"}
            Full name: {repository.item.fullName}{"\n"}
            Description: {repository.item.description}{"\n"}
            Language: {repository.item.language}{"\n"}
            Stars: {repository.item.forksCount}{"\n"}
            Forks: {repository.item.stargazersCount}{"\n"}
            Reviews: {repository.item.ratingAverage}{"\n"}
            Rating: {repository.item.reviewCount}{"\n"}
        </Text>
    );
};

export default RepositoryItem;