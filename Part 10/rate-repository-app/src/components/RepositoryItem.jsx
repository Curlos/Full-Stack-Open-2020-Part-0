import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';

const RepositoryItem = ({ repository }) => {

    const stars = repository.item.stargazersCount > 1000 ? (Math.round((repository.item.stargazersCount / 1000) * 10) / 10).toFixed(1)+ 'k' : repository.item.stargazersCount;

    const forks = repository.item.forksCount > 1000 ? (Math.round((repository.item.forksCount / 1000) * 10) / 10).toFixed(1) + 'k' : repository.item.forksCount;

    const viewStyles = StyleSheet.create({
        container: {
            backgroundColor: "#ffffff",
        }
    });

    const avatarStyles = StyleSheet.create({
        container: {
            width: 50,
            height: 50,
            borderRadius: 10,
        }
    });

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row"
        },
        fullName: {
            fontWeight: "bold",
        },
        description: {
            color: "#282829"
        },
        language: {
            backgroundColor: "#0366d6",
            padding: 20,
            color: "#ffffff",
            borderRadius: 10,
        }
    });

    return (
        <View style={viewStyles.container}>
            <Text>
                {"\n"}
                <Image 
                    source={{ uri: repository.item.ownerAvatarUrl }}
                    style={avatarStyles.container}
                />
                <Text style={styles.container}>
                    <Text style={styles.fullName}>
                        {repository.item.fullName}
                    </Text>
                    <Text style={styles.description}>
                        {repository.item.description}
                    </Text>
                </Text>{"\n"}
                <Text style={styles.language}>
                    {repository.item.language}
                </Text>
                {"\n"}
                Stars: {stars}{"\n"}
                Forks: {forks}{"\n"}
                Reviews: {repository.item.ratingAverage}{"\n"}
                Rating: {repository.item.reviewCount}{"\n"}
            </Text>
        </View>
    );
};

export default RepositoryItem;