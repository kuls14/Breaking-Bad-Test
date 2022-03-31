import CharacterActions, {
  CharacterSelectors,
} from '@/reducers/CharacterReducer';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const getCharacterDetailsFromList = (list, charId, setCharacter) => {
  if (list.length > 0) {
    const index = list.findIndex((item) => item.char_id === charId);

    if (index > -1) {
      setCharacter(list[index]);
    }
  }
};

const useCharacterDetails = () => {
  const route = useRoute();
  const char_id = route?.params?.char_id ?? 0;
  const fromSearch = route?.params.isSearch ?? false;
  const [character, setCharacter] = useState({});
  const otherCharacters = useSelector(CharacterSelectors.getOtherCharacters);
  const allCharacters = useSelector(CharacterSelectors.getCharacters);
  const searchCharacters = useSelector(CharacterSelectors.getSearchCharacters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CharacterActions.getOtherCharactersRequest());
  }, [char_id, dispatch]);

  useEffect(() => {
    if (fromSearch) {
      getCharacterDetailsFromList(searchCharacters, char_id, setCharacter);
    } else {
      getCharacterDetailsFromList(allCharacters, char_id, setCharacter);
    }
  }, [allCharacters, char_id, fromSearch, searchCharacters]);

  const getter = {
    character,
    allCharacters,
    otherCharacters,
    searchCharacters,
  };
  const setter = { dispatch };

  return {
    getter,
    setter,
  };
};

export default useCharacterDetails;
