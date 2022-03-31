import { NAVIGATION } from '@/constants';
import { navigate } from '@/navigation/NavigationRef';
import { ms, theme } from '@/theme';
import PropTypes from 'prop-types';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CachedImage } from '../CachedImage/CachedImage';
import styles from './CharactersItem.styles';

const NameNickNameView = ({ name, nickname }) => {
  return (
    <View style={styles.nameView}>
      <Text style={styles.textName} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.textNickName} numberOfLines={1}>
        {nickname}
      </Text>
    </View>
  );
};

const FavoriteButton = ({ isFavorite, onPress }) => {
  return (
    <Pressable
      accessibilityRole="button"
      style={styles.buttonSearch}
      onPress={onPress}>
      <Icon
        name={isFavorite ? 'favorite' : 'favorite-border'}
        size={ms(24)}
        color={isFavorite ? theme.colors.green : theme.colors.gray}
      />
    </Pressable>
  );
};

const ImageView = ({ img }) => {
  return (
    <CachedImage
      source={{ uri: img }}
      resizeMode={'cover'}
      style={styles.imageCharacter}
    />
  );
};

const handleItemClick = (row, isSearch) => {
  if (row?.char_id) {
    navigate(NAVIGATION.characterDetails, {
      char_id: row?.char_id,
      isSearch,
    });
  }
};

export function CharactersItem({
  row,
  index,
  isSearch,
  onFavoriteAction,
  hideFavorite = false,
}) {
  return (
    <View key={index} style={styles.container}>
      <Pressable
        accessibilityRole="button"
        style={styles.innerContainer}
        onPress={() => handleItemClick(row, isSearch)}>
        <ImageView {...row} />
        <View style={styles.nameFavoriteContainer}>
          <NameNickNameView {...row} />
          {!hideFavorite && (
            <FavoriteButton {...row} onPress={onFavoriteAction} />
          )}
        </View>
      </Pressable>
    </View>
  );
}

CharactersItem.propTypes = {
  hideFavorite: PropTypes.bool,
  index: PropTypes.number,
  isSearch: PropTypes.bool,
  onFavoriteAction: PropTypes.func,
  row: PropTypes.object.isRequired,
};
NameNickNameView.propTypes = {
  name: PropTypes.string,
  nickname: PropTypes.string,
};
FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool,
  onPress: PropTypes.func,
};
ImageView.propTypes = {
  img: PropTypes.string,
};
